"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "Supermarket",
  setup(__props) {
    common_vendor.onLoad((options) => {
      common_vendor.index.__f__("log", "at pages/Supermarket/Supermarket.vue:54", "产品编码:", options.productCode);
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/Supermarket/Supermarket.js.map
