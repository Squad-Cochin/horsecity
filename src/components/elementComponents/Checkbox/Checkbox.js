///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
//                THIS PAGE IS FOR CHECKBOX AND RADIO BUTTON COMPONENT               //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////



//We installed react-bootstrap and used the form component from the library.
import Form from "react-bootstrap/Form";

// IMPORT PAGES
import Styles from "./Checkbox.module.scss";

// FUNCTION FOR CHECKBOX COMPONENT (DEFAULT)
const CheckboxType = (props) => {
  return (
    <div key={props.id} className= "mb-3">
      <label>
        <Form.Check className={props.className} value={props.value} type={props.type} label={props.label} name={props.group} onClick={props.onClick} checked={props.checked} onChange={props.onChange}/>
      </label>
    </div>
  );
};

// FUNCTION FOR RADIO BUTTON COMPONENT (CUSTOM)
const CheckboxTypeCustom = (props) => {
  return (
    <div key={props.id} className= "mb-3">
      <label>
        <Form.Check className={props.className} value={props.value} type="radio" label={props.label} name={props.name} onClick={props.onClick} checked={props.checked} onChange={props.onChange}/>
      </label>
    </div>
  );
};

// DEFAULT PROPERTIES FOR CHECKBOXTYPE
CheckboxType.defaultprops = {
  type: "checkbox",
  label: "Label",
  mandatory: "*",
  active: false,
  class: "checkbox",
  group:"",
  checked: false,
  value:"",
  onClick:"",
  className: "",
  onchange: () => {}
};

// DEFAULT PROPERTIES FOR CHECKBOXTYPECUSTOM
CheckboxTypeCustom.defaultprops = {
  title: "Select",
  name: "",
  checked: false,
  onchange: () => {}
};

export default CheckboxType;
export { CheckboxTypeCustom };
