export default {
  pages: [
    'pages/myChannel/myChannel',
    'pages/login/login',
    'pages/profile/profile',
    'pages/myGroupDetail/myGroupDetail',
    'pages/filterInfo/filterInfo',
    'pages/createChannel/createChannel',
    'pages/joinChannel/joinChannel',
    'pages/register/register',
    'pages/launch/launch',
    'pages/addInform/addInform',
    'pages/inform/inform',
    'pages/informDetail/informDetail',
    'pages/faq/faq',
    'pages/setting/setting',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: "#000000",
    backgroundColor: "#fafafa",
    selectedColor: "#333",
    borderStyle: "white",
    list: [
      {
        text: "通知",
        pagePath: "pages/inform/inform",
        iconPath: "static/tabs/calendar.png",
        selectedIconPath: "static/tabs/calendar-active.png"
      },
      {
        text: "频道",
        pagePath: "pages/launch/launch",
        iconPath: "static/tabs/caps-lock.png",
        selectedIconPath: "static/tabs/caps-lock-active.png"
      },
      {
        text: "个人",
        pagePath: "pages/profile/profile",
        iconPath: "static/tabs/user.png",
        selectedIconPath: "static/tabs/user-active.png"
      }

    ],
    position: "bottom"
  },

}
