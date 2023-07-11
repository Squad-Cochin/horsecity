// import axios from "axios";
import axios from "axios";
import * as url from "../url_helper";


/**Add new service provider */
export async function addNewProvider(){
    try {
        // const { data } = await axios.post(`${url.POST_SP_ADD_URL}`);
        // return { data };
    } catch (error) {
        return { error : "Faild !"}
    }
  }