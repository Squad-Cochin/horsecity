// { This page is for reusing the checkbox input }

//We installed react-bootstrap and used the form component from the library.
import Form from "react-bootstrap/Form";

//Css page 
import Styles from "./Checkbox.module.scss";

const CheckboxType = (props) => {
  return (
    <div key={props.id} className= "mb-3">
      <label>
        <Form.Check className={props.className} type={props.type} label={props.label} name={props.group}/>
      </label>
    </div>
  );
};

const CheckboxTypeCustom = (props) => {
  return (
    <label
      className={Styles.radioLabel}
    >
      <input type="radio" name="Innerradio"/>
      <div className={Styles.radioinnerBox}>
        {props.title ?<h3 className={Styles.radioTitle}>{props.title}</h3>:null}
      </div>
    </label>
  );
};


CheckboxType.defaultProps = {
  type: "checkbox",
  label: "Label",
  mandatory: "*",
  active: false,
  class: "checkbox",
  group:"",
  className: ""
};


CheckboxTypeCustom.defaultProps = {
  title: "Select"
};

export default CheckboxType;
export { CheckboxTypeCustom };
