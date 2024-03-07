export default {
    title: 'Byrhz',
    description: 'byrhz 的个人空间',
    base: '/', 
    themeConfig: {
        nav: [ // 页面右上角的导航
            {
                text: '工作日志',
                items: [ // 可以配置成下拉
                    { text: '24年02月', link: '/work/202402' },
                    { text: '24年03月', link: '/work/202403' },
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