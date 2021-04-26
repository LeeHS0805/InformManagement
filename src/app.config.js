export default {
  pages: [
    'pages/inform/inform',
    'pages/addInform/addInform',
    'pages/launch/launch',
    'pages/profile/profile',
    'pages/informDetail/informDetail',

  ],
  window: {
    backgroundTextStyle: 'dark',
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
