// { This component is used to reuse inputs }

import Styles from "./Input.module.scss";

const InputType = (props) => {
  return (
    // <Form.Group className={`${Styles[props.className]}`}>
    //   {props.label != "" && <Form.Label>{props.label}{props.mandatory}</Form.Label>}

    //   <Form.Control type={props.type} placeholder={props.placeholder} />
    // </Form.Group>
    
    <input className={props.className ? Styles[props.className] : Styles['default-input']} type={props.type} placeholder={props.placeholder} />
  );
};
InputType.defaultProps = {
  type: "text",
  width: "auto",
  label: "",
  placeholder: "input",
  mandatory: "",
  active: false,
  class: "formbox",
};
export default InputType;
