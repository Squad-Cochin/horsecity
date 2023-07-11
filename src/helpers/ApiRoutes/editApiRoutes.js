// import axios from "axios";
import axios from "axios";
import * as url from "../url_helper";

/**Add new service provider */
export async function updateSProvider(){
  try {
      // const { data } = await axios.put(`${url.POST_SP_EDIT_URL}`);
      // return { data };
  } catch (error) {
      return { error : "Faild !"}
  }
}