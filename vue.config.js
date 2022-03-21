module.exports = {
    devServer: {
        proxy: {
            [process.env.VUE_APP_BASE_API]:{
                target: 'http://localhost:8081',
                changeOrigin: true,
                pathRewrite:{
                    ['^' + process.env.VUE_APP_BASE_API] : ''
                }
            }
        }
    }
}