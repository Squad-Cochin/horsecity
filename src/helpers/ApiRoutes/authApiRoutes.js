import axios from "axios";
import * as url from "../url_helper";
// import axios from "axios";
import MockAdapter from "axios-mock-adapter";
// import * as url from "../url_helper";
import { APIClient } from "../api_helper";
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
    // const data = await axios.post(`${url.RECOVER_PWD_URL}`, user);
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

};

export default fakeBackend;
