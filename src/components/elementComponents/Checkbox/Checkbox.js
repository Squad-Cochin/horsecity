import React, { useState ,useEffect} from "react";
import Form from "react-bootstrap/Form";

const CheckboxType = (props) => {
  const [checkedItems, setCheckedItems] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    props.onChange(selectedItems);
  }, [selectedItems]);


  // ****************************************
  const handleCheckboxChange = (event) => {
    if(event.target.name == 'GCC'){
      event.target.name = 'international'
    }else if(event.target.name == 'Private'){
      event.target.name = 'private'
    }else if(event.target.name == 'Sharing'){
      event.target.name = 'sharing'
    }
    const checkboxItem = {
      name: event.target.name,
      status: event.target.checked,
    };
  
    const itemIndex = selectedItems.findIndex((item) => item.name === checkboxItem.name);
  
    if (event.target.checked) {
      if (itemIndex === -1) {
        setSelectedItems((prevItems) => [...prevItems, checkboxItem]);
      }
    } else {
      if (itemIndex !== -1) {
        setSelectedItems((prevItems) => {
          const updatedItems = [...prevItems];
          updatedItems.splice(itemIndex, 1);
          return updatedItems;
        });
      }
    }
  
    props.onChange(selectedItems);
  };
  


  return (
    <div>
      {props.checkboxOptions.map((option) => (
        <Form.Check
          key={option.id}
          className={props.className}
          type={props.type}
          label={option.label}
          name={option.label}
          value={checkedItems}
          onChange={handleCheckboxChange}
        />
      ))}
    </div>
  );
};

CheckboxType.defaultProps = {
  type: "checkbox",
  className: "",
  label: "Label",
  mandatory: "*",
  active: false,
  class: "checkbox",
  group:"",
  className: ""

};

export default CheckboxType;



// // { This page is for reusing the checkbox input }

// //We installed react-bootstrap and used the form component from the library.
// import Form from "react-bootstrap/Form";

// //Css page 
// import Styles from "./Checkbox.module.scss";

// const CheckboxType = (props) => {
//   return (
//     <div key={props.id} className= "mb-3">
//       <label>
//         <Form.Check className={props.className} type={props.type} label={props.label} name={props.group}/>
//       </label>
//     </div>
//   );
// };

// const CheckboxTypeCustom = (props) => {
//   return (
//     <label
//       className={Styles.radioLabel}
//     >
//       <input type="radio" name="Innerradio"/>
//       <div className={Styles.radioinnerBox}>
//         {props.title ?<h3 className={Styles.radioTitle}>{props.title}</h3>:null}
//       </div>
//     </label>
//   );
// };


// CheckboxType.defaultProps = {
//   type: "checkbox",
//   label: "Label",
//   mandatory: "*",
//   active: false,
//   class: "checkbox",
//   group:"",
//   className: ""
// };


// CheckboxTypeCustom.defaultProps = {
//   title: "Select"
// };

// export default CheckboxType;
// export { CheckboxTypeCustom };
