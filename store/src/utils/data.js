// This is the main function to get the setting
import {
  // FiUser,
  FiGift,
  FiGrid,
  FiAlertCircle,
  FiHelpCircle,
  FiTruck,
  FiPhoneCall,
  FiCreditCard,
  FiMail,
  FiMapPin,
  FiShoppingBag,
  FiFileText,
  FiUsers,
  FiPocket,
  FiSettings,
  FiList,
  FiPhoneIncoming,
} from "react-icons/fi";

// Here we are defining the pages
const pages = [
  // {
  //   title: 'User',
  //   href: '/user/dashboard',
  //   icon: FiUser,
  // },
  {
    title: "offer-page",
    href: "/offer",
    icon: FiGift,
  },
  {
    title: "checkout-page",
    href: "/checkout",
    icon: FiShoppingBag,
  },
  {
    title: "faq-page",
    href: "/faq",
    icon: FiHelpCircle,
  },
  {
    title: "about-us-page",
    href: "/about-us",
    icon: FiUsers,
  },
  {
    title: "contact-us-page",
    href: "/contact-us",
    icon: FiPhoneIncoming,
  },
  {
    title: "privacy-policy-page",
    href: "/privacy-policy",
    icon: FiPocket,
  },
  {
    title: "terms-and-conditions-page",
    href: "/terms-and-conditions",
    icon: FiFileText,
  },
  {
    title: "not-found-page",
    href: "/404",
    icon: FiAlertCircle,
  },
];

// Here we are defining the user sidebar
const userSidebar = [
  {
    title: "Dashboard",
    href: "/user/dashboard",
    icon: FiGrid,
  },
  {
    title: "My Orders",
    href: "/user/my-orders",
    icon: FiList,
  },
  {
    title: "Update Profile",
    href: "/user/update-profile",
    icon: FiSettings,
  },
  {
    title: "Change Password",
    href: "/user/change-password",
    icon: FiFileText,
  },
];

// Here we are defining the slider data
const sliderData = [
  {
    id: 1,
    title: "Slider1Title",
    info: "Slider1description",
    url: "/search?Category=biscuits--cakes",
    image: "/slider/slider-1.jpg",
  },
  {
    id: 2,
    title: "Slider2Title",
    info: "Slider2description",
    url: "/search?Category=fish--meat",
    image: "/slider/slider-2.jpg",
  },
  {
    id: 3,
    title: "Slider3Title",
    info: "Slider3description",
    url: "/search?category=fresh-vegetable",
    image: "/slider/slider-3.jpg",
  },
];

// Here we are defining the cta card data
const ctaCardData = [
  {
    id: 1,
    title: "Taste of",
    subTitle: "Fresh & Natural",
    image: "/cta/cta-bg-1.jpg",
    url: "/search?category=fresh-vegetable",
  },
  {
    id: 2,
    title: "Taste of",
    subTitle: "Fish & Meat",
    image: "/cta/cta-bg-2.jpg",
    url: "/search?Category=fish--meat",
  },
  {
    id: 3,
    title: "Taste of",
    subTitle: "Bread & Bakery",
    image: "/cta/cta-bg-3.jpg",
    url: "/search?Category=biscuits--cakes",
  },
];

// Here we are defining the feature promo
const featurePromo = [
  {
    id: 1,
    title: "featurePromo1-title",
    info: "featurePromo1-info",
    icon: FiTruck,
  },
  {
    id: 2,
    title: "featurePromo2-title",
    info: "featurePromo2-info",
    icon: FiPhoneCall,
  },
  {
    id: 3,
    title: "featurePromo3-title",
    info: "featurePromo3-info",
    icon: FiCreditCard,
  },
  {
    id: 4,
    title: "featurePromo4-title",
    info: "featurePromo4-info",
    icon: FiGift,
  },
];

// Here we are defining the contact data
const contactData = [
  {
    id: 1,
    title: "contact-page-box1-title",
    info: "contact-page-box1-info",
    icon: FiMail,
    contact: "Swift Shop@gmail.com",
    className: "bg-emerald-100",
  },
  {
    id: 2,
    title: "contact-page-box2-title",
    info: "contact-page-box2-info",
    icon: FiPhoneCall,
    contact: "029-00124667",
    className: "bg-yellow-100",
  },
  {
    id: 3,
    title: "contact-page-box3-title",
    info: "contact-page-box3-info",
    icon: FiMapPin,
    contact: "",
    className: "bg-indigo-100",
  },
];

// Here we are exporting the data
export {
  pages,
  userSidebar,
  sliderData,
  ctaCardData,
  featurePromo,
  contactData,
};
