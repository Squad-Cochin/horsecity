import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import Dashboard from "../Pages/Dashboard";

// Import Calender
import Calender from "../Pages/Calender";

import ListCustomerTable from "../Pages/Tables/ListTables/ListCustomerTable";
import ListVehiclesTable from "../Pages/Tables/ListTables/ListVehiclesTable";

// Import E-mail
import Inbox from "../Pages/E-mail/Inbox";
import ReadEmail from "../Pages/E-mail/ReadEmail";
import EmailCompose from "../Pages/E-mail/EmailCompose";

// Import service providers
import ServiceProviders from "../Pages/ServiceProviders/ServiceProviderTable";

// Import drivers
import Drivers from "../Pages/Drivers/DriverTable";

//Import trip deatails
import TripDeatails from "../Pages/TripDetails/TripDetailTable";

//Import monthly reports
import MonthlyReports  from "../Pages/Reports/ReportTable";
import ServiceProviderReport  from "../Pages/Reports/ServiceProviderReport";
import CustomerReport from "../Pages/Reports/CustomerReport";
import DriverReport from "../Pages/Reports/DriversReport";
import VehicleReport from "../Pages/Reports/VehiclesReport";
import EnquiryReport from "../Pages/Reports/EnquiriesReport";
import QuotationReport from "../Pages/Reports/QuotationsReport";
import TripDetailsReport from "../Pages/Reports/TripDetailsReport";
import AccountsReport from "../Pages/Reports/AccountsReport";


//Import Accounts
import Accounts  from "../Pages/Accounts/AccountsList";

//Languages
import Language from "../Pages/Languages/ListLanguage";
import SettingPage from "../Pages/Settings/settings";

//Tax listing 
import TaxListing from "../Pages/Taxation/TaxationList";

//Discount listing 
import DiscountListing from "../Pages/Discounts/DiscountsList";

// Import Authentication pages
import Login from "../Pages/Authentication/Login";
import ChangePassword from "../Pages/Authentication/ChangePassword";
import ForgetPasswordPage from "../Pages/Authentication/ForgetPassword";
import Logout from "../Pages/Authentication/Logout";
import Register from "../Pages/Authentication/Register";
import UserProfile from "../Pages/Authentication/user-profile";
import ListEnquiriesTable from "../Pages/Tables/ListTables/ListEnquiriesTable";
import ListQuotationsTable from "../Pages/Tables/ListTables/ListQuotationsTable";
import InvoiceReport from "../Pages/Reports/InvoiceReport";

// Import Authentication Inner Pages
// import Login1 from "../Pages/AuthenticationPages/Login";
// import Register1 from "../Pages/AuthenticationPages/Register";
import RecoverPassword from "../Pages/AuthenticationPages/RecoverPassword";
// import LockScreen from "../Pages/AuthenticationPages/LockScreen";

// Import Utility Pages
import StarterPage from "../Pages/Utility/Starter-Page";
import Maintenance from "../Pages/Utility/Maintenance-Page";
import ComingSoon from "../Pages/Utility/ComingSoon-Page";
import TimeLine from "../Pages/Utility/TimeLine-Page";
import FAQs from "../Pages/Utility/FAQs-Page";
import Pricing from "../Pages/Utility/Pricing-Page";
import Error404 from "../Pages/Utility/Error404-Page";
import Error500 from "../Pages/Utility/Error500-Page";

// Import UIElement Pages
import UiAlerts from "../Pages/UiElements/UiAlerts";
import UiBadge from "../Pages/UiElements/UiBadge";
import UiBreadcrumb from "../Pages/UiElements/UiBreadcrumb";
import UiButtons from "../Pages/UiElements/UiButtons";
import UiCards from "../Pages/UiElements/UiCards";
import UiCarousel from "../Pages/UiElements/UiCarousel";
import UiDropdown from "../Pages/UiElements/UiDropdowns";
import UiGrid from "../Pages/UiElements/UiGrid";
import UiImages from "../Pages/UiElements/UiImages";
import UiLightbox from "../Pages/UiElements/UiLightbox";
import UiModals from "../Pages/UiElements/UiModals";
import UiOffcanvas from "../Pages/UiElements/UiOffcanvas";
import UiRangeSlider from "../Pages/UiElements/UiRangeSlider";
import UiSessionTimeout from "../Pages/UiElements/UiSessionTimeout";
import UiPagination from "../Pages/UiElements/UiPagination";
import UiProgressBars from "../Pages/UiElements/UiProgressBars";
import UiPlaceholders from "../Pages/UiElements/UiPlaceholders";
import UiTabs from "../Pages/UiElements/UiTabs&Accordions";
import UiTypography from "../Pages/UiElements/UiTypography";
import UiToasts from "../Pages/UiElements/UiToasts";
import UiVideo from "../Pages/UiElements/UiVideo";
import UiPopovers from "../Pages/UiElements/UiPopovers&Tooltips";
import UiRating from "../Pages/UiElements/UiRating";

