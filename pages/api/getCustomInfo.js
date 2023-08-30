
import axios from 'axios';
// req, res

import API_CONFIG from "../../config";

export default async function getCustomerInfo(id) {
    
	try{   

        const getCustomerInfo = API_CONFIG.GET_CUSTOMER_INFORMATION_API;

        const apiToken = API_CONFIG.API_TOKEN;

        const response = await axios.get(`${getCustomerInfo}/${id}`,{
            headers: {
              "Authorization": `Bearer ${apiToken}`, 
            },
        });
        console.log("RRRR",response.data.data);
        const resObj = {
            name: 'shaheer',
            userName: 'shaheer123',
            email: 'shaheer@gmail.com',
            contact_no: '4567894564',
            birthday: '22-07-2023',
            id_proof_no: '315464646468',
            id_proof_image : ''
          }

        return response.data.data
    }
    catch{
           
    }
}
