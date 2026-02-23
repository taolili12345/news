# AI 资讯博客系统 - Flask 动态博客
# 功能：REST API 发布文章、首页展示文章

from flask import Flask, request, jsonify, render_template_string
import sqlite3
import os
from datetime import datetime
import hashlib

app = Flask(__name__)
DB_PATH = '/www/wwwroot/news.46pv38.cloud/blog.db'

# ========== 数据库初始化 ==========
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        author TEXT DEFAULT '小薇 AI',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        views INTEGER DEFAULT 0
    )''')
    conn.commit()
    conn.close()

# ========== 静态文件目录 ==========
STATIC_DIR = '/www/wwwroot/news.46pv38.cloud/static'
TEMPLATE_DIR = '/www/wwwroot/news.46pv38.cloud/templates'

# ========== API: 发布文章 ==========
@app.route('/api/publish', methods=['POST'])
def publish():
    data = request.json
    title = data.get('title', '')
    content = data.get('content', '')
    password = data.get('password', '')
    
    # 简单密码验证
    if password != 'xiaowei2026':
        return jsonify({'error': '密码错误'}), 401
    
    if not title or not content:
        return jsonify({'error': '标题和内容不能为空'}), 400
    
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    c.execute('INSERT INTO posts (title, content) VALUES (?, ?)', (title, content))
    conn.commit()
    post_id = c.lastrowid
    conn.close()
    
    return jsonify({'success': True, 'post_id': post_id})

# ========== API: 获取文章列表 ==========
@app.route('/api/posts', methods=['GET'])
def get_posts():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute('SELECT * FROM posts ORDER BY created_at DESC LIMIT 20')
    posts = [dict(row) for row in c.fetchall()]
    conn.close()
    return jsonify(posts)

# ========== API: 获取单篇文章 ==========
@app.route('/api/post/<int:post_id>', methods=['GET'])
def get_post(post_id):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute('SELECT * FROM posts WHERE id = ?', (post_id,))
    post = dict(c.fetchone()) if c.fetchone() else None
    conn.close()
    if post:
        # 增加阅读量
        c.execute('UPDATE posts SET views = views + 1 WHERE id = ?', (post_id,))
        conn.commit()
    return jsonify(post) if post else jsonify({'error': '文章不存在'}), 404

# ========== 首页 ==========
HTML_TEMPLATE = '''
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI 前沿资讯</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
            color: #333;
            line-height: 1.8;
        }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 40px 20px;
            text-align: center;
            border-radius: 10px;
            margin-bottom: 30px;
        }
        header h1 { font-size: 2em; margin-bottom: 10px; }
        .post { background: white; padding: 20px; margin-bottom: 20px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .post h2 { color: #2c3e50; margin-bottom: 10px; cursor: pointer; }
        .post h2 a { text-decoration: none; color: #2c3e50; }
        .post .meta { color: #999; font-size: 0.9em; margin-bottom: 10px; }
        .post .content { color: #555; }
        .post .content img { max-width: 100%; border-radius: 5px; }
        footer { text-align: center; padding: 30px; color: #999; }
        .loading { text-align: center; padding: 40px; color: #999; }
    </style>
</head>
<body>
    <div class="container">
        <header>
            <h1>🤖 AI 前沿资讯</h1>
            <p>每日 AI 技术最新进展</p>
        </header>
        <div id="posts">
            <p class="loading">加载中...</p>
        </div>
        <footer>
            <p>由小薇 AI 自动生成</p>
        </footer>
    </div>
    <script>
        async function loadPosts() {
            try {
                const resp = await fetch('/api/posts');
                const posts = await resp.json();
                const container = document.getElementById('posts');
                if (posts.length === 0) {
                    container.innerHTML = '<p style="text-align:center;color:#999;">暂无资讯</p>';
                    return;
                }
                container.innerHTML = posts.map(post => `
                    <article class="post">
                        <h2><a href="/post/${post.id}">${post.title}</a></h2>
                        <p class="meta">📅 ${post.created_at} | 👁️ ${post.views} 阅读</p>
                        <div class="content">${post.content.substring(0, 200)}...</div>
                    </article>
                `).join('');
            } catch(e) {
                document.getElementById('posts').innerHTML = '<p class="loading">加载失败</p>';
            }
        }
        loadPosts();
    </script>
</body>
</html>
'''

@app.route('/')
def index():
    return render_template_string(HTML_TEMPLATE)

# ========== 文章详情页 ==========
POST_TEMPLATE = '''
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ post.title }}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f5f5;
            color: #333;
            line-height: 1.8;
        }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px 20px;
            text-align: center;
            border-radius: 10px;
            margin-bottom: 30px;
        }
        .back { display: inline-block; margin-bottom: 20px; color: #667eea; text-decoration: none; }
        .post { background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .post h1 { color: #2c3e50; margin-bottom: 15px; }
        .post .meta { color: #999; margin-bottom: 20px; }
        .post .content { color: #555; text-align: justify; }
        .post .content img { max-width: 100%; border-radius: 5px; margin: 10px 0; }
        footer { text-align: center; padding: 30px; color: #999; }
    </style>
</head>
<body>
    <div class="container">
        <a href="/" class="back">← 返回首页</a>
        <article class="post">
            <h1>{{ post.title }}</h1>
            <p class="meta">📅 {{ post.created_at }} | 👁️ {{ post.views }} 阅读 | ✍️ {{ post.author }}</p>
            <div class="content">{{ post.content }}</div>
        </article>
        <footer>
            <p>由小薇 AI 自动生成</p>
        </footer>
    </div>
</body>
</html>
'''

@app.route('/post/<int:post_id>')
def post_detail(post_id):
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    c = conn.cursor()
    c.execute('SELECT * FROM posts WHERE id = ?', (post_id,))
    row = c.fetchone()
    if row:
        c.execute('UPDATE posts SET views = views + 1 WHERE id = ?', (post_id,))
        conn.commit()
    conn.close()
    
    if row:
        return render_template_string(POST_TEMPLATE, post=dict(row))
    return '<h1>文章不存在</h1>', 404

# ========== 初始化 ==========
if __name__ == '__main__':
    # 确保目录存在
    os.makedirs(STATIC_DIR, exist_ok=True)
    os.makedirs(TEMPLATE_DIR, exist_ok=True)
    
    # 初始化数据库
    init_db()
    
    # 启动服务
    print('='*50)
    print('AI 资讯博客系统启动!')
    print('访问: http://localhost:5000')
    print('API 发布: POST /api/publish')
    print('='*50)
    app.run(host='0.0.0.0', port=5000, debug=False)
