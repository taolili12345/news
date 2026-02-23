#!/usr/bin/env python3
"""
AI 资讯自动发布脚本
1. 获取 AI 资讯
2. LLM 重写
3. 发布到 WordPress 博客
"""

import os
import sys
import json
import requests
from datetime import datetime

requests.packages.urllib3.disable_warnings()

# ============== 配置 ==============
BLOG_CONFIG = {
    'url': 'http://110.40.129.147/api/publish',  # 服务器 API 地址
    'password': 'xiaowei2026'  # 发布密码
}

# ============== 函数 ==============

def log(msg):
    print(f"[{datetime.now().strftime('%H:%M:%S')}] {msg}")

def fetch_github_trending():
    """获取 GitHub Trending AI 项目"""
    log("📡 获取 GitHub Trending AI 项目...")
    try:
        url = 'https://api.github.com/search/repositories?q=ai+OR+machine-learning+OR+llm+OR+gpt&sort=stars&order=desc&per_page=10'
        r = requests.get(url, verify=False, timeout=30)
        data = r.json()
        items = data.get('items', [])[:8]
        
        results = []
        for item in items:
            results.append({
                'title': f"{item.get('name', '')} - ⭐ {item.get('stargazers_count', 0)} 星星",
                'desc': item.get('description', '暂无描述'),
                'url': item.get('html_url', ''),
                'stars': item.get('stargazers_count', 0),
                'source': 'GitHub'
            })
        return results
    except Exception as e:
        log(f"❌ GitHub API 错误: {e}")
        return []

def fetch_huggingface():
    """获取 Hugging Face 热门模型"""
    log("📡 获取 Hugging Face 热门模型...")
    try:
        url = 'https://huggingface.co/api/models?sort=downloads&direction=-1&limit=10'
        r = requests.get(url, verify=False, timeout=30)
        models = r.json()[:8]
        
        results = []
        for m in models:
            results.append({
                'title': f"{m.get('modelId', '')} - 📥 {m.get('downloads', 0)} 下载",
                'desc': f"任务类型: {m.get('pipeline_tag', '未知')} | 下载量: {m.get('downloads', 0)}",
                'url': f"https://huggingface.co/{m.get('modelId', '')}",
                'downloads': m.get('downloads', 0),
                'source': 'HuggingFace'
            })
        return results
    except Exception as e:
        log(f"❌ HuggingFace API 错误: {e}")
        return []

def get_ai_news():
    """整合所有资讯来源"""
    all_news = []
    all_news.extend(fetch_github_trending())
    all_news.extend(fetch_huggingface())
    
    # 按热度排序
    all_news.sort(key=lambda x: x.get('stars', x.get('downloads', 0)), reverse=True)
    
    return all_news[:10]

def rewrite_with_llm(articles):
    """使用 LLM 重写文章"""
    log("✍️  调用 LLM 重写文章...")
    
    # 构建提示词
    news_text = ""
    for i, a in enumerate(articles, 1):
        news_text += f"""
{i}. {a.get('title', '')}
   {a.get('desc', '')}
   来源: {a.get('source', '')}
"""

    prompt = f"""你是一个科技资讯博主，请将以下 AI 资讯重写成适合博客发布的格式。

要求：
1. 标题吸引眼球，能引起读者兴趣
2. 内容通俗易懂，避免过于专业的术语
3. 加入自己的独特视角和见解
4. 每篇 300-500 字
5. 适合中文读者阅读

原始资讯：
{news_text}

请以 JSON 数组格式输出，每篇文章包含：
- title: 新标题（中文，越吸引眼球越好）
- content: 正文内容（中文，包含一些 emoji）
- tags: 标签数组，如 ["AI", "开源", "机器学习"]
"""

    try:
        api_url = "https://integrate.api.nvidia.com/v1/chat/completions"
        headers = {
            "Authorization": "Bearer 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",
            "Content-Type": "application/json"
        }
        payload = {
            "model": "nvidia/nv-ai-mixtral-8x7b-instruct",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.8,
            "max_tokens": 3000
        }
        
        log("⏳ 等待 LLM 响应...")
        r = requests.post(api_url, json=payload, headers=headers, timeout=120)
        result = r.json()
        
        if 'choices' in result:
            content = result['choices'][0]['message']['content']
            
            # 解析 JSON
            import re
            try:
                json_match = re.search(r'\[[\s\S]*\]', content)
                if json_match:
                    rewritten = json.loads(json_match.group())
                    log(f"✅ LLM 重写成功! 生成了 {len(rewritten)} 篇文章")
                    return rewritten
            except:
                pass
        
    except Exception as e:
        log(f"❌ LLM 调用失败: {e}")
    
    # 如果 LLM 失败，使用简化版本
    log("📝 使用简化模板生成文章...")
    simplified = []
    for a in articles[:10]:
        simplified.append({
            'title': a.get('title', 'AI 资讯')[0:50],
            'content': f"{a.get('desc', '')}\n\n来源: {a.get('source', '')}\n\n🔗 链接: {a.get('url', '')}",
            'tags': ['AI', a.get('source', '科技')]
        })
    return simplified

def publish_to_blog(title, content):
    """发布文章到博客"""
    log(f"📤 发布文章: {title[:30]}...")
    
    data = {
        'title': title,
        'content': content,
        'password': BLOG_CONFIG['password']
    }
    
    try:
        r = requests.post(BLOG_CONFIG['url'], json=data, timeout=30)
        result = r.json()
        
        if result.get('success'):
            log(f"✅ 发布成功! ID: {result.get('post_id')}")
            return True
        else:
            log(f"❌ 发布失败: {result.get('error')}")
            return False
    except Exception as e:
        log(f"❌ 发布失败: {e}")
        return False

def main():
    """主函数"""
    log("=" * 50)
    log("🚀 AI 资讯自动发布系统启动!")
    log("=" * 50)
    
    # 1. 获取资讯
    articles = get_ai_news()
    
    if not articles:
        log("❌ 没有获取到任何资讯")
        return
    
    log(f"📊 共获取 {len(articles)} 条资讯")
    
    # 2. LLM 重写
    rewritten = rewrite_with_llm(articles)
    
    # 3. 发布文章
    success_count = 0
    for article in rewritten:
        title = article.get('title', '')
        content = article.get('content', '')
        
        if title and content:
            if publish_to_blog(title, content):
                success_count += 1
    
    log("=" * 50)
    log(f"✅ 完成! 成功发布 {success_count} 篇文章")
    log("=" * 50)

if __name__ == '__main__':
    main()
