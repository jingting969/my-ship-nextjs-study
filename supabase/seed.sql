-- 插入作者数据
INSERT INTO authors (name, bio, avatar) VALUES
('张三', '前端开发工程师，热衷于研究最新的 Web 技术', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'),
('李四', '全栈开发者，5年开发经验，专注于 React 和 Node.js', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lily'),
('王五', '技术博主，热衷于分享编程经验和最佳实践', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Max');

-- 获取作者ID以供后续使用
DO $$
DECLARE
    author1_id uuid;
    author2_id uuid;
    author3_id uuid;
    category_frontend_id uuid;
    category_react_id uuid;
    category_backend_id uuid;
    category_nodejs_id uuid;
BEGIN
    -- 获取作者ID
    SELECT id INTO author1_id FROM authors WHERE name = '张三' LIMIT 1;
    SELECT id INTO author2_id FROM authors WHERE name = '李四' LIMIT 1;
    SELECT id INTO author3_id FROM authors WHERE name = '王五' LIMIT 1;

    -- 插入分类数据
    INSERT INTO categories (name, slug, description, parent_id) VALUES
    ('前端开发', 'frontend', '前端开发相关的文章和教程', null)
    RETURNING id INTO category_frontend_id;

    INSERT INTO categories (name, slug, description, parent_id) VALUES
    ('React', 'react', 'React 相关的开发技巧和最佳实践', category_frontend_id)
    RETURNING id INTO category_react_id;

    INSERT INTO categories (name, slug, description, parent_id) VALUES
    ('后端开发', 'backend', '后端开发相关的文章和教程', null)
    RETURNING id INTO category_backend_id;

    INSERT INTO categories (name, slug, description, parent_id) VALUES
    ('Node.js', 'nodejs', 'Node.js 相关的开发技巧和教程', category_backend_id)
    RETURNING id INTO category_nodejs_id;

    -- 插入文章数据
    INSERT INTO posts (title, slug, content, excerpt, featured_image, published_at, updated_at, author_id, category_id, is_published, meta_title, meta_description, tags) VALUES
    (
        'Next.js 13 新特性详解',
        'nextjs-13-new-features',
        '# Next.js 13 新特性详解

Next.js 13 带来了许多激动人心的新特性，让我们一起来探索这些变化。

## App Directory

新的 app 目录结构提供了更好的文件组织方式...

## Server Components

React Server Components 是 Next.js 13 中最重要的特性之一...',
        'Next.js 13 带来了全新的 App Directory、Server Components 等重要特性，本文详细介绍这些新特性的使用方法和最佳实践。',
        'https://example.com/images/nextjs-13.jpg',
        NOW(),
        NOW(),
        author1_id,
        category_react_id,
        true,
        'Next.js 13 新特性详解 - 全面解析最新功能',
        'Next.js 13 新特性详细介绍，包括 App Directory、Server Components 等重要更新的使用指南和最佳实践。',
        ARRAY['Next.js', 'React', '前端开发']
    ),
    (
        'React Server Components 实战指南',
        'react-server-components-guide',
        '# React Server Components 实战指南

React Server Components 是一项革命性的技术，它能够显著提升应用性能...

## 什么是 Server Components？

Server Components 允许我们在服务器端渲染 React 组件...',
        'React Server Components 完整指南，从基础概念到实战应用，帮助你掌握这项革命性的新技术。',
        'https://example.com/images/rsc-guide.jpg',
        NOW() - interval '1 day',
        NOW() - interval '1 day',
        author2_id,
        category_react_id,
        true,
        'React Server Components 实战指南 - 从入门到精通',
        '详细介绍 React Server Components 的工作原理、使用方法和最佳实践，适合所有想要提升 React 应用性能的开发者。',
        ARRAY['React', 'Server Components', '性能优化']
    ),
    (
        'Node.js 性能优化实践',
        'nodejs-performance-optimization',
        '# Node.js 性能优化实践

本文将分享多年 Node.js 开发经验中总结的性能优化技巧...

## 内存管理

Node.js 的内存管理机制...',
        'Node.js 应用性能优化的完整指南，包括内存管理、异步操作优化、数据库查询优化等多个方面。',
        'https://example.com/images/nodejs-perf.jpg',
        NOW() - interval '2 days',
        NOW() - interval '2 days',
        author3_id,
        category_nodejs_id,
        true,
        'Node.js 性能优化实践 - 提升应用性能的关键技巧',
        '深入探讨 Node.js 性能优化技巧，包括内存管理、异步操作、数据库查询等多个方面的优化方法。',
        ARRAY['Node.js', '性能优化', '后端开发']
    );
END $$; 