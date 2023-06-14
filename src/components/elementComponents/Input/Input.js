// { This component is used to reuse the label and input when we receive values through props }
import Form from "react-bootstrap/Form";
import Styles from "./Input.module.scss";

const InputType = (props) => {

  return (
    <Form.Group className={Styles[props.className]}>
      <Form.Label>{props.label}{props.mandatory}</Form.Label>

      <Form.Control className={Styles['form-control']} type={props.type} placeholder={props.placeholder} />
    </Form.Group>
  );
};
InputType.defaultProps = {
  type: "text",
  width: "auto",
  label: "",
  placeholder: "input",
  mandatory: "",
  active: false,
  className: "formbox",
};
export default InputType;
