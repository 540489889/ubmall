webpackJsonp([40],{"5jzw":function(a,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={name:"PayIndex",data:function(){return{account_bcac:"",list:{},type:"number",readonly:!0,maxlength:100,disabled:!0,autofocus:!0,autocomplete:!0,eye:{open:!0,reverse:!1}}},methods:{showToastTxtOnly:function(a){this.toast=this.$createToast({txt:a,type:"txt"}),this.toast.show()},getOrderInfor:function(){var a=this,t=this.$route.query.order_id;this.http.get(this.ports.order.createInfor+"?order_id="+t,function(t){if(console.log(t),a.$store.commit("changeLoading",!1),t.success){var e=t.data;a.list=e.orderInfo,a.account_bcac=e.account_bcac}else a.list="",a.showToastTxtOnly(t.msg)})},payClick:function(){var a=this;this.dialog=this.$createDialog({type:"prompt",title:"交易密码",prompt:{value:"",type:"password",maxlength:6,autofocus:!0,autocomplete:!0,eye:{open:!1,reverse:!1},placeholder:"请输入"},onConfirm:function(t,e){if(!e)return a.showToastTxtOnly("请输入交易密码"),!1;a.http.post(a.ports.order.bcacPay,{order_sn:a.list.order_sn,pay_key:e},function(t){console.log(t),t.success?a.$router.push({path:"/order/success",query:{order_sn:a.list.order_sn}}):a.showToastTxtOnly(t.msg)})}}).show()}},mounted:function(){this.getOrderInfor()}},r={render:function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"payWrapper"},[e("div",{staticClass:"allMoney flex-box"},[e("h5",[a._v("支付总金额")]),a._v(" "),e("h2",[a._v(a._s(a.list.order_amount)),e("span",[a._v("BCAC")])]),a._v(" "),e("p",[a._v("当前可用BCAC："+a._s(a.account_bcac))])]),a._v(" "),e("div",{staticClass:"orderList"},[e("ul",[e("li",{staticClass:"flex-box"},[e("span",[a._v("订单编号：")]),a._v(" "),e("span",[a._v(a._s(a.list.order_sn))])]),a._v(" "),e("li",{staticClass:"flex-box"},[e("span",[a._v("下单时间：")]),a._v(" "),e("span",[a._v(a._s(a.list.add_time))])])])]),a._v(" "),e("div",{staticClass:"payBtnBox"},[e("a",{staticClass:"payBtn",on:{click:a.payClick}},[a._v("立即支付")]),a._v(" "),e("router-link",{staticClass:"cancelOrder",attrs:{tag:"a",to:"/"}},[a._v("取消支付")])],1)])},staticRenderFns:[]};var o=e("VU/8")(n,r,!1,function(a){e("w9fe")},"data-v-0a439972",null);t.default=o.exports},HDAp:function(a,t,e){(a.exports=e("FZ+f")(!0)).push([a.i,"\n.payWrapper[data-v-0a439972]{width:100vw;min-height:100vh;background-color:#f9f9f9;font-size:3.733vw\n}\n.payWrapper .allMoney[data-v-0a439972]{height:42.667vw;width:100%;background-color:#fff;flex-wrap:wrap;text-align:center;padding:.5rem;box-sizing:border-box\n}\n.payWrapper .allMoney h5[data-v-0a439972]{width:100%;font-size:4.267vw;position:relative;top:2.667vw\n}\n.payWrapper .allMoney h2[data-v-0a439972]{color:#fa2947;font-size:9.067vw;font-weight:700;width:100%\n}\n.payWrapper .allMoney h2 span[data-v-0a439972]{font-size:5.6vw\n}\n.payWrapper .allMoney p[data-v-0a439972]{position:relative;top:-2.667vw;color:#c1c8d6;width:100%\n}\n.payWrapper .orderList[data-v-0a439972]{background-color:#fff;margin-top:2.667vw\n}\n.payWrapper .orderList ul[data-v-0a439972]{padding:2.667vw\n}\n.payWrapper .orderList ul li[data-v-0a439972]{justify-content:space-between;padding:2.667vw 0;font-size:4.267vw\n}\n.payWrapper .payBtnBox[data-v-0a439972]{margin-top:46.667vw;padding:2.667vw\n}\n.payWrapper .payBtnBox a[data-v-0a439972]{display:block;width:100%;height:12vw;line-height:12vw;border-radius:1.333vw;margin-top:3.333vw\n}\n.payWrapper .payBtnBox .payBtn[data-v-0a439972]{background:-webkit-linear-gradient(#fd4b2d,#dc2912);background:-o-linear-gradient(#fd4b2d,#dc2912);background:-moz-linear-gradient(#fd4b2d,#dc2912);background:linear-gradient(#fd4b2d,#dc2912);color:#fff\n}\n.payWrapper .payBtnBox .cancelOrder[data-v-0a439972]{color:#333;border:1px solid #bbb\n}","",{version:3,sources:["G:/公司/bcac/ubmall/src/page/pay/index.vue"],names:[],mappings:";AACA,6BAA6B,YAAY,iBAAiB,yBAAyB,iBAAiB;CACnG;AACD,uCAAuC,gBAAgB,WAAW,sBAAsB,eAAe,kBAAkB,cAAc,qBAAqB;CAC3J;AACD,0CAA0C,WAAW,kBAAkB,kBAAkB,WAAW;CACnG;AACD,0CAA0C,cAAc,kBAAkB,gBAAgB,UAAU;CACnG;AACD,+CAA+C,eAAe;CAC7D;AACD,yCAAyC,kBAAkB,aAAa,cAAc,UAAU;CAC/F;AACD,wCAAwC,sBAAsB,kBAAkB;CAC/E;AACD,2CAA2C,eAAe;CACzD;AACD,8CAA8C,8BAA8B,kBAAkB,iBAAiB;CAC9G;AACD,wCAAwC,oBAAoB,eAAe;CAC1E;AACD,0CAA0C,cAAc,WAAW,YAAY,iBAAiB,sBAAsB,kBAAkB;CACvI;AACD,gDAAgD,oDAAoD,+CAA+C,iDAAiD,4CAA4C,UAAU;CACzP;AACD,qDAAqD,WAAW,qBAAqB;CACpF",file:"index.vue",sourcesContent:["\n.payWrapper[data-v-0a439972]{width:100vw;min-height:100vh;background-color:#f9f9f9;font-size:3.733vw\n}\n.payWrapper .allMoney[data-v-0a439972]{height:42.667vw;width:100%;background-color:#fff;flex-wrap:wrap;text-align:center;padding:.5rem;box-sizing:border-box\n}\n.payWrapper .allMoney h5[data-v-0a439972]{width:100%;font-size:4.267vw;position:relative;top:2.667vw\n}\n.payWrapper .allMoney h2[data-v-0a439972]{color:#fa2947;font-size:9.067vw;font-weight:700;width:100%\n}\n.payWrapper .allMoney h2 span[data-v-0a439972]{font-size:5.6vw\n}\n.payWrapper .allMoney p[data-v-0a439972]{position:relative;top:-2.667vw;color:#c1c8d6;width:100%\n}\n.payWrapper .orderList[data-v-0a439972]{background-color:#fff;margin-top:2.667vw\n}\n.payWrapper .orderList ul[data-v-0a439972]{padding:2.667vw\n}\n.payWrapper .orderList ul li[data-v-0a439972]{justify-content:space-between;padding:2.667vw 0;font-size:4.267vw\n}\n.payWrapper .payBtnBox[data-v-0a439972]{margin-top:46.667vw;padding:2.667vw\n}\n.payWrapper .payBtnBox a[data-v-0a439972]{display:block;width:100%;height:12vw;line-height:12vw;border-radius:1.333vw;margin-top:3.333vw\n}\n.payWrapper .payBtnBox .payBtn[data-v-0a439972]{background:-webkit-linear-gradient(#fd4b2d,#dc2912);background:-o-linear-gradient(#fd4b2d,#dc2912);background:-moz-linear-gradient(#fd4b2d,#dc2912);background:linear-gradient(#fd4b2d,#dc2912);color:#fff\n}\n.payWrapper .payBtnBox .cancelOrder[data-v-0a439972]{color:#333;border:1px solid #bbb\n}"],sourceRoot:""}])},w9fe:function(a,t,e){var n=e("HDAp");"string"==typeof n&&(n=[[a.i,n,""]]),n.locals&&(a.exports=n.locals);e("rjj0")("58258794",n,!0,{})}});
//# sourceMappingURL=40.6a87a199ec5e921f7c51.js.map