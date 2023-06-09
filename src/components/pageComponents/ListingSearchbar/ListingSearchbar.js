import React from 'react'
import styles from "./ListingSearchbar.module.scss";
import InputType from '../../elementComponents/Input/Input';
import ButtonType from '../../elementComponents/Button/Button';
function ActivitySearchWidgetHome() {

  return (
    <>
      <div className={styles['search-bar']}>

        <InputType type="text" placeholder="Search..." className='search-input' />
        <ButtonType type="submit" name="Search" />

      </div>
      <div className={styles["container"]}>
        <div className={styles["button-group"]}>
          <ButtonType className='my-bookings-button' name='My Bookings' />
          <ButtonType className='my-payments-button' name='My payments' />
          {/* <button className={styles['my-bookings-button']}>My Bookings</button>
        <button className={styles["my-payments-button"]}>My Payments</button> */}
        </div>
      </div>
    </>
  )
}

export default ActivitySearchWidgetHome
