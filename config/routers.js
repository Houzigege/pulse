
const routes = [
  {
    "path": "/",
    "component": '../layouts/index.js',
    "routes": [
      {
        "path": "/chat",
        "exact": true,
        "component": './chat/ChatPage.js',
        "_title": "HRChatbot",
        "_title_default": "HRChatbot"
      },
      {
        "path": "/ageing",
        "exact": true,
        "component": './ageing/AgeingPage.js',
        "_title": "Ageing",
        "_title_default": "Ageing"
      },
      {
        "path": "/instagram",
        "exact": true,
        "component": './Instagram/InstagramPage.js',
        "_title": "Instagram",
        "_title_default": "Instagram"
      },
      {
        "path": "/",
        "exact": true,
        "component": './index.js',
        "_title": "Instagram",
        "_title_default": "Instagram"
      }
    ],
    "_title": "Instagram",
    "_title_default": "Instagram"
  }
];

export default routes;
