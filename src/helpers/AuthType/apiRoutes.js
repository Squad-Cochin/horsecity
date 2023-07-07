import axios from "axios";
import * as url from "../url_helper";
// import axios from "axios";
import MockAdapter from "axios-mock-adapter";
// import * as url from "../url_helper";
import accessToken from "../jwt-token-access/accessToken";
import { calenderDefaultCategories, events, serviceProviders, Drivers, Customers, Vehicles ,TripDetails, quotationData, enquiriesData, Reports, Languages, Discounts, Taxations} from "../../CommonData/Data";
import { APIClient } from "../api_helper";



const loginAPI = async (userdata) => {
    try {
        console.log(userdata)
        const data = await axios.post(`${url.LOGIN_URL}`, userdata);
        console.log(data);
    }
    catch(error){
        console.log("err",error);
    }
  }

  export {loginAPI};
  
  /** get service provider details */
  export  function getSPAllData(){
    // try {
    //     const { data } = await axios.get(`${url.GET_SP_ALL_DATA_URL}`);
    //     return { data };
    // } catch (error) {
    //     return { error : "Password doesn't Match...!"}
    // }
    if(serviceProviders){
        return serviceProviders ;
    }
    return null ;
  }

  export function getDriversData(){

    if(Drivers){
          return Drivers ;
    }
    return null ;
  }
  
  
  export function getCustomersData(){

    if(Customers){
          return Customers ;
    }
    return null ;
  }
  
  export function getVehiclesData(){

    if(Vehicles){
          return Vehicles ;
    }
    return null ;
  }

  export function getTripDeatails(){
    if(TripDetails){
      return TripDetails ;
}
    return null ;
  }
  

  export function getQuotationData(){
    if(quotationData){
      return quotationData ;
    }
    return null ;
  }

  //Get enguiries
  export function qetEnquiriesData(){
    if(enquiriesData){
      return enquiriesData
    }
    return null ;
  }

  //Get monthly reports
  export function getMonthlyReports(){
    if(Reports){
      return Reports ;
    }
    return null ;
  }

  //Get all languages
  export function getLanguages(){
    if(Languages){
      return Languages ;
    }
    return null ;
  }

  //Get all discounts
  export function getDiscounts(){
    if(Discounts){
      return Discounts ;
    }
    return null ;
  }
  //Get all taxations
  export function getTaxations(){
    if(Taxations){
      return Taxations ;
    }
    return null ;
  }
// import * as url from "./url_helper";
                                        
const getDemoData = () => APIClient.get(url.LOGIN_URL);
                
export { getDemoData };










let users = [
  {
    uid: 1,
    username: "admin",
    role: "admin",
    password: "123456",
    email: "admin@Themesdesign.com",
  },
];

