import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        component: ()=>import('@/views/Home')
    },
    {
        path: '/login',
        component: ()=>import('@/views/Login')
    },
    {
        path: '/profile',
        component: ()=>import('@/views/profile/Profile'),
        children:[
        {
            path:'/profile/info',
            component: ()=>import('@/views/profile/children/Info')
        }
        ]
    },
    {
        path: '/city/:cityid',
        component: ()=>import('@/views/City')
    },
    {
        path: '/index',
        component: ()=>import('@/views/Index'),
        meta: {keepAlive: true}
    },
    {
        path: '/search/:geohash',
        component: ()=>import('@/views/Search')
    },
    //商店详情页
    {
        path: '/shop',
        component: ()=>import('@/views/shop/Shop'),
        children:
        [
            {
                path: '/shop/shopDetail',
                component: ()=>import('@/views/shop/children/ShopDetail'),
                children:
                [
                    {
                        path: '/shop/shopDetail/shopSafe',
                        component: ()=>import('@/views/shop/children/children/ShopSafe')
                    }
                ]
            },
            {
                path: '/shop/foodDetail',
                component: ()=>import('@/views/shop/children/FoodDetail')
            }
        ]
    },
    {
        path: '/food',
        component: ()=>import('@/views/Food')
    },
    {
        path: '/order',
        component: ()=>import('@/views/Order')
    },
    {
        path: '/vipcard',
        component: ()=>import('@/views/vipcard/VipCard'),
        children:
        [
            {
                path: '/vipcard/vipDescription',
                component: ()=>import('@/views/vipcard/children/VipDescription')
            },
            {
                path: '/vipcard/redeemvip',
                component: ()=>import('@/views/vipcard/children/RedeemVip')
            },
            {
                path: '/vipcard/invoiceRecord',
                component: ()=>import('@/views/vipcard/children/InvoiceRecord')
            }
        ]
    },
    {
        path: '/balance',
        component: ()=>import('@/views/balance/Balance'),
        children:
        [
            {
                path: '/balance/detail',
                component: ()=>import('@/views/balance/children/Detail')
            }
        ]
    },
    {
        path: '/download',
        component: ()=>import('@/views/Download.vue')
    },
    {
        path: '/benefit',
        component: ()=>import('@/views/benefit/Benefit'),
        children:
        [
            {
                path: '/benefit/coupon',
                component: ()=>import('@/views/benefit/children/Coupon')
            },
            {
                path: '/benefit/exchange',
                component: ()=>import('@/views/benefit/children/Exchange')
            },

            {
                path: '/benefit/hbDescription',
                component: ()=>import('@/views/benefit/children/HbDescription')
            },
            {
                path: '/benefit/recommend',
                component: ()=>import('@/views/benefit/children/Recommend')
            },
            {
                path: '/benefit/hbHistory',
                component: ()=>import('@/views/benefit/children/HbHistory')
            },
        ]
    },
    {
        path: '/points',
        component: ()=>import('@/views/points/Points'),
        children:
        [
            {
                path: '/points/detail',
                component: ()=>import('@/views/points/children/Detail')
            }
        ]
    },
    {
        path: '/confirmOrder',
        component: ()=>import('@/views/confirmOrder/ConfirmOrder'),
        children:
        [
            {
                path: '/confirmOrder/chooseAddress',
                component: ()=>import('@/views/confirmOrder/children/ChooseAddress'),
                children:
                [
                    {
                        path: 'addAddress',
                        component: ()=>import('@/views/confirmOrder/children/children/AddAddress'),
                        children:
                        [
                            {
                                path: 'searchAddress',
                                component: ()=>import('@/views/confirmOrder/children/children/children/SearchAddress')
                            }
                        ]
                    }
                ]
            },
            {
                path: 'invoice',
                component: ()=>import('@/views/confirmOrder/children/Invoice')
            },
            {
                path: 'remark',
                component: ()=>import('@/views/confirmOrder/children/Remark')
            },
            {
                path: 'payment',
                component: ()=>import('@/views/confirmOrder/children/Payment')
            },
            {
                path: 'userValidation',
                component: ()=>import('@/views/confirmOrder/children/UserValidation')
            }
        ]
    }
]

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router