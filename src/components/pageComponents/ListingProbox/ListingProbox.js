import React from 'react'



import styles from './ListingProbox.module.scss'
function ListingProbox() {

  const listingArray =
  [
    {
      "currency": "AED",
      "vehcile": [
        {
          "id": 0,
          "picture": "https://via.placeholder.com/250x250",
          "name": "Rosetta Massey",
          "vehicleType": "international",
          "company": "Maryellen",
          "description": "Commodo labore do officia dolore non. Ipsum labore veniam irure dolore in enim aute in consequat consequat dolore. Magna elit consequat eiusmod cupidatat. Esse ea pariatur aliqua nulla do enim. Nulla ex occaecat id veniam. Eiusmod minim aute fugiat ex qui duis nostrud amet in veniam exercitation dolor.\r\n",
          "price": "2,109.54",
          "isActive": true
        },
        {
          "id": 1,
          "picture": "https://via.placeholder.com/250x250",
          "name": "Mariana Sanford",
          "vehicleType": "private",
          "company": "Jodi",
          "description": "Consequat qui ut nostrud anim ea quis veniam excepteur aute mollit adipisicing nulla tempor. In ipsum sit exercitation deserunt cillum excepteur. Occaecat irure reprehenderit consectetur id nisi do reprehenderit et sunt nisi qui mollit Lorem exercitation. Excepteur est pariatur magna sit ex esse id sunt velit cillum nostrud. Irure reprehenderit laborum reprehenderit laborum.\r\n",
          "price": "3,321.37",
          "isActive": true
        },
        {
          "id": 2,
          "picture": "https://via.placeholder.com/250x250",
          "name": "Ferrell Stephens",
          "vehicleType": "international",
          "company": "Cornelia",
          "description": "In cillum anim pariatur nulla sit qui nulla quis in aute magna ullamco consectetur. Velit sit incididunt voluptate cupidatat ad aliquip cupidatat. Eiusmod id amet nostrud dolor.\r\n",
          "price": "3,869.04",
          "isActive": true
        }
      ]
    }
  ]
  


  return (
    <>
      <div className={styles["main-content"]}>
        {listingArray.map((listing) =>
          listing.vehcile.map((item) => (


            <div className={styles["listing-item"]} key={item.id}>
              <div className={styles["image-container"]}>
                <img src={item.picture} alt="Car" className={styles["car-image"]} />
              </div>
              <div className={styles["details-container"]}>
                <h3 >{item.name}</h3>
                <div className="detail-row">
                  <span className="detail-value">{item.vehicleType}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-value">{item.company}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">{item.description}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">{item.price} </span>
                </div>
              </div>
            </div>
          )))}

      </div>
    </>

  )
}

export default ListingProbox