const fakeBackend = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });
  // const mock = new MockAdapter(axios);

  mock.onPost(url.POST_FAKE_REGISTER).reply((config) => {
    const user = JSON.parse(config["data"]);
    users.push(user);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user]);
      });
    });
  });

  mock.onPost(url.POST_FAKE_LOGIN).reply(async (config) => {
    const user = JSON.parse(config["data"]);
    const data = await axios.post(`${url.LOGIN_URL}`, user);
    // console.log("RES",data)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data.status === "success") {
            resolve([200, data.data]);
        }else if(data.status === "expired"){
            resolve([200, data.status]);
        }else {
            reject([
                data.message,
            ]);
        }
      });
    });
  });

    //Change password
    mock.onPost(url.POST_FAKE_CHANGE_PWD).reply(async (config) => {
      const user = JSON.parse(config["data"]);
      console.log("user",user);
      const data = await axios.post(`${url.CHANGE_PASSWORD_URL}`, user);
      console.log("response",data)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (data.success === true) {
            resolve([200, data.data]);
          } else {
         
            reject([
              data.message
            ]);       
          }
        });
      });
    });

  //Recovery password
  mock.onPost(url.RECOVER_PASSWORD).reply(async (config) => {
    const user = JSON.parse(config["data"]);
    console.log("user",user);
    // const data = await axios.post(`${url.RECOVER_PWD_URL}`, user);
    // console.log(data)
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     if (data.success === true) {
    //       resolve([200, data.data]);
    //     } else {
    //       reject([
    //         data.message,
    //       ]);       
    //     }
    //   });
    // });
  });



  mock.onPost("/fake-forget-pwd").reply((config) => {
    // User needs to check that user is eXist or not and send mail for Reset New password

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, "Check you mail and reset your password."]);
      });
    });
  });

  mock.onPost("/post-jwt-register").reply((config) => {
    const user = JSON.parse(config["data"]);
    users.push(user);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, user]);
      });
    });
  });

  mock.onPost("/post-jwt-login").reply((config) => {
    const user = JSON.parse(config["data"]);
    const validUser = users.filter(
      (usr) => usr.email === user.email && usr.password === user.password
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = accessToken;

          // JWT AccessToken
          const tokenObj = { accessToken: token }; // Token Obj
          const validUserObj = { ...validUser[0], ...tokenObj }; // validUser Obj

          resolve([200, validUserObj]);
        } else {
          reject([
            400,
            "Username and password are invalid. Please enter correct username and password",
          ]);
        }
      });
    });
  });

  mock.onPost("/post-jwt-profile").reply((config) => {
    const user = JSON.parse(config["data"]);

    const one = config.headers;

    let finalToken = one.Authorization;

    const validUser = users.filter((usr) => usr.uid === user.idx);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Verify Jwt token from header.Authorization
        if (finalToken === accessToken) {
          if (validUser["length"] === 1) {
            let objIndex;

            //Find index of specific object using findIndex method.
            objIndex = users.findIndex((obj) => obj.uid === user.idx);

            //Update object's name property.
            users[objIndex].username = user.username;

            // Assign a value to locastorage
            localStorage.removeItem("authUser");
            localStorage.setItem("authUser", JSON.stringify(users[objIndex]));

            resolve([200, "Profile Updated Successfully"]);
          } else {
            reject([400, "Something wrong for edit profile"]);
          }
        } else {
          reject([400, "Invalid Token !!"]);
        }
      });
    });
  });

  mock.onPost("/post-fake-profile").reply((config) => {
    const user = JSON.parse(config["data"]);

    const validUser = users.filter((usr) => usr.uid === user.idx);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (validUser["length"] === 1) {
          let objIndex;

          //Find index of specific object using findIndex method.
          objIndex = users.findIndex((obj) => obj.uid === user.idx);

          //Update object's name property.
          users[objIndex].username = user.username;

          // Assign a value to locastorage
          localStorage.removeItem("authUser");
          localStorage.setItem("authUser", JSON.stringify(users[objIndex]));

          resolve([200, "Profile Updated Successfully"]);
        } else {
          reject([400, "Something wrong for edit profile"]);
        }
      });
    });
  });

  mock.onPost("/jwt-forget-pwd").reply((config) => {
    // User needs to check that user is eXist or not and send mail for Reset New password

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([200, "Check you mail and reset your password."]);
      });
    });
  });

  mock.onPost("/social-login").reply((config) => {
    const user = JSON.parse(config["data"]);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (user && user.token) {
          // You have to generate AccessToken by jwt. but this is fakeBackend so, right now its dummy
          const token = accessToken;

          // JWT AccessToken
          const tokenObj = { accessToken: token }; // Token Obj
          const validUserObj = { ...user[0], ...tokenObj }; // validUser Obj

          resolve([200, validUserObj]);
        } else {
          reject([
            400,
            "Username and password are invalid. Please enter correct username and password",
          ]);
        }
      });
    });
  });
  mock.onGet(url.GET_EVENTS).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
       
        if (events) {
          // Passing fake JSON data as response
          resolve([200, events]);
        } else {
          reject([400, "Cannot get events"]);
        }
      });
    });
  });



  mock.onPost(url.ADD_NEW_EVENT).reply((event) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot add event"]);
        }
      });
    });
  });

  mock.onPut(url.UPDATE_EVENT).reply((event) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (event && event.data) {
          // Passing fake JSON data as response
          resolve([200, event.data]);
        } else {
          reject([400, "Cannot update event"]);
        }
      });
    });
  });

  mock.onDelete(url.DELETE_EVENT).reply((config) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (config && config.headers) {
          // Passing fake JSON data as response
          resolve([200, config.headers.event]);
        } else {
          reject([400, "Cannot delete event"]);
        }
      });
    });
  });

  mock.onGet(url.GET_CATEGORIES).reply(() => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (calenderDefaultCategories) {
          // Passing fake JSON data as response
          resolve([200, calenderDefaultCategories]);
        } else {
          reject([400, "Cannot get categories"]);
        }
      });
    });
  });
};

export default fakeBackend;
