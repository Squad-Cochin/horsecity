import React from 'react'
import Header from '../../components/pageComponents/Header/Header'
import SearchWidgetSection from '../../components/pageComponents/ListingSearchbar/ListingSearchbar'
import ListingProbox from '../ListingProbox/ListingProbox'
function ListingPage() {
  return (
    <div>
        <Header/>
        <SearchWidgetSection/>
        <ListingProbox/>
    </div>
  )
}

export default ListingPage