///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//              File using for showing the images at top of the DETAILS page                         //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Mousewheel } from "swiper";
import { useState } from "react";
import Image from "next/image";

// Function for showing the images in details page top
export default function SlideGallery(props) {
  const [imagesNavSlider, setImagesNavSlider] = useState(null);

  // function for image loader
  const imageLoader = ({ src }) => {
    return `${src}`;
  };

  return (
    <section className="slider">
      <div className="carsSlider mt-40">
        <div className="carsSlider-slides js-cars-slides">
          <div className="slider__thumbs">
            <Swiper
              onSwiper={setImagesNavSlider}
              direction="vertical"
              spaceBetween={10}
              slidesPerView={4}
              className="swiper-container1"
              breakpoints={{
                0: {
                  direction: "horizontal",
                },
                768: {
                  direction: "vertical",
                },
              }}
              modules={[Navigation, Thumbs]}
            >
              {props.images?.map((slide, index) => {
                return (
                  <SwiperSlide key={index}>
                    <div className="slider__image">
                      <Image 
                        width={250}
                        height={250}
                        loader={imageLoader}
                        src={slide?.url} 
                        alt="Vechile Image" 
                      />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>

        <div className="carsSlider-slider">
          <Swiper
            thumbs={{ swiper: imagesNavSlider }}
            direction="horizontal"
            slidesPerView={1}
            spaceBetween={0}
            mousewheel={true}
            breakpoints={{
              0: {
                direction: "horizontal",
              },
              768: {
                direction: "horizontal",
              },
            }}
            className="swiper-container2"
            modules={[Navigation, Thumbs, Mousewheel]}
          >
            {props.images?.map((slide, index) => {
              return (
                <SwiperSlide key={index}>
                  <div className="slider__image">
                    <Image 
                      width={250}
                      height={250}
                      loader={imageLoader}
                      src={slide?.url} 
                      alt="Vechile Image" 
                    />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
