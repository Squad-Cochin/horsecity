//////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
//          This file is use to fetch all package details on the basis of search                    //       
//                       from node API that given from backend.                                     //
//                                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////////////////////

import axios from 'axios';

// IMPORT PAGES
import API_CONFIG from '../../confiq';

export default async function locationOptions(req, res) {
	try {
        const data = {                                 
            provider: ["VTR"],      
            searchTerm: req.query.searchterm
        };
        const items = await axios.post(`${API_CONFIG.API_BASE_URL}/${API_CONFIG.API_TOKEN}/Tour/predictiveLocationSearch`, data);
        let resultData = {result : [] }
        if(items.data[0].Result.Code == 200){
            resultData = {result : items.data[0].Result.filteredArray }
            res.status(200).json(resultData)
        }
        else{
            res.status(200).json(resultData)
        }
   }
   catch(error){
         let errorItems = {result : [] }
         res.status(200).json(errorItems)
   }
   
}

