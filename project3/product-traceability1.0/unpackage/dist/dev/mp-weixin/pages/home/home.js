"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const selectedProvince = common_vendor.ref("四川");
    const products = common_vendor.ref([
      { img: "https://via.placeholder.com/120x100?text=牦牛牛奶", label: "牦牛牛奶" },
      { img: "https://via.placeholder.com/120x100?text=牦牛牛奶", label: "牦牛牛奶" },
      { img: "https://via.placeholder.com/120x100?text=牦牛牛奶", label: "牦牛牛奶" },
      { img: "https://via.placeholder.com/120x100?text=牦牛牛奶", label: "牦牛牛奶" }
    ]);
    const openMenu = () => {
      common_vendor.index.showToast({ title: "打开菜单", icon: "none" });
    };
    const handleSearch = () => {
      common_vendor.index.showToast({ title: "执行搜索", icon: "none" });
    };
    const handleScan = () => {
      common_vendor.index.navigateTo({ url: "/pages/scan/scan" });
    };
    const chooseLocation = () => {
      const provinces = ["北京", "天津", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "上海", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "重庆", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆", "台湾", "香港", "澳门"];
      common_vendor.index.showActionSheet({
        itemList: provinces,
        success: (res) => {
          selectedProvince.value = provinces[res.tapIndex];
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(openMenu),
        b: common_assets._imports_0$1,
        c: common_vendor.o(handleSearch),
        d: common_assets._imports_1,
        e: common_vendor.o(handleScan),
        f: common_vendor.t(selectedProvince.value),
        g: common_vendor.o(chooseLocation),
        h: common_vendor.f(products.value, (item, index, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.label),
            c: index
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
