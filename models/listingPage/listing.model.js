/////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                         //
// This is listing model file. Where all the logic of the listing page program is written. //
//                                                                                         //
/////////////////////////////////////////////////////////////////////////////////////////////

const con = require("../../configs/db.configs");
const constants = require("../../utils/constants");
const time = require("../../utils/helper/date");
const mail = require("../../utils/mailer");

require("dotenv").config();

module.exports = class listing {
  /**
   * The below function is for the Client side page
   *
   * The function for fetching all the vehicles basis of the filter.
   */
  static async listingPageData(body) {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          trip_type,
          number_of_horses,
          price_from,
          price_to,
          suppliers,
          sort,
          page,
          limit,
          customer_id,
        } = body;

        // Calculate the offset based on the current page and limit
        const offset = (page - 1) * limit;

        let gccType = "";
        if (trip_type && trip_type.includes("GCC")) {
          gccType = `AND vh.gcc_travel_allowed = '${constants.status.yes}'`;
        }

        let filteredTripTypes = [];
        if (trip_type && Array.isArray(trip_type)) {
          filteredTripTypes = trip_type.filter((type) => type !== "GCC");
        }
        // Filtering trip type
        let tripTypeFilter = "";
        if (filteredTripTypes.length != 0) {
          const tripTypeFilterValues = filteredTripTypes
            .map((type) => `'${type}'`)
            .join(",");
          tripTypeFilter = `AND vh.vehicle_type IN (${tripTypeFilterValues})`;
        }

        /**No of horse filtration */
        let numberOfHorsesFilter = "";
        if (number_of_horses) {
          numberOfHorsesFilter = `AND vh.no_of_horse BETWEEN '${0}' AND ${number_of_horses}`;
        }

        /**filtering  price  */
        let priceFilter = "";
        if (price_from != null && price_to != null) {
          if (price_to > 2000) {
            try {
              let selQuery = `SELECT MAX(vh.price) AS max_price
                                     FROM ${constants.tableName.vehicles} AS vh
                                     WHERE vh.deleted_at IS NULL AND vh.status = '${constants.status.active}'`;
              const maxPrice = await new Promise((resolve, reject) => {
                con.query(selQuery, async (err, maxPrice) => {
                  if (!err) {
                    resolve(maxPrice[0]?.max_price);
                  } else {
                    resolve(false);
                  }
                });
              });
              priceFilter = `AND vh.price BETWEEN ${price_from} AND ${maxPrice}`;
            } catch (error) {
              // Handle error
              console.error("Error fetching max price:", error);
              resolve(false);
            }
          } else {
            priceFilter = `AND vh.price BETWEEN ${price_from} AND ${price_to}`;
          }
        }

        /**Filtering suppliers */
        let suppliersFilter = "";

        if (suppliers?.length > 0) {
          suppliersFilter = `AND vh.service_provider_id IN (${suppliers.join(
            ","
          )})`;
        }

        /**Sorting price  */
        let sorted = "";
        if (sort === "low") {
          sorted = "ORDER BY vh.price ASC";
        } else if (sort === "high") {
          sorted = "ORDER BY vh.price DESC";
        }

        // final SQL query
        let selQuery = `
                SELECT vh.id, vh.length, vh.breadth, vh.make, vh.model, vh.price, vh.no_of_horse, vh.height,
                GROUP_CONCAT(vimg.image) AS images,wl.created_at,wl.deleted_at
        FROM ${constants.tableName.vehicles} vh
        LEFT JOIN vehicles_images AS vimg ON vh.id = vimg.vehicle_id AND vimg.status = "${
          constants.status.active
        }"
        LEFT JOIN (
            SELECT MAX(id) AS max_id,vehicle_id,  created_at, deleted_at
            FROM wishlist
            GROUP BY vehicle_id 
        ) AS w ON vh.id = w.vehicle_id 
        LEFT JOIN wishlist AS wl ON w.max_id = wl.id ${
          customer_id ? `AND wl.customer_id = ${customer_id}` : ""
        }
        JOIN ${constants.tableName.service_providers} AS sp  ON vh.service_provider_id =  sp.id 
        WHERE 1=1
        ${gccType}
        ${tripTypeFilter}
        ${numberOfHorsesFilter}
        ${priceFilter}
        ${suppliersFilter} AND vh.deleted_at IS NULL AND vh.status = '${
          constants.status.active
        }' AND sp.deleted_at IS NULL AND sp.status = '${
          constants.status.active
        }'
        GROUP BY vh.id
        LIMIT ${+limit} OFFSET ${+offset};
            `;
        con.query(selQuery, (err, data) => {
          if (!err) {
            for (let i = 0; i < data.length; i++) {
              if (data[i].images) {
                const imagesArray = data[i].images.split(",");

                for (let j = 0; j < imagesArray.length; j++) {
                  imagesArray[
                    j
                  ] = `${process.env.PORT_SP}${constants.attachmentLocation.vehicle.view.image}${imagesArray[j]}`;
                  data[i].images = imagesArray;
                }
              } else {
                data[i].images = [];
              }

              if (
                (data[i].created_at && data[i].deleted_at) ||
                (!data[i].created_at && !data[i].deleted_at)
              ) {
                data[i].wishlist = false;
              } else if (data[i].created_at) {
                data[i].wishlist = true;
              }
            }

            // const totalCountQuery = `SELECT count(*) AS total_count
            // FROM ${constants.tableName.vehicles} vh
            // WHERE 1=1
            // ${gccType}
            // ${tripTypeFilter}
            // ${numberOfHorsesFilter}
            // ${priceFilter}
            // ${suppliersFilter}
            // AND vh.deleted_at IS NULL
            // AND vh.status = '${constants.status.active}'
            // LIMIT ${+limit} OFFSET ${+offset}`;
            // con.query(totalCountQuery,(err,result)=>{

            //     if(!err){
            //         const count = result[0]

            resolve({ totalCount: data?.length, listing_data: data });
            //     }
            // })
          } else {
            resolve(false);
          }
        });
      } catch (err) {
        resolve(false);
        console.log("Error while fetching listing data", err);
      }
    });
  }

  static async getUsernameServiceProvider() {
    return new Promise((resolve, reject) => {
      try {
        const selQuery = `
             SELECT sp.id, sp.name,
             COALESCE(COUNT(vh.id), 0) AS vehicle_count
        FROM service_providers AS sp
        LEFT JOIN ${constants.tableName.vehicles} AS vh ON vh.service_provider_id = sp.id
        JOIN ${constants.tableName.roles} AS rl ON sp.role_Id = rl.id
        WHERE sp.deleted_at IS NULL AND vh.deleted_at IS NULL AND vh.status = '${constants.status.active}'
        AND sp.status = '${constants.status.active}'
        AND rl.id <> '${constants.Roles.admin}'  
        AND rl.id <> '${constants.Roles.super_admin}'
        GROUP BY sp.id, sp.name;
        `;

        con.query(selQuery, (err, data) => {
          if (!err) {
            let selQuery = `SELECT MAX(vh.price) AS max_price, MIN(vh.price) AS min_price 
                    FROM ${constants.tableName.vehicles} vh
                    WHERE vh.deleted_at IS NULL AND vh.status = '${constants.status.active}'`;
            con.query(selQuery, (err, result) => {
              if (!err) {
                resolve({ serviceProviders: data, vehicle_price: result });
              }
            });
          } else {
            resolve(false);
          }
        });
      } catch (err) {
        resolve(false);
        console.log(
          "Error while feching service providers for listing page",
          err
        );
      }
    });
  }
};
