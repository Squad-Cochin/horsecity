///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                   File for functionalities if WISH LIST in DASHBORD pages                         //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import WishlistData from '../../../api/wishList';
import isWishlist from "../../../api/wishlistApi";
import { Navigation, Pagination } from "swiper";
import { GiHorseHead } from "react-icons/gi";
import Link from "next/link";
import { useDispatch,useSelector } from "react-redux";
import { wishlist_items } from "../../../../features/wishlist/wishlist";
import { TbBus, TbArrowAutofitWidth, TbArrowAutofitHeight, TbLineHeight } from "react-icons/tb";

// Function for the working of functionality in wish list
const Properties = () => {
  const [ wishlist,setWishlist ] = useState([])
  const [ customer_id, setCustomerId ] =  useState('');
  const [ isLogin, setLogin ] = useState(false);

  const dispatch = useDispatch();
  const { page } = useSelector((state) => state.wishlist) || {};
  const { limit } = useSelector((state) => state.listingFilter) || {};

  useEffect(()=>{
    initialLoad();
  },[])

  // Function for the initial load of the page for getting wishlist items
  async function initialLoad(){
    const loginData = await JSON.parse(localStorage.getItem('loginData'));
    if (Object.keys(loginData).length !== 0) {
      setCustomerId(loginData.id);
      setLogin(true);
      let reqObj = {
        page : page,
        limit : limit,
        customer_id : loginData.id
      }
      let wishlist = await WishlistData(reqObj);
      if(wishlist?.code == 200){
        setWishlist(wishlist.data)
        dispatch(wishlist_items({total_count : wishlist.data.totalCount}))
      }
    }
  }

  // Function for remove from wishlist
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
    }
  }

  // FUNCTION FOR IMAGE LOADER
  const imageLoader = ({ src, width, quality }) => {
    return `${src}`;
  };

  return (
    <>
       {wishlist?.wishlist?.map((item) => (
        <div className="col-12" key={item?.id}>
          <div className=" pt-30">
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
                                <Image
                                  loader={imageLoader}
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
                    <h3 className="text-18 lh-16 fw-500 mt-5">
                      {item.title}
                    </h3>
                  </div>
                  <div className="col-lg-12 mt-20">
                    <div className="row y-gap-5">
                      <div className="col-sm-6">
                        <div className="d-flex items-center">
                          <GiHorseHead />
                          <div className="text-14 ml-10">{item?.no_of_horse}</div>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="d-flex items-center ">
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

export default Properties;
