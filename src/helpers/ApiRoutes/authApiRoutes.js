import axios from "axios";
import * as url from "../url_helper";
// import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { APIClient } from "../api_helper";              
import { logDOM } from "@testing-library/react";
const getDemoData = () => APIClient.get(url.LOGIN_URL);
                
export { getDemoData };


const fakeBackend = () => {
  // This sets the mock adapter on the default instance
  const mock = new MockAdapter(axios, { onNoMatch: "passthrough" });
  // const mock = new MockAdapter(axios);

  mock.onPost(url.POST_FAKE_LOGIN).reply(async (config) => {
    const user = JSON.parse(config["data"]);
    const data = await axios.post(`${url.LOGIN_URL}`, user);
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
      const data = await axios.post(`${url.CHANGE_PASSWORD_URL}`, user);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (data.code === 200) {
            resolve([200, data]);
          } else {
         
            reject([
              data.message
            ]);       
          }
        });
      });
    });

       //forgot-password
       mock.onPost(url.POST_FAKE_PASSWORD_FORGET).reply(async (config) => {
        const user = JSON.parse(config["data"]);
        const data = await axios.post(`${url.FORGET_PASSWORD_URL}`, user);
        return new Promise((resolve, reject) => {
          setTimeout(() => {
       
            if (data.code === 200) {
              resolve([200, data.message]);
            } else {
              reject([
                data.message
              ]);       
            }
          });
        });
      });

       //reset-password
       mock.onPost(url.POST_FAKE_PASSWORD_RESET).reply(async (config) => {
        const user_data = JSON.parse(config["data"]);
        const data = await axios.post(`${url.VERIFY_RESET_PASSWORD_URL}/${user_data.user_id}/${user_data.token}`, user_data);
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (data.code === 200) {
              resolve([200, data.data]);
            } else {    
              reject([
                data.message
              ]);       
            }
          });
        });
      });
  

};

export default fakeBackend;
