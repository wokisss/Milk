"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "select",
  setup(__props) {
    common_vendor.onLoad((options) => {
      common_vendor.index.__f__("log", "at pages/select/select.vue:34", "扫码获得的数据:", options.qrCodeData);
    });
    const navigateTo = (type) => {
      let pagePath = "";
      switch (type) {
        case "logistics":
          pagePath = "/pages/Logistics/Logistics";
          break;
        case "market":
          pagePath = "/pages/Supermarket/Supermarket";
          break;
        case "factory":
          pagePath = "/pages/Processing/Processing";
          break;
      }
      if (pagePath) {
        common_vendor.index.navigateTo({
          url: pagePath,
          success: () => {
            common_vendor.index.__f__("log", "at pages/select/select.vue:58", `跳转到${type}页面成功`);
          },
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/select/select.vue:61", `跳转到${type}页面失败:`, err);
          }
        });
      }
    };
    const navigateToHome = () => {
      common_vendor.index.reLaunch({
        url: "/pages/home/home",
        success: () => {
          common_vendor.index.__f__("log", "at pages/select/select.vue:72", "返回首页成功");
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/select/select.vue:75", "返回首页失败:", err);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(navigateToHome),
        b: common_vendor.o(($event) => navigateTo("logistics")),
        c: common_vendor.o(($event) => navigateTo("market")),
        d: common_vendor.o(($event) => navigateTo("factory"))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bb29bc01"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/select/select.js.map
