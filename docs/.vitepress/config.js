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
                ]
            }
        ],
        socialLinks: [{ icon: "github", link: "https://github.com/madderbughaha" }], // 可以连接到 github
    },
}