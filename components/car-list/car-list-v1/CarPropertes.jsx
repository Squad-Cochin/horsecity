import vehicleData from "../../../data/cars";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import Image from "next/image";
import Link from "next/link";
import { GiHorseHead } from "react-icons/gi";
import { TbBus, TbArrowAutofitWidth, TbArrowAutofitHeight, TbLineHeight } from "react-icons/tb";
import { HiAdjustments } from "react-icons/hi";
import { useEffect } from "react";
import listingDataApi from "../../../pages/api/listingDataApi";
import isWishlist from "../../../pages/api/wishlistApi";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { add_list_data } from "../../../features/listData/listData";


const CarPropertes = () => {
  const [ searchData, setSearchData ] = useState({});
  const { price_from, price_to, suppliers, sort, page, limit } = useSelector((state) => state.listingFilter) || {};
  const { list_data } = useSelector((state) => state.listData) || {};
  const [ isLogin, setLogin ] = useState(false);
  const [ customer_id, setCustomerId ] =  useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    initialLoad();
  },[])

  async function initialLoad(){
    const search = await JSON.parse(localStorage.getItem('searchObject'));
    const loginData = await JSON.parse(localStorage.getItem('loginData'));

    if (Object.keys(loginData).length !== 0) {
      setCustomerId(loginData.id);
      setLogin(true);
    }
    setSearchData(search)
    listingData(search);
  }

  async function listingData(search){
    let reqObj = {
      "trip_type": search.trip_type,
      "number_of_horses": search.number_of_horses,
      "price_from": price_from,
      "price_to" : price_to,
      "suppliers" : suppliers,
      "sort" : sort,
      "customer_id" : customer_id,
      "page" : page,
      "limit" : limit
    }
    let packageList = await listingDataApi(reqObj)
    dispatch(add_list_data(packageList))
  }

  const handleWishlist =async (wishlist,pId) =>{
    let reqObj= {
      customer_id :customer_id,
      vehicle_id : pId
    }
    if(wishlist){
      reqObj.flag = false;
     
      let wishlisted = await isWishlist(reqObj);
      if(wishlisted.code == 200){
        initialLoad();
      }
    }else{
      reqObj.flag = true;
      let wishlisted = await isWishlist(reqObj);
      if(wishlisted.code == 200){
        initialLoad();
      }
    } 
  }

  return (
    <>
      {list_data?.listing_data.map((item) => (
        <div className="col-12" key={item?.id}>
          <div className="border-top-light pt-30">
            <div className="row x-gap-20 y-gap-20">
              <div className="col-md-auto">
                <div className="relative d-flex">
                  <div className="cardImage w-250 md:w-1/1 rounded-4 border-light">
                    <div className="custom_inside-slider">
                      <Swiper
                        className="mySwiper"
                        modules={[Pagination, Navigation]}
                        pagination={{
                          clickable: true,
                        }}
                        navigation={true}
                      >
                        {item?.images?.map((slide, i) => (
                          <SwiperSlide key={i}>
                            <div className="ratio ratio-1:1">
                              <div className="cardImage__content">
                                <img
                                  width={250}
                                  height={250}
                                  className="rounded-4 col-12 js-lazy"
                                  src={slide}
                                  priority
                                  alt="image"
                                />
                              </div>
                              { isLogin ? (
                              <div className="cardImage__wishlist">

                                <button className="button -blue-1 bg-white size-30 rounded-full shadow-2" onClick={() => handleWishlist(item.wishlist,item.id)} >
                                  <svg
                                    height="20px"
                                    version="1.1"
                                    viewBox="0 0 512 512"
                                    width="20px"  
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M340.8,83C307,83,276,98.8,256,124.8c-20-26-51-41.8-84.8-41.8C112.1,83,64,131.3,64,190.7c0,27.9,10.6,54.4,29.9,74.6  L245.1,418l10.9,11l10.9-11l148.3-149.8c21-20.3,32.8-47.9,32.8-77.5C448,131.3,399.9,83,340.8,83L340.8,83z"
                                      fill={ item.wishlist ? "red"  : null}
                                    />
                                  </svg>
                                </button>
                              </div>)
                              : null
                            }
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                    </div>

                    {/* End image */}
                  </div>
                  {/* End image ratio */}
                </div>
                {/* End relative */}
              </div>
              {/* End .col */}

              <div className="col-md">
                <div className="d-flex flex-column h-full justify-between">
                  <div>
                    {/* <div className="row x-gap-5 items-center">
                      <div className="col-auto">
                        <div className="text-14 text-light-1">
                          {item?.location}
                        </div>
                      </div>
                      <div className="col-auto">
                        <div className="size-3 rounded-full bg-light-1" />
                      </div>
                      <div className="col-auto">
                        <div className="text-14 text-light-1">SUV</div>
                      </div>
                    </div> */}
                    <h3 className="text-18 lh-16 fw-500 mt-5">
                      {item.title}
                      {/* <span className="text-15 text-light-1">or similar</span> */}
                    </h3>
                  </div>
                  <div className="col-lg-7 mt-20">
                    <div className="row y-gap-5">
                      <div className="col-sm-6">
                        <div className="d-flex items-center">
                          <GiHorseHead />
                          <div className="text-14 ml-10">{item?.no_of_horse}</div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex items-center">
                          <TbLineHeight />
                          <div className="text-14 ml-10">{item?.length} feat</div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex items-center">
                          <TbArrowAutofitWidth />
                          <div className="text-14 ml-10">
                            {item?.breadth} feat
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex items-center">
                          <TbArrowAutofitHeight />
                          <div className="text-14 ml-10">{item?.height} feat</div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex items-center">
                          <TbBus />
                          <div className="text-14 ml-10">{item.make}</div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex items-center">
                          <TbBus />
                          <div className="text-14 ml-10">{item.model}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-20">
                    <div className="d-flex items-center mt-5">
                      <div className="text-14 fw-500 text-green-2 ml-10">
                        {item.free_cancelation ? <div><i className="icon-check text-10" /> Free Cancellation</div> : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* End col-md */}

              <div className="col-md-auto text-right md:text-left">
                {/* <div className="row x-gap-10 y-gap-10 justify-end items-center md:justify-start">
                  <div className="col-auto">
                    <div className="text-14 lh-14 fw-500">Exceptional</div>
                    <div className="text-14 lh-14 text-light-1">
                      {item?.numberOfReviews} reviews
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="flex-center text-dark-1 fw-600 text-14 size-40 rounded-4 bg-yellow-1">
                      {item?.ratings}
                    </div>
                  </div>
                </div> */}
                {/* End .row */}

                <div className="text-22 lh-12 fw-600 mt-70 md:mt-20">
                  AED {item?.price}
                </div>
                <div className="text-14 text-light-1 mt-5">Total</div>
                <Link
                  href={`/car/car-single/${item.id}`}
                  className="button h-50 px-24 bg-dark-1 -yellow-1 text-white mt-24"
                >
                  View Detail <div className="icon-arrow-top-right ml-15" />
                </Link>
              </div>
              {/* End col-md-auto */}
            </div>
            {/* End .row */}
          </div>
        </div>
      ))}
    </>
  );
};

export default CarPropertes;
