"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "my",
  setup(__props) {
    const userInfo = common_vendor.ref({
      name: "",
      gender: "",
      // 存储文本：'男'/'女'/'未选择'
      phone: ""
    });
    const form = common_vendor.ref({
      name: "",
      gender: "",
      // 存储值：'male'/'female'/'': 与radio值对应
      phone: ""
    });
    common_vendor.onMounted(() => {
      const storedUser = common_vendor.index.getStorageSync("userInfo");
      if (storedUser && storedUser.phone) {
        userInfo.value = {
          name: storedUser.name || "",
          gender: storedUser.gender || "未选择",
          phone: storedUser.phone || ""
        };
        form.value = {
          name: storedUser.name || "",
          gender: storedUser.gender === "男" ? "male" : storedUser.gender === "女" ? "female" : "",
          phone: storedUser.phone || ""
        };
      } else {
        common_vendor.index.navigateTo({ url: "/pages/login/login" });
      }
    });
    const handleGenderChange = (e) => {
      form.value.gender = e.detail.value;
    };
    const handleSave = () => {
      if (!form.value.name.trim()) {
        common_vendor.index.showToast({ title: "请输入姓名", icon: "none", duration: 1500 });
        return;
      }
      if (!form.value.phone || form.value.phone.length !== 11) {
        common_vendor.index.showToast({ title: "请输入正确的手机号", icon: "none", duration: 1500 });
        return;
      }
      const genderText = form.value.gender === "male" ? "男" : form.value.gender === "female" ? "女" : "未选择";
      const updatedUser = {
        name: form.value.name.trim(),
        gender: genderText,
        phone: form.value.phone
      };
      userInfo.value = updatedUser;
      common_vendor.index.setStorageSync("userInfo", updatedUser);
      common_vendor.index.showToast({ title: "信息保存成功", icon: "success", duration: 1500 });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(userInfo.value.name || "未登录"),
        b: userInfo.value.phone
      }, userInfo.value.phone ? {
        c: common_vendor.t(userInfo.value.phone)
      } : {}, {
        d: form.value.name,
        e: common_vendor.o(($event) => form.value.name = $event.detail.value),
        f: form.value.gender === "male",
        g: form.value.gender === "female",
        h: common_vendor.o(handleGenderChange),
        i: form.value.phone,
        j: common_vendor.o(($event) => form.value.phone = $event.detail.value),
        k: common_vendor.o(handleSave)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2f1ef635"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/my.js.map
