"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const provinces = common_vendor.ref([
      "全部",
      "北京",
      "天津",
      "河北",
      "山西",
      "内蒙古",
      "辽宁",
      "吉林",
      "黑龙江",
      "上海",
      "江苏",
      "浙江",
      "安徽",
      "福建",
      "江西",
      "山东",
      "河南",
      "湖北",
      "湖南",
      "广东",
      "广西",
      "海南",
      "四川",
      "贵州",
      "云南",
      "西藏",
      "陕西",
      "甘肃",
      "青海",
      "宁夏",
      "新疆",
      "台湾",
      "香港",
      "澳门"
    ]);
    const localProducts = common_vendor.ref([
      { product_name: "牦牛牛奶", product_img: "/static/img/product/1.jpg", province: "四川" },
      { product_name: "牦牛牛奶", product_img: "/static/img/product/2.jpg", province: "四川" },
      { product_name: "有机牛奶", product_img: "/static/img/product/3.jpg", province: "内蒙古" },
      { product_name: "高原牛奶", product_img: "/static/img/product/4.jpg", province: "青海" }
    ]);
    const provinceIndex = common_vendor.ref(provinces.value.findIndex((p) => p === "四川"));
    const selectedProvince = common_vendor.ref("四川");
    const searchKeyword = common_vendor.ref("");
    const filteredProducts = common_vendor.computed(() => {
      return localProducts.value.filter((item) => {
        const provinceMatch = selectedProvince.value === "全部" || item.province.trim() === selectedProvince.value.trim();
        const keywordMatch = item.product_name.toLowerCase().includes(searchKeyword.value.trim().toLowerCase());
        return provinceMatch && keywordMatch;
      });
    });
    const onProvinceChange = (e) => {
      const index = e.detail.value;
      provinceIndex.value = index;
      selectedProvince.value = provinces.value[index];
    };
    const handleSearch = () => {
      common_vendor.index.showToast({ title: `搜索：${searchKeyword.value}`, icon: "none" });
    };
    const handleImgError = (item) => {
      item.product_img = `https://via.placeholder.com/200x220?text=${item.product_name}`;
    };
    const openMenu = () => {
      common_vendor.index.showToast({ title: "菜单开发中", icon: "none" });
    };
    const handleScan = () => {
      common_vendor.index.navigateTo({
        url: "/pages/scan/scan",
        fail: () => common_vendor.index.showToast({ title: "跳转扫码页失败", icon: "none" })
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(openMenu),
        b: common_vendor.o(handleSearch),
        c: searchKeyword.value,
        d: common_vendor.o(($event) => searchKeyword.value = $event.detail.value),
        e: common_assets._imports_0,
        f: common_vendor.o(handleSearch),
        g: common_assets._imports_1,
        h: common_vendor.o(handleScan),
        i: common_vendor.t(selectedProvince.value),
        j: provinces.value,
        k: provinceIndex.value,
        l: common_vendor.o(onProvinceChange),
        m: common_vendor.f(filteredProducts.value, (item, index, i0) => {
          return {
            a: item.product_img,
            b: common_vendor.o(($event) => handleImgError(item), index),
            c: common_vendor.t(item.product_name),
            d: common_vendor.t(item.province),
            e: index
          };
        }),
        n: filteredProducts.value.length === 0
      }, filteredProducts.value.length === 0 ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07e72d3c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
