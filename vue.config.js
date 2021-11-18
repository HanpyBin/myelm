const context = [
            '/shopping',
            '/ugc',
            '/v1',
            '/v2',
            '/v3',
            '/v4',
            '/bos',
            '/member',
            '/promotion',
            '/eus',
            '/payapi',
            '/img',
            ];
module.exports = {
    devServer: {
        port: 8080,
        proxy:{
            '/shopping':{
                target: 'http://cangdu.org:8001',
                wb: true,
                changeOrigin: true
            },
            '/ugc':{
                target: 'http://cangdu.org:8001',
                wb: true,
                changeOrigin: true
            },
            '/v1':{
                target: 'http://cangdu.org:8001',
                wb: true,
                changeOrigin: true
            },
            '/v2':{
                target: 'http://cangdu.org:8001',
                wb: true,
                changeOrigin: true
            },
            '/v3':{
                target: 'http://cangdu.org:8001',
                wb: true,
                changeOrigin: true
            },
            '/v4':{
                target: 'http://cangdu.org:8001',
                wb: true,
                changeOrigin: true
            },
            '/bos':{
                target: 'http://cangdu.org:8001',
                wb: true,
                changeOrigin: true
            },
            '/member':{
                target: 'http://cangdu.org:8001',
                wb: true,
                changeOrigin: true
            },
            '/promotion':{
                target: 'http://cangdu.org:8001',
                wb: true,
                changeOrigin: true
            },
            '/eus':{
                target: 'http://cangdu.org:8001',
                wb: true,
                changeOrigin: true
            },
            '/payapi':{
                target: 'http://cangdu.org:8001',
                wb: true,
                changeOrigin: true
            },
            '/img':{
                target: 'http://cangdu.org:8001',
                wb: true,
                changeOrigin: true
            },
        }
    }
}