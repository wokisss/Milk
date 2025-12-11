"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "scan",
  setup(__props) {
    const scanResult = common_vendor.ref("");
    const openScan = () => {
      common_vendor.index.scanCode({
        scanType: ["qrCode", "barCode"],
        // 支持二维码和条形码
        onlyFromCamera: true,
        // 仅从摄像头扫码（不允许选择相册）
        success: (res) => {
          const scanCode = res.result || "";
          if (scanCode) {
            common_vendor.index.navigateTo({
              url: `/pages/select/select?scanCode=${encodeURIComponent(scanCode)}`,
              // 携带参数跳转
              success: () => {
                common_vendor.index.showToast({ title: "扫码成功，跳转中...", icon: "success", duration: 1500 });
                scanResult.value = "";
              },
              fail: (err) => {
                common_vendor.index.showToast({ title: "跳转失败，请重试", icon: "none" });
                common_vendor.index.__f__("log", "at pages/scan/scan.vue:45", "跳转select页面失败：", err);
              }
            });
          } else {
            scanResult.value = "扫码失败";
            common_vendor.index.showToast({ title: "扫码失败，未获取到有效信息", icon: "none", duration: 1500 });
          }
        },
        fail: (err) => {
          scanResult.value = "扫码失败";
          common_vendor.index.showToast({ title: "扫码失败，请重试", icon: "none", duration: 1500 });
          common_vendor.index.__f__("log", "at pages/scan/scan.vue:58", "扫码失败详情：", err);
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(openScan),
        b: scanResult.value === "扫码失败"
      }, scanResult.value === "扫码失败" ? {
        c: common_vendor.t(scanResult.value)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-344f468c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/scan/scan.js.map
