import React, { useState } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"; // Assuming you are using the 'reactstrap' library
import { useDispatch } from "react-redux";
import { updateDirection } from "../../../store/layout/actions";
const HeaderDropdown = (props) => {
  const [menu, setMenu] = useState(false);
  const [textDirection, setTextDirection] = useState("ltr");
  const dispatch = useDispatch();
  const handleDirectionChange = (direction) => {
    setTextDirection(direction);
    dispatch(updateDirection(direction));
    document.documentElement.dir = direction; // Change the text direction for the entire document
  };

  return (
    <Dropdown
      isOpen={menu}
      toggle={() => setMenu(!menu)}
      className="d-inline-block"
    >
      <DropdownToggle
        className="btn header-item "
        id="page-header-user-dropdown"
        tag="button"
      >
        {textDirection === "rtl" ? "RTL" : "LTR"}
        <i
          className={`mdi mdi-chevron-down d-none d-xl-inline-block ${
            textDirection === "rtl" ? "float-left" : "float-right"
          }`}
        />
      </DropdownToggle>
      <DropdownMenu
        className={`dropdown-menu-end ${
          textDirection === "rtl" ? "text-right" : "text-left"
        }`}
      >
        <DropdownItem onClick={() => handleDirectionChange("rtl")}>
          RTL
        </DropdownItem>
        <DropdownItem onClick={() => handleDirectionChange("ltr")}>
          LTR
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default HeaderDropdown;
