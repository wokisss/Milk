"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const formData = common_vendor.ref({
      name: "",
      gender: "",
      // 空=未选择，'male'=男，'female'=女
      phone: ""
    });
    const errorMsg = common_vendor.ref("");
    common_vendor.onMounted(() => {
      const storedUser = common_vendor.index.getStorageSync("userInfo");
      if (storedUser && storedUser.phone) {
        formData.value = {
          name: storedUser.name || "",
          gender: storedUser.gender === "男" ? "male" : storedUser.gender === "女" ? "female" : "",
          phone: storedUser.phone || ""
        };
      }
    });
    const handleGender = (targetGender) => {
      formData.value.gender = formData.value.gender === targetGender ? "" : targetGender;
      if (formData.value.gender)
        errorMsg.value = "";
    };
    const handleLogin = () => {
      errorMsg.value = "";
      if (!formData.value.name.trim()) {
        errorMsg.value = "请输入名称";
        return;
      }
      if (!formData.value.gender) {
        errorMsg.value = "请选择性别";
        return;
      }
      if (!formData.value.phone || formData.value.phone.length !== 11) {
        errorMsg.value = "请输入正确的手机号";
        return;
      }
      common_vendor.index.showLoading({ title: "正在登录..." });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({ title: "登录成功", icon: "success" });
        common_vendor.index.setStorageSync("userInfo", {
          name: formData.value.name,
          gender: formData.value.gender === "male" ? "男" : "女",
          phone: formData.value.phone
        });
        setTimeout(() => {
          common_vendor.index.switchTab({ url: "/pages/home/home" });
        }, 1e3);
      }, 800);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$1,
        b: formData.value.name,
        c: common_vendor.o(($event) => formData.value.name = $event.detail.value),
        d: formData.value.gender === "male",
        e: common_vendor.o(($event) => handleGender("male")),
        f: common_vendor.o(($event) => handleGender("male")),
        g: formData.value.gender === "female",
        h: common_vendor.o(($event) => handleGender("female")),
        i: common_vendor.o(($event) => handleGender("female")),
        j: formData.value.phone,
        k: common_vendor.o(($event) => formData.value.phone = $event.detail.value),
        l: errorMsg.value
      }, errorMsg.value ? {
        m: common_vendor.t(errorMsg.value)
      } : {}, {
        n: common_vendor.o(handleLogin)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
