import React, { useState,useEffect } from 'react'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

/**Imported files */
import ButtonType from '../components/Button/Button';
import InputType from '../components/Input/Input';
import Styles from './Home.module.css';
import Navbar  from '../components/Navbar/Navbar';


// export const ApiContext = createContext()

function HomePage() {
        const [mode,setMode] =useState("light")
        const [alert,setAlert] = useState({ value: '' })
      
    
        /**Render the page loading time  */
        useEffect(() => {
                // Retrieve the selected language and direction from localStorage on component mount
                const selectedLanguage = localStorage.getItem('selectedLanguage');
                const selectedDirection = localStorage.getItem('selectedDirection');
            
                // Set the language and direction on the <html> element
                document.documentElement.lang = selectedLanguage;
                document.documentElement.dir = selectedDirection;  

             
    
              }, []);


             // select the language      
             const handleDropdownChange = (event) => {
                const [lang, dir] = event.split('-');
                document.documentElement.lang = lang;
                document.documentElement.dir = dir;
                console.log(lang);

               // Store the selected language and direction in localStorage
                localStorage.setItem('selectedLanguage', lang);
                localStorage.setItem('selectedDirection', dir);
              };

              //For chainging background color
              const toggleMode =()=>{
                if(mode === 'light'){
                        setMode('dark')
                        document.body.style.backgroundColor = '#042743'
                }else{
                        setMode('light')
                        document.body.style.backgroundColor ='#fff'
                }
              }
              const showAlert = () =>

              {          
                        setAlert({msg : "Backround changed",type : "Dark"});
                        setTimeout(() => {                
                        setAlert(null);
 
                        }, 1500);
            
              }
              const obj =[
                {id : 1, name : "shaheer", status : true},
                {id : 2, name : "shanid", status : false}
              ]
                
              
  return (
    <>      
    


              <Navbar mode={mode}  toggleMode={toggleMode} alert={showAlert} />
               
               <p variant="secondary">{mode==='dark'? 'Dark mode oned' : null }</p> 

                <h1  data-testid='home-1'>كيف حالك</h1>
                <p>{alert? alert.msg : null}</p>
                <DropdownButton id="dropdown-basic-button" title="Choose language" onSelect={handleDropdownChange}>
                <Dropdown.Item eventKey="en-ltr">English</Dropdown.Item>
                <Dropdown.Item eventKey="ar-rtl">Arabic</Dropdown.Item>
                </DropdownButton>
                <div className={Styles.maindiv}>
                        <ButtonType className="btntype2" name="View More" onClick={() =>console.log("hello world")}/>
                        <InputType placeholder="Enter name"/>
                </div>
 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
    </>
  )
}

export default HomePage