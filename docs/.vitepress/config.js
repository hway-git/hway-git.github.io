export default {
    title: 'Byrhz',
    description: 'byrhz 的个人空间',
    base: '/', 
    themeConfig: {
        nav: [ // 页面右上角的导航
            {
                text: '个人规划',
                items: [ // 可以配置成下拉
                { text: '2024个人规划', link: '/plan/2024的个人计划' },
                ]
            }
        ],
        socialLinks: [{ icon: "github", link: "https://github.com/madderbughaha" }], // 可以连接到 github
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2024 Madderbughaha 转载请注明出处'
          }
    },
    vite: {
        favicon: "favicon.ico"
    }
}