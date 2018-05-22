// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../../main/resources/static/index.html'),
        assetsRoot: path.resolve(__dirname, '../../main/resources/static'),
        assetsSubDirectory: '',
        assetsPublicPath: '',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 2018,
        autoOpenBrowser: true,
        assetsSubDirectory: '',
        assetsPublicPath: '',
        proxyTable: {
            '/microcredit': {
                //target: 'http://puhui8888.6655.la:8081',
               // target:'http://172.16.10.179:8081'//test
                target: 'http://192.168.23.47:8086', //张秀芳
                target: 'http://192.168.21.225:8086', //张秀芳
                target:'http://172.16.10.176:8081',//test
                //target: 'http://192.168.23.79:8086', //费新伟
                target: 'http://192.168.21.178:8080/', // 黄正刚
                target: 'http://172.16.10.13:8081/', //小贷 test
                changeOrigin: true,
                // pathRewrite: {
                //     '/dev': ''
                // }
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
