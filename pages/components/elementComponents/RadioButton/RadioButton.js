///////////////////////////////////////////////////////////////////////////////////////
//                                                                                   //
//                THIS PAGE IS FOR RADIO BUTTON COMPONENT                            //
//                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////



//We installed react-bootstrap and used the form component from the library.
import Form from "react-bootstrap/Form";

// IMPORT PAGES
import Styles from "./Checkbox.module.scss";

// FUNCTION FOR RADIO BUTTON COMPONENT (CUSTOM)
const RadioButton = (props) => {
  return (
    <div key={props.id} className= "mb-3">
      <label>
        <Form.Check className={props.className} value={props.value} type="radio" label={props.label} name={props.name} onClick={props.onClick} checked={props.checked} onChange={props.onChange}/>
      </label>
    </div>
  );
};

// DEFAULT PROPERTIES FOR CHECKBOXTYPECUSTOM
RadioButton.defaultprops = {
  title: "Select",
  name: "",
  checked: false,
  onchange: () => {}
};

export default RadioButton;
