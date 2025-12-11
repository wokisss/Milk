"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "unmy",
  setup(__props) {
    const router = common_vendor.useRouter();
    const goToLogin = () => {
      router.push("/pages/login/login");
    };
    const goToHome = () => {
      router.push("/pages/home/home");
    };
    common_vendor.onMounted(() => {
      const backBtn = document.querySelector(".uni-page-head-hd");
      if (backBtn) {
        backBtn.style.display = "none";
      }
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(goToLogin),
        c: common_assets._imports_1$1,
        d: common_vendor.o(goToHome),
        e: common_assets._imports_2
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c28d5cd2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/unmy/unmy.js.map
