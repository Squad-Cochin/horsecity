import Form from "react-bootstrap/Form";
import Styles from "./Select.module.scss";


const SelectType = (props) => {
  return (
    <Form.Group className={`mb-3 ${props.class}`}>
      {props.label != "" && <Form.Label>{props.label}{props.mandatory}</Form.Label>}
      <Form.Select required={props.mandatory ? "required" : ""}>
        {props.selectarr.map((num) => {
          return(
            <option key={num.id}>{num.name}</option>
          );
        })}
      </Form.Select>
    </Form.Group>
  );
};
SelectType.defaultProps = {
  width: "auto",
  label: "Label",
  mandatory: "",
  active: false,
  class: "formbox",
  selectarr: [
    {
      id:1,
      name:"Data1",
    },
    {
      id:2,
      name:"Data2",
    },
    {
      id:3,
      name:"Data3",
    }
  ],
};

export default SelectType;
