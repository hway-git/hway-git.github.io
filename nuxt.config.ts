import blogConfig from './blog.config'

export default defineNuxtConfig({
    app: {
        head: {
            htmlAttrs: {
                lang: blogConfig.language,
            },
            link: [
                { rel: 'icon', href: blogConfig.favicon },
                { rel: 'alternate', type: 'application/atom+xml', href: '/atom.xml' },
                { rel: 'preconnect', href: blogConfig.twikoo.preload },
                { rel: 'preconnect', href: 'https://cdn-font.hyperos.mi.com' },
                // 浏览器渲染中文 VF 字重有问题
                { rel: 'stylesheet', href: 'https://cdn-font.hyperos.mi.com/font/css?family=MiSans_VF:VF:Chinese_Simplify,Latin&display=swap', media: 'none', onload: 'this.media="all"' },
                // https://cdn-font.hyperos.mi.com/font/css?family=MiSans:100,200,300,400,450,500,600,650,700,900:Chinese_Simplify,Latin&display=swap
                { rel: 'preconnect', href: 'https://fonts.googleapis.cn' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.cn' },
                { rel: 'stylesheet', href: 'https://fonts.googleapis.cn/css2?family=Fira+Code:wght@300..700&family=Noto+Serif+SC:wght@200..900&display=swap', media: 'none', onload: 'this.media="all"' },
                // { rel: 'stylesheet', href: 'https://gcore.jsdelivr.net/npm/nerdfonts-web/nf.min.css' },
            ],
            meta: [
                { name: 'author', content: blogConfig.author.name },
                { name: 'color-scheme', content: 'light dark' },
                { 'name': 'generator', 'data-github-repo': 'https://github.com/hway-git/hway-git.github.io' },
            ],
            templateParams: {
                separator: '|',
            },
            titleTemplate: `%s %separator ${blogConfig.title}`,
            script: blogConfig.scripts,
        },
        rootId: 'z-root',
    },

    compatibilityDate: '2024-11-26',

    components: [
        { path: '~/components/partial', prefix: 'Z' },
        { path: '~/components/vi', prefix: 'Z', global: true },
        '~/components',
    ],

    css: [
        '@/assets/css/article.scss',
        '@/assets/css/color.scss',
        '@/assets/css/main.scss',
        '@/assets/css/reusable.scss',
    ],

    experimental: {
        viewTransition: true,
    },

    future: {
        compatibilityVersion: 4,
    },

    routeRules: {
        '/api/stats': { prerender: true },
        '/atom.xml': { prerender: true },
    },

    runtimeConfig: {
        public: {
            buildTime: new Date().toISOString(),
        },
    },

    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "@/assets/css/_variable.scss" as *;',
                    api: 'modern-compiler',
                },
            },
        },
    },

    modules: [
        '@nuxt/content',
        '@nuxt/icon',
        '@nuxt/image',
        '@nuxtjs/color-mode',
        '@nuxtjs/seo',
        '@pinia/nuxt',
        '@vueuse/nuxt',
        '@zinkawaii/nuxt-shiki',
    ],

    colorMode: {
        preference: 'system',
        fallback: 'light',
        classSuffix: '',
    },

    content: {
        experimental: {
            search: {},
        },
        highlight: {
            langs: [...blogConfig.shiki.langs, 'mermaid'],
            theme: {
                default: blogConfig.shiki.defaultTheme,
                dark: blogConfig.shiki.darkTheme,
            },
        },
        markdown: {
            remarkPlugins: ['remark-reading-time'],
            toc: { depth: 4, searchDepth: 4 },
        },
    },

    icon: {},

    image: {
        domains: blogConfig.imageDomains,
        format: ['avif', 'webp'],
    },

    robots: {
        disallow: blogConfig.robotsNotIndex,
    },

    shiki: {
        bundledLangs: blogConfig.shiki.langs,
        bundledThemes: blogConfig.shiki.themes,
        defaultLang: 'log',
        defaultTheme: {
            light: blogConfig.shiki.defaultTheme,
            dark: blogConfig.shiki.darkTheme,
        },
    },

    site: {
        name: blogConfig.title,
        url: blogConfig.url,
    },
})
