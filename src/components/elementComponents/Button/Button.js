// { This component can be reused for buttons }
import Button from "react-bootstrap/Button";
import Styles from "./Button.module.scss";

const ButtonType = (props) => {
  console.log(props);
  return (        
    <>
      <Button
        variant=""
        type="button"
        value={props.value}
        className={`${Styles[props.className]}` ?? `${Styles['login-button']}`}
        onClick={props.onClick} 
        >
          {props.icon} 
          {props.name}
        </Button>
    </>
  );
};

ButtonType.defaultProps = {
  width: "auto",
  icon: "",
  name: "",
  value: "Submit",
  disabled: false,
  className: "btntype2",
  onClick: function(){},
};

export default ButtonType;
