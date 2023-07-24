// const time = require(`./helper/date`);
// exports.pastWorkHistroyResponse = (data) =>
// {
//     dataResult = [];
//     dataResult.forEach(data =>
//     {
//         data.push
//         ({
//             id : data.id,
//             username : data.user_name,
//             created_at : time.formatDateToDDMMYYYY(data.created_at),
//             userType : data.userType,
//         });
//     });
//     return dataResult;
// }

const time = require(`./helper/date`);
exports.pastWorkHistroyResponse = (data) => {
  const dataResult = []; // Make sure to declare dataResult with "const" to avoid conflicts

  data.forEach(item => { // Rename the parameter inside the forEach loop to "item"
    dataResult.push({ // Push a new object to the dataResult array, not to the data array
      id: item.id,
      username: item.user_name,
      created_at: time.formatDateToDDMMYYYY(item.created_at),
    });
  });

  return dataResult;
};


