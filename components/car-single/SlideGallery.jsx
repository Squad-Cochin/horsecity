import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Mousewheel } from "swiper";
import { useEffect, useState } from "react";

const slides = [
  "/img/cars/slides/horseV1.jpg",
  "/img/cars/slides/horseV2.jpg",
  "/img/cars/slides/horseV3.jpg",
  "/img/cars/slides/horseV1.jpg",
];

export default function SlideGallery(props) {
  const [imagesNavSlider, setImagesNavSlider] = useState(null);
  // const [ images ,setImage] = useState([]);


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
                      <img src={slide?.url} alt="" />
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
                    <img src={slide.url} alt="" />
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
