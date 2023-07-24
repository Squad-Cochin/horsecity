/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                         //
//                                           Header page after login                                       //
//                                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Import modules and files
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import LanguageDropdown from "../../components/Common/TopbarDropdown/LanguageDropdown";
import { withTranslation } from "react-i18next";
import logo from "../../assets/images/white-logo.png";
import { getSettingsPageData } from '../../helpers/ApiRoutes/getApiRoutes'; 
import { useSelector } from "react-redux";
// Redux Store
import {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
} from "../../store/actions";
import ProfileMenu from "../../components/Common/TopbarDropdown/ProfileMenu";

// Header function
const Header = (props) => {
  const [search, setsearch] = useState(false);
  const [menulogo,setMenuLogo] = useState('')
  useEffect(()=>{
    getAllData()
  },[])
  const { file } = useSelector(state => ({
    file: state.settings.file,
  }));
 
  async function getAllData() {
    let settingsData = await getSettingsPageData();
    setMenuLogo(settingsData?.settingsPageData[0]?.logo);
   }
  // Toggle screen function
  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">
            <div className="navbar-brand-box text-center">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={menulogo || logo} alt="logo-sm-dark" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={menulogo || logo} alt="logo-dark" height="24" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                <img src={menulogo || logo} alt="logo-sm-dark" height="22" />
                </span>
                <span className="logo-lg">
                  <img src={menulogo || logo} alt="logo-light" height="60" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              className="btn btn-sm px-3 font-size-24 header-item waves-effect"
              id="vertical-menu-btn"
              onClick={() => {
                tToggle();
              }}
            >
              <i className="ri-menu-2-line align-middle"></i>
            </button>
          </div>

          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                onClick={() => {
                  setsearch(!search);
                }}
                type="button"
                className="btn header-item noti-icon "
                id="page-header-search-dropdown"
              >
                <i className="ri-search-line" />
              </button>
              <div
                className={
                  search
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="ri-search-line" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <LanguageDropdown />
            {/* <AppsDropdown /> */}

            <div className="dropdown d-none d-lg-inline-block ms-1">
              <button
                type="button"
                onClick={() => {
                  toggleFullscreen();
                }}
                className="btn header-item noti-icon"
                data-toggle="fullscreen"
              >
                <i className="ri-fullscreen-line" />
              </button>
            </div>

            {/* <NotificationDropdown /> */}

            <ProfileMenu />
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

// Maping state to props function
const mapStatetoProps = (state) => {
  const { layoutType, showRightSidebar, leftMenu, leftSideBarType } =
    state.Layout;
  return { layoutType, showRightSidebar, leftMenu, leftSideBarType };
};

// Default export
export default connect(mapStatetoProps, {
  showRightSidebarAction,
  toggleLeftmenu,
  changeSidebarType,
})(withTranslation()(Header));
