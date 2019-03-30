
import routes from './routers';

export default {
  plugins: [
    ['umi-plugin-react', {
      antd: true,
      dva: {
        immer: true
      },
      dynamicImport: false,
      title: 'Ageing',
      dll: false,
      hardSource: false,
      routes: {
        exclude: [
          /components/,
        ],
      },
    }],
  ],
  routes: routes,
  targets: {
    ie: 10,
  },
  proxy: {
    "api/lifestyle": {
      "target": "https://instagramdevapi.azurewebsites.net/lifestyle?userhandle=realdonaldtrump' ",
      "changeOrigin": true,
      "pathRewrite": { "^api/lifestyle": "/lifestyle" }
    }
  }
}
