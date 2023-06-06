//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
//                PAGE HAVING A COMPONENT OF LABEL AND INPUT WE CAN REUSE THIS                      //
//                           WHEN WE RECEIVE VALUES THROUGH PROPS                                   //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////



import Form from "react-bootstrap/Form";

// IMPORT PAGES
import Styles from "./Input.module.scss";

// INPUT COMPONENT FUNCTION
const InputType = (props) => {
  return (
    <Form.Group className={`mb-3 ${props.class}`}>
      {props.label != "" && <Form.Label>{props.label}{props.mandatory}
    </Form.Label>}
    <Form.Control type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange}/>
    </Form.Group>
  );
};

//  DEFAULT PROPERTIES OF INPUT TYPE COMPONENT
InputType.defaultProps = {
  type: "text",
  width: "auto",
  label: "Label",
  placeholder: "input",
  mandatory: "",
  value: "",
  onChange: "", 
  active: false,
  class: "formbox",
};
export default InputType;
