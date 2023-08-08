import React, { useCallback, useEffect, useRef ,useState} from "react";
import PropTypes from "prop-types";
import sidebarData from "./SidebarData";
//Simple bar
import SimpleBar from "simplebar-react";
// MetisMenu
import MetisMenu from "metismenujs";
import withRouter from "../../components/Common/withRouter";
import { Link } from "react-router-dom";

//i18n
import { withTranslation } from "react-i18next";
import { findIndex } from "lodash";
import config from '../../config'
const Sidebar = (props) => {
  
  const [modules, setModules] =  useState([]);
  const [sidebar_items,setSidebar_items] = useState([]);

  const module_items = config.modules
    /**This hook is used to fetch service provider data */
    useEffect(() => {
      const data = JSON.parse(localStorage.getItem("authUser"))
      const modules = data[1]?.modules;
      const sidebarItems = sidebarData.filter((element) => 
      modules.some((value) => element.id === value.module_id)
      );


      const role = config.Role
      const user_role = data[0]?.user[0]?.role_Id

      // if(user_role === role.service_provider){

      //   const updatedSidebarItem = {
      //     ...sidebarData[11],
      //     subItem: sidebarData[11]?.subItem.filter(sub => sub.id !== 1) //Sub modules reports customer id 
      //   };
      //   console.log("uppp",updatedSidebarItem);
      //   const updatedSidebarItems = [...sidebarItems];
      //   const find_index = updatedSidebarItems.findIndex((value) => value.id === 12);

      //   updatedSidebarItems[find_index] = updatedSidebarItem;
      //   setSidebar_items(updatedSidebarItems);
      // }
      /**Checking customer */
      const checkCustomer = sidebarItems.find((value) =>
      value.id  == module_items.customers
       );
   
        const updatedSidebarItem = {
          ...sidebarData[11],
          subItem: sidebarData[11]?.subItem.filter(sub => {
            // sub.id !== 2 && sub.id !== 1
            if(!checkCustomer && user_role === role.service_provider ){
              return sub.id !== 2 && sub.id !== 1
            }else{
              return true ;
            }
          }) 
        };
        const updatedSidebarItems = [...sidebarItems];
        const find_index = updatedSidebarItems.findIndex((value) => value.id === 12);

        updatedSidebarItems[find_index] = updatedSidebarItem;
        setSidebar_items(updatedSidebarItems);



  }, [])





  const ref = useRef();
  const activateParentDropdown = useCallback(item => {
    item.classList.add("active");
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }
    if (parent) {
      parent.classList.add("mm-active");
      const parent2 = parent.parentElement;
      if (parent2) {
        parent2.classList.add("mm-show"); // ul tag
        const parent3 = parent2.parentElement; // li tag
        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add("mm-show"); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add("mm-show"); // li
              parent5.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }, []);


   

    

  const removeActivation = items => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const parent = items[i].parentElement;
      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (parent) {
        const parent2El =
          parent.childNodes && parent.childNodes.length && parent.childNodes[1]
            ? parent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }
        parent.classList.remove("mm-active");
        const parent2 = parent.parentElement;
        if (parent2) {
          parent2.classList.remove("mm-show");
          const parent3 = parent2.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");
            const parent4 = parent3.parentElement; // ul
            if (parent4) {
              parent4.classList.remove("mm-show"); // ul
              const parent5 = parent4.parentElement;
              if (parent5) {
                parent5.classList.remove("mm-show"); // li
                parent5.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };
  const activeMenu = useCallback(() => {
    const pathName = props.router.location.pathname;
    const fullPath = pathName;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu-item");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);
    for (let i = 0; i < items.length; ++i) {
      if (fullPath === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [
    props.router.location.pathname,
    activateParentDropdown,
  ]);
  useEffect(() => {
    ref.current.recalculate();
  }, []);
  useEffect(() => {
    new MetisMenu("#side-menu-item");
    activeMenu();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    activeMenu();
  }, [activeMenu]);
  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }
  const isDropdown = () =>{

  }
  console.log("SIDE",sidebar_items);
  console.log("side22",sidebarData);
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <SimpleBar className="h-100" ref={ref}>
          <div id="sidebar-menu">
            <ul className="metismenu list-unstyled" id="side-menu-item">
              {/* {(sidebar_items || []).map((item, key) => ( */}
                {/* sidebarData */}
                {sidebar_items.map((item, key) => (
                <React.Fragment key={key}>
                  {item.isMainMenu ? (
                      
                    <li className="menu-title">{props.t(item.label)}</li>
                  ) : (
                    <li key={key}>
                      <Link
                            to={item.url ? item.url : "/#"}
                            onClick={isDropdown()}
                        className={
                          (item.issubMenubadge || item.isHasArrow)
                            ? " "
                            : "has-arrow"
                        }
                      >
                        <i
                          className={item.icon}
                          style={{ marginRight: "5px" }}
                        ></i>
                        {/* {item.issubMenubadge && (
                          <span
                            className={
                              "badge rounded-pill float-end " + item.bgcolor
                            }
                          >
                            {" "}
                            {item.badgeValue}{" "}
                          </span>
                        )} */}
                        <span>{props.t(item.label)}</span>
                      </Link>
                      {item.subItem && (
                        <ul className="sub-menu">
                          {item.subItem.map((items, key) => (
                            <li key={key}>
                              <Link
                                to={items.link}
                                className={
                                  items.subMenu && "has-arrow waves-effect"
                                }
                              >
                                {props.t(items.sublabel)}
                              </Link>
                              {items.subMenu && (
                                <ul className="sub-menu">
                                  {items.subMenu.map((item, key) => (
                                    <li key={key}>
                                      <Link to="#">
                                        {props.t(items.title)}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  )}
                </React.Fragment>
              ))}
              <li>
                <Link to="/logout" className="dropdown-item">
                  <i className="ri-shut-down-line align-middle me-2 text-danger" />
                  <span>{props.t("Logout")}</span>
                </Link>
              </li>
              
            </ul>
            
          </div>
        </SimpleBar>
      </div>
    </React.Fragment>
  );
};
Sidebar.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};
export default withRouter(withTranslation()(Sidebar));