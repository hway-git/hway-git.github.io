import type { BundledLanguage, BundledTheme } from 'shiki'

// 存储 nuxt.config 和 app.config 共用的配置
const blogConfig = {
    title: `Hiwayo's Space`,
    subtitle: '🏃🏻骐骥一跃,不能十步;驽马十驾,功在不舍。',
    description: 'Hiwayo的个人空间,分享技术与生活。',
    author: {
        name: 'Hiwayo',
        avatar: 'https://imgur.hwaygo.top/1750426010649.webp',
        email: '2670132411@qq.com',
        homepage: 'https://hwaygo.top/',
    },
    copyright: {
        abbr: 'CC BY-NC-SA 4.0',
        name: '署名-非商业性使用-相同方式共享 4.0 国际',
        url: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans',
    },
    favicon: '/favicon.ico',
    language: 'zh-CN',
    timeEstablished: '2024-11-17',
    timezone: 'Asia/Shanghai',
    url: 'https://blog.hwaygo.top/',

    feed: {
        limit: 50,
    },

    hideContentPrefixes: ['/posts'],

    imageDomains: ["imgur.hwaygo.top"],

    robotsNotIndex: ['/preview', '/previews/*'],

    scripts: [

    ],

    // 用于 Shiki、Plain Shiki 引入代码高亮
    // 同时用于显示代码块语言对应的 Iconify Catppuccin 图标
    shiki: {
        langs: <BundledLanguage[]>['bat', 'c', 'cpp', 'css', 'diff', 'html', 'ini', 'java', 'js', 'json', 'log', 'makefile', 'matlab', 'md', 'mdc', 'powershell', 'python', 'sh', 'ssh-config', 'toml', 'ts', 'tsx', 'vb', 'vue', 'xml', 'yaml'],
        themes: <BundledTheme[]>['catppuccin-latte', 'one-dark-pro'],
        defaultTheme: <BundledTheme>'catppuccin-latte',
        darkTheme: <BundledTheme>'one-dark-pro',
    },

    twikoo: {
        js: 'https://gcore.jsdelivr.net/npm/twikoo@1.6.44/dist/twikoo.all.min.js',
        envId: 'https://twikoo.hwaygo.top/',
        preload: 'https://twikoo.hwaygo.top/',
    },
}

export default blogConfig
