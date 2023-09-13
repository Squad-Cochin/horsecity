///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//            File using for showing content in main menu in header in mobile view                   //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  ProSidebarProvider,
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import {
  pageItems,
} from "../../data/mainMenuData";
import {
  isActiveLink,
} from "../../utils/linkActiveChecker";
import Social from "../common/social/Social";
import ContactInfo from "./ContactInfo";
import { useEffect, useState } from "react";

const MobileMenu = () => {
  const [ login, setLogin ] = useState({});
  const router = useRouter();

  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("loginData"))
    if(loginData){
      setLogin(loginData);}
  }, []);
  return (
    <>
      <div className="pro-header d-flex align-items-center justify-between border-bottom-light">
        <Link href="/">
          <Image height={50} width={50} src="/img/general/black-logo.png" alt="brand" />
        </Link>
        {/* End logo */}

        <div
          className="fix-icon"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="icon icon-close"></i>
        </div>
        {/* icon close */}
      </div>
      {/* End pro-header */}

      <ProSidebarProvider>
        <Sidebar width="400" backgroundColor="#fff">
          <Menu>
            <MenuItem
              component={
                <Link
                  href="/"
                  className={
                    router.pathname === "/"
                      ? "menu-active-link"
                      : ""
                  }
                />
              }
            >
              Home
            </MenuItem>
            {/* End  All Home Menu */}

            <MenuItem
              component={
                <Link
                  href="/"
                  className={
                    router.pathname === "/"
                      ? "menu-active-link"
                      : ""
                  }
                />
              }
            >
              Who We Are
            </MenuItem>

            <SubMenu label="Pages">
              {pageItems.map((item, i) => (
                <MenuItem
                  key={i}
                  component={
                    <Link
                      href={item.routePath}
                      className={
                        isActiveLink(item.routePath, router.asPath)
                          ? "menu-active-link"
                          : ""
                      }
                    />
                  }
                >
                  {item.name}
                </MenuItem>
              ))}
            </SubMenu>
            {/* End  All Pages Menu */}

            <MenuItem
              component={
                <Link
                  href="/"
                  className={
                    router.pathname === "/blog/blog-list-v1"
                      ? "menu-active-link"
                      : ""
                  }
                />
              }
            >
              Blog
            </MenuItem>

            <MenuItem
              component={
                <Link
                  href="/contact"
                  className={
                    router.pathname === "/contact" ? "menu-active-link" : ""
                  }
                />
              }
            >
              Contact
            </MenuItem>

            <MenuItem
              component={
                <Link
                  href="/"
                  className={
                    router.pathname === "/"
                      ? "menu-active-link"
                      : ""
                  }
                />
              }
            >
              Help Center
            </MenuItem>
            {/* End Contact  Menu */}
          </Menu>
        </Sidebar>
      </ProSidebarProvider>

      <div className="mobile-footer px-20 py-5 border-top-light"></div>

      <div className="pro-footer">
        <ContactInfo />
        <div className="mt-10">
          <h5 className="text-16 fw-500 mb-10">Follow us on social media</h5>
          <div className="d-flex x-gap-20 items-center">
            <Social />
          </div>
        </div>
        { Object.keys(login)?.length == 0 ? 
        <div className="mt-20">
          <Link
            className=" button -dark-1 px-30 fw-400 text-14 bg-blue-1 h-50 text-white"
            href="/others-pages/login"
          >
            Become An Expert
          </Link>
        </div>
        : null }
      </div>
      {/* End pro-footer */}
    </>
  );
};

export default MobileMenu;