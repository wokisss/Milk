"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "Logistics",
  setup(__props) {
    common_vendor.onLoad((options) => {
      common_vendor.index.__f__("log", "at pages/Logistics/Logistics.vue:67", "产品编码:", options.productCode);
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1be24eab"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/Logistics/Logistics.js.map
