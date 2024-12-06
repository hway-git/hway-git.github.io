import type { ArticleOrderType } from './types/article'
import blogConfig from '~~/blog.config'
import type { Nav, NavItem } from '~/types/nav'

export default defineAppConfig({
    ...blogConfig,

    article: {
        categories: {
            经验分享: { icon: 'ph:mouse-bold', color: '#3af' },
            生活: { icon: 'ph:shooting-star-bold', color: '#3ba' },
            代码: { icon: 'ph:code-bold', color: '#77f' },
        },
        order: {
            date: '创建日期',
            updated: '更新日期',
            // title: '标题',
        },
    },

    footer: {
        copyright: `© ${new Date().getFullYear()} ${blogConfig.author.name}`,
        iconNav: <NavItem[]>[
            { icon: 'ph:rss-simple-bold', text: 'Atom订阅', url: '/atom.xml' },
            { icon: 'ph:github-logo-bold', text: 'GitHub:hway-git', url: 'https://github.com/hway-git' },
        ],
        nav: <Nav>[
            {
                title: '探索',
                items: [
                    { icon: 'ph:rss-simple-bold', text: 'Atom订阅', url: '/atom.xml' },
                ],
            },
            // {
            //     title: '社交',
            //     items: [],
            // },
            // {
            //     title: '信息',
            //     items: []
            // },
        ],
        message: '',
    },

    header: {
        logo: 'https://weavatar.com/avatar/ac66474322cfb6261e8ef75d83606c1aa16ee3e7729fb57a03e3b6214455b8b4?s=160',
        text: true,
        subtitle: blogConfig.subtitle,
        emojiTail: ['👋', '🦑', '🙌', '🐟', '💻'],
    },

    pagination: {
        perPage: 10,
        sortOrder: <ArticleOrderType>'date',
        /** 允许（普通/预览/归档）文章列表正序 */
        allowAscending: false,
    },

    nav: <Nav>[
        {
            title: '',
            items: [
                { icon: 'ph:files-bold', text: '文章', url: '/' },
                { icon: 'ph:archive-bold', text: '归档', url: '/archive' },
            ],
        },
    ],

    stats: {
        wordCount: '约10万',
    },

    themes: {
        light: {
            icon: 'ph:sun-bold',
            tip: '浅色模式',
        },
        system: {
            icon: 'ph:monitor-bold',
            tip: '跟随系统',
        },
        dark: {
            icon: 'ph:moon-bold',
            tip: '深色模式',
        },
    },
})
