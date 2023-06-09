import React from 'react'



import styles from './ListingProbox.module.scss'
function ListingProbox() {


  return (
    <>
      <div className={styles["main-content"]}>
        <div className={styles["listing-item"]}>
          <div className={styles["image-container"]}>
            <img src={process.env.PUBLIC_URL + '/images/horseVehicle.jpg'} alt="Car" className={styles["car-image"]} />
          </div>
          <div className={styles["details-container"]}>
            <h3>Listing Item 1</h3>
            <div className="detail-row">
              <span className="detail-label">Color:</span>
              <span className="detail-value">Red</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Dimension:</span>
              <span className="detail-value">2000x1500x1000</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Capacity:</span>
              <span className="detail-value">4 passengers</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Rating:</span>
              <span className="detail-value">4.5 stars</span>
            </div>
          </div>
        </div>

        <div className={styles["listing-item"]}>
          <div className={styles["image-container"]}>
            <img src={process.env.PUBLIC_URL + '/images/horseVehicle.jpg'} alt="Car" className={styles["car-image"]} />
          </div>
          <div className={styles["details-container"]}>
            <h3>Listing Item 1</h3>
            <div className="detail-row">
              <span className="detail-label">Color:</span>
              <span className="detail-value">Red</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Dimension:</span>
              <span className="detail-value">2000x1500x1000</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Capacity:</span>
              <span className="detail-value">4 passengers</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Rating:</span>
              <span className="detail-value">4.5 stars</span>
            </div>
          </div>
        </div>

      </div>



    </>

  )
}

export default ListingProbox