// Import Forms
import FormEditors from "../Pages/Forms/FormEditors";
import FormUpload from "../Pages/Forms/FormUpload";
import FormXeditable from "../Pages/Forms/FormXeditable";
import FormMask from "../Pages/Forms/FormMask";
import FormElements from "../Pages/Forms/FormElements";
import FormAdvanced from "../Pages/Forms/FormAdvanced";
import FormValidations from "../Pages/Forms/FormValidations";
import FormWizard from "../Pages/Forms/FormWizard";

// Import Tables
import BasicTable from "../Pages/Tables/BasicTable.js";
import ListJs from "../Pages/ServiceProviders/ServiceProviderTable";
import DataTable from "../Pages/Tables/DataTables/DataTables";
import ImageGallery from "..//Pages/Tables/ListTables/ListVehicleImages"

// Import Charts
import ApexCharts from "../Pages/Charts/ApexCharts";
import ChartJs from "../Pages/Charts/ChartjsCharts";
import Sparklinechart from "../Pages/Charts/SparklineCharts";
import FloatChart from "../Pages/Charts/FloatCharts";
import JknobCharts from "../Pages/Charts/JqueryKnobCharts";

// Import Icon Pages
import IconMaterialdesign from "../Pages/Icons/IconMaterialdesign";
import IconFontawesome from "../Pages/Icons/IconFontAwesome";
import IconDripicons from "../Pages/Icons/IconDrip";
import IconBoxicons from "../Pages/Icons/IconBoxicons"

// Import Map Pages
import VectorMaps from "../Pages/Maps/VectorMap";
import GoogleMap from "../Pages/Maps/GoogleMap";

//Profile page
import Profile from "../Pages/ProfilePage";
import InvoiceDetails from "../Pages/Invoices/InvoicesList";

// Dashboard Page

import DashboardPanel from "../Pages/Dashboard/UserPanel";

