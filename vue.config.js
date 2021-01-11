const path = require('path')

function resolve (dir) {
	return path.join(__dirname, dir)
}
let proxy = null; let
startUpDevServer = false
if (process.env.NODE_ENV === 'dev') {
	startUpDevServer = true
	proxy = {
		'/api/': {
			target: process.env.VUE_APP_BASE_URL,
			changeOrigin: true
		},
		'/docapi/': {
			target: process.env.VUE_APP_BASE_URL_RESIDENT_DOCTOR,
			changeOrigin: true,
			pathRewrite: {
				'^/docapi': '/api'
			}
		},
		'/nurseapi/': {
			target: process.env.VUE_APP_BASE_URL_NURSE,
			changeOrigin: true,
			pathRewrite: {
				'^/nurseapi': '/api'
			}
		},
		'/qualityapi/': {
			target: process.env.VUE_APP_BASE_URL_RESIDENT_QUALITY,
			changeOrigin: true,
			pathRewrite: {
				'^/qualityapi': '/api'
			}
		},
		'/outpatientapi/': {
			target: process.env.VUE_APP_BASE_URL_OUTPATIENT,
			changeOrigin: true,
			pathRewrite: {
			  '^/outpatientapi': '/api'
			}
		  }
	}
}
module.exports = {
	publicPath: '',
	outputDir: process.env.outputDir,
	assetsDir: 'static',
	lintOnSave: true,
	productionSourceMap: false,
	devServer: {
		open: startUpDevServer,
		hot: startUpDevServer,
		hotOnly: startUpDevServer,
		proxy
	},
	configureWebpack: { // webpack 配置
		output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.js】
			filename: `static/js/[hash].js`
		},
		resolve: {
			alias: {
				'@': resolve('src')
			}
		}
	},
	chainWebpack: (config) => {
		config.resolve.alias.set('@', resolve('src'))
	}
}
