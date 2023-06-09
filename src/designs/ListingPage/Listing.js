import React from 'react';


import Header from '../../components/pageComponents/Header/Header'
import SearchWidgetSection from '../../components/pageComponents/ListingSearchbar/ListingSearchbar'
import SideBar from '../../components/pageComponents/SideBar/SideBar'
import ListingProbox from '../../components/pageComponents/ListingProbox/ListingProbox';
import styles from './Listing.module.scss'

function ListingPage() {


  return (
    <div>
      <Header />
      <SearchWidgetSection />
      <div className={styles['listing-page']}>
        <SideBar />
        <ListingProbox />
      </div>
    </div>
  )
}

export default ListingPage