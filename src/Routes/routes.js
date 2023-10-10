////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                        All page routs url done over here.                                  //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////


import React from "react";
import { Navigate } from "react-router-dom";

//Dashboard
import Dashboard from "../Pages/Dashboard";
//Customer
import ListCustomerTable from "../Pages/Tables/ListTables/ListCustomerTable";
//Vehicle
import ListVehiclesTable from "../Pages/Tables/ListTables/ListVehiclesTable";
// Import service providers
import ServiceProviders from "../Pages/ServiceProviders/ServiceProviderTable";
// Import drivers
import Drivers from "../Pages/Drivers/DriverTable";
//Import trip deatails
import TripDeatails from "../Pages/TripDetails/TripDetailTable";
//Reviews
import Reviews from "../Pages/Reviews/Reviews";
//Import monthly reports
import ServiceProviderReport from "../Pages/Reports/ServiceProviderReport";
import CustomerReport from "../Pages/Reports/CustomerReport";
import DriverReport from "../Pages/Reports/DriversReport";
import VehicleReport from "../Pages/Reports/VehiclesReport";
import EnquiryReport from "../Pages/Reports/EnquiriesReport";
import QuotationReport from "../Pages/Reports/QuotationsReport";
import TripDetailsReport from "../Pages/Reports/TripDetailsReport";
import AccountsReport from "../Pages/Reports/AccountsReport";
//Import Accounts
import Accounts from "../Pages/Accounts/AccountsList";
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
import ResetPasswordPage from "../Pages/Authentication/ResetPassword";
import ListEnquiriesTable from "../Pages/Tables/ListTables/ListEnquiriesTable";
import ListQuotationsTable from "../Pages/Tables/ListTables/ListQuotationsTable";
import InvoiceReport from "../Pages/Reports/InvoiceReport";
// Import Forms
//This required  for reports page
import FormAdvanced from "../Pages/Forms/FormAdvanced";
// Import Tables
import ListJs from "../Pages/ServiceProviders/ServiceProviderTable";
import ImageGallery from "..//Pages/Tables/ListTables/ListVehicleImages"
//Profile page
// import Profile from "../Pages/ProfilePage";
import InvoiceDetails from "../Pages/Invoices/InvoicesList";
// Dashboard Page
import DashboardPanel from "../Pages/Dashboard/UserPanel";
import Error404 from "../Pages/Utility/Error404-Page";
import Error500 from "../Pages/Utility/Error500-Page";
const authProtectedRoutes = [
  //dashboard
  { path: "/dashboard", component: <Dashboard /> },


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
  { path: "/taxation-list", component: <TaxListing /> },
  { path: "/discount-list", component: <DiscountListing /> },
  { path: "/setting-page", component: <SettingPage /> },


  // Tables pages
  { path: "/service-providers", component: <ListJs /> },
  { path: "/customers", component: <ListCustomerTable /> },
  { path: "/vehicles", component: <ListVehiclesTable /> },
  { path: "/enquires", component: <ListEnquiriesTable /> },
  { path: "/quotations", component: <ListQuotationsTable /> },
  { path: "/reviews", component: <Reviews /> },
  // Invoice Page
  { path: "/invoices", component: <InvoiceDetails /> },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  {
    path: "/",
    exact: true,
    component: <Navigate to="/dashboard" />,
  },
  { path: "/dashboard", component: <DashboardPanel /> },
];

const publicRoutes = [

  // Authentication Page
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/change-password", component: <ChangePassword /> },
  { path: "/forgot-password", component: <ForgetPasswordPage /> },
  { path: "/reset-password/:id/:token", component: <ResetPasswordPage /> },
  { path: "/pages-404", component: <Error404 /> },
  { path: "/pages-500", component: <Error500 /> },

];

export { authProtectedRoutes, publicRoutes };
