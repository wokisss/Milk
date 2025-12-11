"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "scan",
  setup(__props) {
    const scanLineTop = common_vendor.ref(0);
    let animationTimer = null;
    let redirectTimer = null;
    common_vendor.onMounted(() => {
      startScanAnimation();
      redirectTimer = setTimeout(() => {
        common_vendor.index.navigateTo({
          url: "/pages/select/select"
          // 请确保路径正确
        });
      }, 3e3);
    });
    common_vendor.onUnmounted(() => {
      if (animationTimer) {
        clearInterval(animationTimer);
      }
      if (redirectTimer) {
        clearTimeout(redirectTimer);
      }
    });
    const startScanAnimation = () => {
      animationTimer = setInterval(() => {
        scanLineTop.value += 2;
        if (scanLineTop.value > 200) {
          scanLineTop.value = 0;
        }
      }, 30);
    };
    return (_ctx, _cache) => {
      return {
        a: scanLineTop.value + "px"
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-344f468c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/scan/scan.js.map
