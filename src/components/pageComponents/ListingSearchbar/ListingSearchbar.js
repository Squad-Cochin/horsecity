import React,{useState } from 'react'
import styles from "./ListingSearchbar.module.scss";
function  ActivitySearchWidgetHome() {

  return (
    <>
  <div className={styles['search-bar']}>
      <input type="text" placeholder="Search..." />
      <button type="submit">Search</button>
    </div>
    </>
  )
}

export default  ActivitySearchWidgetHome
