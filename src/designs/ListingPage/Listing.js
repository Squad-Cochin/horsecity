import React,{useState} from 'react'
import Styles from "./Listing.module.scss";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Header from "../../components/pageComponents/Header/Header";
import Container from "react-bootstrap/Container";
import ListingSearchbar from "../../components/pageComponents/ListingSearchbar/ListingSearchbar";
import ButtonType from "../../components/elementComponents/Button/Button";
import ListingProbox from "../../components/pageComponents/ListingProbox/ListingProbox";
import Sidebar from '../../components/pageComponents/SideBar/SideBar';
import ActivityFilter from '../../components/pageComponents/ActivityFilter/ActivityFilter';
import SidebarBooking from '../../components/pageComponents/SidebarBookingItems/SidebarBookingItems';
function TestPage() {
  const [wishlist, setWishlist] = useState([]);
  const [cart,setCart] =useState([])
  return (
    <>
      <Header wishlist={wishlist} cart={cart}/>
      <div className={Styles['listingpage']}>
        <Container>
          <ListingSearchbar template="home" />
        </Container>
      </div>
      <Container>
        <ActivityFilter />
      </Container>
      <Container>
        <Row>
          <Col xl={3} lg={4}>
          <div className={`pageSidebar`}>
               <SidebarBooking cart={cart} setCart={setCart}/>
              <Sidebar />
      
          </div>  
          </Col>
          <Col xl={9} lg={8}>
            {/* In this case, we will pass data into the ListingProbox component using props.*/}
            <ListingProbox boxData = {boxData} wishlist={wishlist} setWishlist={setWishlist} setCart={setCart}/>
            <div className="text-center">
              <ButtonType className="btntype2" name="Show More" />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default TestPage

const boxData = [
  {
    currency: "AED",
    vehicle: [
      {
        id: 0,
        picture: "https://via.placeholder.com/250x250",
        name: "Rosetta Massey",
        vehicleType: "international",
        company: "Maryellen",
        description: "Commodo labore do officia dolore non. Ipsum labore veniam irure dolore in enim aute in consequat consequat dolore. Magna elit consequat eiusmod cupidatat. Esse ea pariatur aliqua nulla do enim. Nulla ex occaecat id veniam. Eiusmod minim aute fugiat ex qui duis nostrud amet in veniam exercitation dolor.\r\n",
        price: "2,109.54",
        isActive: true
      },
      {
        id: 1,
        picture: "https://via.placeholder.com/250x250",
        name: "Mariana Sanford",
        vehicleType : "private",
        company: "Jodi",
        description: "Consequat qui ut nostrud anim ea quis veniam excepteur aute mollit adipisicing nulla tempor. In ipsum sit exercitation deserunt cillum excepteur. Occaecat irure reprehenderit consectetur id nisi do reprehenderit et sunt nisi qui mollit Lorem exercitation. Excepteur est pariatur magna sit ex esse id sunt velit cillum nostrud. Irure reprehenderit laborum reprehenderit laborum.\r\n",
        price: "3,321.37",
        isActive : true
      },
      {
        id: 2,
        picture : "https://via.placeholder.com/250x250",
        name : "Ferrell Stephens",
        vehicleType : "international",
        company : "Cornelia",
        description : "In cillum anim pariatur nulla sit qui nulla quis in aute magna ullamco consectetur. Velit sit incididunt voluptate cupidatat ad aliquip cupidatat. Eiusmod id amet nostrud dolor.\r\n",
        price : "3,869.04",
        isActive : true
      }
    ]
  }
];


// {
//   id: 1,
//   title: "Barcelona Sailing Experience - Sunset",
//   type: "Cruises and water sports",
//   time: "3 hours",
//   text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, Lorem ipsum dolor sit amet, consectetur adipisicing elit..",
//   linkText: "More details",
//   price: "$21.00",
//   rating: "4.5/5",
//   ratingCount: "68 ratings",
//   buttonText: "Book"
// },