const authProtectedRoutes = [
  //dashboard
  { path: "/dashboard", component: <Dashboard /> },

  // Calender
  { path: "/calendar", component: <Calender /> },

  // Profile
  { path: "/userprofile", component: <UserProfile /> },

  // E-mail
  { path: "/inbox", component: <Inbox /> },
  { path: "/read-email", component: <ReadEmail /> },
  { path: "/compose-email", component: <EmailCompose /> },

// **************************
  //ServiceProvider
  { path: "/service-providers", component: <ServiceProviders /> },

  //Driver
  { path: "/drivers", component: <Drivers /> },

  //Trip Deatails
  { path: "/trip-deatails", component: <TripDeatails /> },

  //Monthly reports
  { path: "/serviceprovider-reports", component: <ServiceProviderReport /> },
  { path: "/customer-reports", component: <CustomerReport /> },
  { path: "/vehicle-reports", component: <VehicleReport /> },
  { path: "/driver-reports", component: <DriverReport /> },
  { path: "/enquiry-reports", component: <EnquiryReport /> },
  { path: "/quotation-reports", component: <QuotationReport /> },
  { path: "/tripDetail-reports", component: <TripDetailsReport /> },
  { path: "/account-reports", component: <AccountsReport /> },
  { path: "/invoice-reports", component: <InvoiceReport /> },

  
  //Accounts
  { path: "/accounts", component: <Accounts /> },
  /**Image gallery */
    { path: "/image-gallery/:id", component: <ImageGallery /> },

  //Language
  { path: "/languages", component: <Language /> },   
  { path : "/taxation-list", component : <TaxListing />},
  { path : "/discount-list", component : <DiscountListing />},
  { path: "/setting-page", component: <SettingPage /> },

  // Utility Pages
  { path: "/pages-starter", component: <StarterPage /> },
  { path: "/pages-timeline", component: <TimeLine /> },
  { path: "/pages-faqs", component: <FAQs /> },
  { path: "/pages-pricing", component: <Pricing /> },

  // UiElements Pages
  { path: "/ui-alerts", component: <UiAlerts /> },
  { path: "/ui-badge", component: <UiBadge /> },
  { path: "/ui-breadcrumb", component: <UiBreadcrumb /> },
  { path: "/ui-buttons", component: <UiButtons /> },
  { path: "/ui-cards", component: <UiCards /> },
  { path: "/ui-carousel", component: <UiCarousel /> },
  { path: "/ui-dropdowns", component: <UiDropdown /> },
  { path: "/ui-grid", component: <UiGrid /> },
  { path: "/ui-images", component: <UiImages /> },
  { path: "/ui-lightbox", component: <UiLightbox /> },
  { path: "/ui-modals", component: <UiModals /> },
  { path: "/ui-offcanvas", component: <UiOffcanvas /> },
  { path: "/ui-rangeslider", component: <UiRangeSlider /> },
  { path: "/ui-sessiontimeout", component: <UiSessionTimeout /> },
  { path: "/ui-pagination", component: <UiPagination /> },
  { path: "/ui-progressbars", component: <UiProgressBars /> },
  { path: "/ui-placeholders", component: <UiPlaceholders /> },
  { path: "/ui-tabs-accordions", component: <UiTabs /> },
  { path: "/ui-typography", component: <UiTypography /> },
  { path: "/ui-toasts", component: <UiToasts /> },
  { path: "/ui-video", component: <UiVideo /> },
  { path: "/ui-popovers", component: <UiPopovers /> },
  { path: "/ui-rating", component: <UiRating /> },

  // Forms pages
  { path: "/form-elements", component: <FormElements /> },
  { path: "/form-validation", component: <FormValidations /> },
  { path: "/form-advanced", component: <FormAdvanced /> },
  { path: "/form-editor", component: <FormEditors /> },
  { path: "/form-uploads", component: <FormUpload /> },
  { path: "/form-editors", component: <FormXeditable /> },
  { path: "/form-wizard", component: <FormWizard /> },
  { path: "/form-mask", component: <FormMask /> },

// Tables pages

  { path: "/tables-basic", component: <BasicTable /> },
  { path: "/service-providers", component: <ListJs /> },
  { path: "/customers", component: <ListCustomerTable /> },
  { path: "/vehicles", component: <ListVehiclesTable /> },
  { path: "/table-datatables", component: <DataTable /> },
  { path: "/enquires", component: <ListEnquiriesTable /> },
  { path: "/quotations", component: <ListQuotationsTable /> },

  // Charts Pages
  { path: "/chart-apexcharts", component: <ApexCharts /> },
  { path: "/chart-chartjscharts", component: <ChartJs /> },
  { path: "/chart-floatcharts", component: <FloatChart /> },
  { path: "/chart-jknobcharts", component: <JknobCharts /> },
  { path: "/chart-sparklinecharts", component: <Sparklinechart /> },

  // Icons Pages
  { path: "/icon-boxicon", component: <IconBoxicons /> },
  { path: "/icons-materialdesign", component: <IconMaterialdesign /> },
  { path: "/icons-fontawesome", component: <IconFontawesome /> },
  { path: "/icon-dripicons", component: <IconDripicons /> },

  // Maps Pages
  { path: "/maps-vector", component: <VectorMaps /> },
  { path: "/maps-google", component: <GoogleMap /> },


  // Invoice Page
  { path : "/invoices", component : <InvoiceDetails />},

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/dashboard", component: <DashboardPanel /> },
];

const publicRoutes = [

  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/change-password", component: <ChangePassword /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/register", component: <Register /> },

  // Authentication Inner Pages
  // { path: "/auth-login", component: <Login1 /> },
  // { path: "/auth-register", component: <Register1 /> },
  { path: "/auth-recoverpwd", component: <RecoverPassword /> },
  // { path: "/auth-lock-screen", component: <LockScreen /> },

  // Utility Pages
  { path: "/pages-404", component: <Error404 /> },
  { path: "/pages-500", component: <Error500 /> },
  { path: "/pages-maintenance", component: <Maintenance /> },
  { path: "/pages-comingsoon", component: <ComingSoon /> },

  //Profile page
  { path: "/profile-page", component: <Profile /> },

];

export { authProtectedRoutes, publicRoutes };
