const menuList = [
    //第⼀个⼀级菜单的⼆级菜单数据
    [
        {
            title: '发布职位',
            keyValue: 'sub1',
            iconType: 'user',
            children: [
                {
                    title: '发布职位详情',
                    keyValue: '1',
                    routeurl: '/home/pageview'
                },
                {
                    title: '浏览⽤户⼈次报表',
                    keyValue: '2',
                    routeurl: '/home/userview'
                },
            ]
        },
        {
            title: '我的发布',
            keyValue: 'sub2',
            iconType: 'laptop',
            children: [
                {
                    title: '我的发布',
                    keyValue: '3',
                    routeurl: '/home/setpage'
                },
                {
                    title: '语⾔设置',
                    keyValue: '4',
                    routeurl: '/home/settinglanguage'
                },
            ]
        }
    ],
    //第⼆个⼀级菜单的⼆级菜单数据
    [
        {
            title: '关于在线教育',
            keyValue: 'sub1',
            iconType: 'notification',
            children: [
                {
                    title: '在线教育类别',
                    keyValue: '1',
                    routeurl: '/about/educationtype'
                },
                {
                    title: '在线教育如何选择',
                    keyValue: '2',
                    routeurl: '/about/seleducation'
                },
            ]
        },
        {
            title: '关于⼩D课堂',
            keyValue: 'sub2',
            iconType: 'user',
            children: [
                {
                    title: '前端讲师',
                    keyValue: '3',
                    routeurl: '/about/web'
                },
                {
                    title: '后端讲师',
                    keyValue: '4',
                    routeurl: '/about/backend'
                },
            ]
        }
    ],
    //第三个⼀级菜单的⼆级菜单数据
    [
        {
            title: '广告管理',
            keyValue: 'sub1',
            iconType: 'laptop',
            children: [
                {
                    title: '广告管理',
                    keyValue: '1',
                    routeurl: '/goods/advertising'
                },
                {
                    title: '冲啊！架构师',
                    keyValue: '2',
                    routeurl: '/goods/livearchitect'
                },
            ]
        },
        {
            title: '录播课程',
            keyValue: 'sub2',
            iconType: 'notification',
            children: [
                {
                    title: '前端课程',
                    keyValue: '3',
                    routeurl: '/goods/frontcourse'
                },
                {
                    title: '后端课程',
                    keyValue: '4',
                    routeurl: '/goods/backendcourse'
                },

            ]
        }
    ],
]
export default menuList