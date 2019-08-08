// 配置
const configs = {
	host:'localhost',//IP
	port:8084,//端口
	backURL:'http://localhost:8088',//后台路径
	mockURL: 'https://www.easy-mock.com/mock/5d35536d398c7817dd218b57/wbapi'//mock测试路径
}
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const resolve = dir => path.resolve(__dirname, dir)
module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // 基本路径
	outputDir: 'dist', // 输出文件目录
	assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
	lintOnSave: true, // eslint-loader 是否在保存的时候检查
	runtimeCompiler: false, //是否使用包含运行时编译器的 Vue 构建版本
	productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
	// 链式配置
	chainWebpack: config => {
		//修复 Lazy loading routes Error
		config.plugin('html').tap(args => {
			args[0].chunksSortMode = 'none';
			return args;
		});

		// 添加别名
		config.resolve.alias
			.set('@', resolve('src'))
			.set('assets', resolve('src/assets'))
			.set('components', resolve('src/components'))
			.set('views', resolve('src/views'))
			.set('utils', resolve('src/utils'))
			.set('styles', resolve('src/styles'))

	},
	// 简单/基础配置，比如引入一个新插件
	configureWebpack: config => {
		if (process.env.NODE_ENV === 'production') {
			// 为生产环境修改配置...
			const plugins = []
			plugins.push(
				new UglifyJsPlugin({
					uglifyOptions: {
						compress: {
							drop_console: true,
							drop_debugger: true,
							pure_funcs: ['console.log'] //移除console
						},
						mangle: false,
						output: {
							beautify: true, //压缩注释
						}
					},
					sourceMap: false,
					parallel: true,
				})
			)
			plugins.push( // 使用gzip打包压缩css/js
				new CompressionWebpackPlugin({
					filename: '[path].gz[query]',
					algorithm: 'gzip',
					test: new RegExp('\\.(js|css)$'),
					threshold: 10240,
					minRatio: 0.8
				})
			)
			config.plugins = [...config.plugins, ...plugins]
		}
	},
	// css相关配置
	css: {
		extract: true, // 是否使用css分离插件 ExtractTextPlugin
		sourceMap: false, // 开启 CSS source maps?
		loaderOptions: {}, // css预设器配置项
		modules: false // 启用 CSS modules for all css / pre-processor files.
	},
	parallel: require('os').cpus().length > 1,
	pwa: {},
	// webpack-dev-server 相关配置
	devServer: {
		open: true, //配置自动启动浏览器
		host: configs.host, //IP
		port: configs.port, // 端口号
		https: false,
		hotOnly: false,
		proxy: { // 配置跨域，打包后无效
			'/api': {
				target: configs.backURL, //后台地址
				changeOrigin: true, //改变源
				ws: true, //是否代理websockets
				pathRewrite: {
					'^/api': ''
				}
			},
			'/mock': {
				target: configs.mockURL, //mock测试地址
				changeOrigin: true, //改变源
				ws: true, //是否代理websockets
				pathRewrite: {
					'^/mock': ''
				}
			},
		}, // 配置跨域处理
		before: app => {}
	},
	// 第三方插件配置
	pluginOptions: {}
}
