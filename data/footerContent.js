module.exports = [
  {
    id: 1,
    title: "Company",
    menuList: [
      { name: "Who We Are", routerPath: "/others-pages/about" },
      { name: "Contact", routerPath: "/contact" },
      { name: "Help Center", routerPath: "/" },
      { name: "Blog", routerPath: "/blog/blog-list-v1" },
    ],
  },
  {
    id: 2,
    title: "Support",
    menuList: [
      { name: "Contact", routerPath: "/contact" },
      { name: "Legal Notice", routerPath: "/" },
      { name: "Privacy Policy", routerPath: "/" },
      { name: "Terms and Conditions", routerPath: "/" },
      { name: "Cookies Policy ", routerPath: "/others-pages/help-center" },
    ],
  },
  {
    id: 3,
    title: "Other Services",
    menuList: [
      { name: "Horse Transportation", routerPath: "#" },
      { name: "Horse Accessories", routerPath: "#" },
      { name: "Horse Pharmacy", routerPath: "#" },
      { name: "Doctor On Call", routerPath: "#" },
    ],
  },
];
