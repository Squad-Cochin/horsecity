import axios from "axios";
import * as url from "../url_helper";

const loginAPI = async (userdata) => {
    try {
        console.log(userdata)
        const data = await axios.post(`${url.API_BASE_URL}/login`, userdata);
        console.log(data);
    }
    catch(error){
        console.log("err",error);
    }
  }
  
  
  
  
export {loginAPI};