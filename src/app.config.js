export default {
  pages: [
    'pages/login/login',
    'pages/register/register',
    'pages/profile/profile',
    'pages/myChannel/myChannel',
    'pages/myGroupDetail/myGroupDetail',
    'pages/createChannel/createChannel',
    'pages/joinChannel/joinChannel',
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
    navigationBarTextStyle: 'black',
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
        text: "发布",
        pagePath: "pages/addInform/addInform",
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
