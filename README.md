# myelm

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
# myelm
## Bug List
- 对于商店详情和商品详情而言，若使用多级路由直接进入会出现很多数据都是null的情况
- 对于`Shop.vue`而言，将**商品**和**评价**两个模块写在一个组件里太**了，找时间重构一下
- 登录模块总是失效，焯！

## TODO LIST

#### PAGES
进度：26/43
- [x] Balance.vue
    - [x] Detail.vue
- [x] Benefit.vue
    - [x] Recommend.vue
    - [x] Coupon.vue
    - [x] Exchange.vue
    - [x] HbDescription.vue
    - [x] HbHistory.vue
- [x] City.vue
- [ ] ConfirmOrder.vue
    - [ ] ChooseAddress.vue
    - [ ] Invoice.vue
    - [ ] Payment.vue
    - [ ] Remark.vue
    - [ ] UserValidation.vue
        - [ ] AddAddress.vue
            - [ ] SearchAddress.vue
- [x] Download.vue
- [ ] Find.vue
- [x] Food.vue
- [ ] Forget.vue
- [x] Home.vue
- [x] Login.vue
- [x] Index.vue
- [ ] Order.vue
    - [ ] OrderDetail.vue
- [x] Points.vue
    - [x] Detail.vue
- [x] Profile.vue
    - [x] Info.vue
        - [ ] Address.vue
        - [ ] SetUsername.vue
            - [ ] Add.vue
                - [ ] AddDetai.vue
- [ ] Search.vue
- [x] Shop.vue
    - [x] ShopDetail.vue
        - [x] ShopSafe.vue
    - [x] FoodDetai.vue
- [x] VipCard.vue
    - [x] InvoiceCard.vue
    - [x] RedeemVip.vue
    - [x] VipDescription.vue

#### COMPONENTS
进度：8/9
- [x] FootGuider.vue
- [x] TopHeader.vue
- [x] AlertTip.vue
- [x] BuyCart.vue
- [ ] ComputeTime.vue
- [x] Loading.vue
- [x] RatingStar.vue
- [x] ShopList.vue
- [x] Svg.vue~~直接CV的，我确实不会~~