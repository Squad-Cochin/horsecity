///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//            File using for showing content in main menu in header in all pages                     //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import Link from "next/link";
import {
  pageItems,
} from "../../data/mainMenuData";
import {
  isActiveLink,
  isActiveParentChaild,
} from "../../utils/linkActiveChecker";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Function for showing content in main menu
const MainMenu = ({ style = "" }) => {
  const router = useRouter();
  const [ login, setLogin ] = useState({});
  useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("loginData"))
    if(loginData){
      setLogin(loginData);
    }
  }, []);
  return (
    <nav className="menu js-navList">
      <ul className={`menu__nav ${style} -is-active`}>
        <li className={router.pathname === "/" ? "current" : ""}>
          <Link href="/">Home</Link>
        </li>

        <li className={router.pathname === "/others-pages/about" ? "current" : ""}>
          <Link href="/others-pages/about">Who We Are</Link>
        </li>

        <li
          className={`${
            isActiveParentChaild(pageItems, router.asPath) ? "current" : ""
          } menu-item-has-children`}
        >
          <a href="#">
            <span className="mr-10">Partners</span>
            <i className="icon icon-chevron-sm-down" />
          </a>
          <ul className="subnav">
            {pageItems.map((menu, i) => (
              <li
                key={i}
                className={
                  isActiveLink(menu.routePath, router.asPath) ? "current" : ""
                }
              >
                <Link href={menu.routePath}>{menu.name}</Link>
              </li>
            ))}
          </ul>
        </li>
        {/* End pages items */}

        <li className={router.pathname === "/blog/blog-list-v1" ? "current" : ""}>
          <Link href="/blog/blog-list-v1">Blog</Link>
        </li>

        <li className={router.pathname === "/contact" ? "current" : ""}>
          <Link href="/contact">Contact</Link>
        </li>

        <li className={router.pathname === "/others-pages/help-center" ? "current" : ""}>
          <Link href="/others-pages/help-center">Help Center</Link>
        </li>
        { Object.keys(login)?.length != 0 ? 
          <li className={router.pathname === "/dashboard/db-dashboard" ? "current" : ""}>
            <Link href="/dashboard/db-dashboard">Dashbord</Link>
          </li>
          :null 
        }

      </ul>
    </nav>
  );
};

export default MainMenu;
