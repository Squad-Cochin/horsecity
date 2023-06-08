import React from 'react'
import {Row, Col } from "react-bootstrap";
import { Image } from "react-bootstrap";
import { Link } from 'react-router-dom';
import styles from "./ListingProbox.module.scss";
import ButtonType from '../../components/elementComponents/Button/Button';
function ListingProbox() {
    // const history = useHistory();
    const CarsData = [
        {
          id: 1,
          image: "car.png",
          title: "",
          price: "US $21",
          subTitle: "Nissan Rogue or similar",
          noOfPerson: 5,
          manual: 1,
          duration: "1h",
          enhancedCleaning: "y",
          freeCancellation: "y",
          pay: "Pay at pick-up",
          ratings: "9.5/10",
          noOfRatings: "68 ratings",
          oneWay: "y",
          ratingImg: "rating1.png",
        },
        {
          id: 2,
          image: "car.png",
          title: "Midsize SUV",
          price: "US $68",
          subTitle: "Nissan Rogue or similar",
          noOfPerson: 5,
          automatic: 1,
          duration: "1h",
          enhancedCleaning: "y",
          freeCancellation: "y",
          pay: "Pay now and save",
          ratings: "9.5/10",
          noOfRatings: "68 ratings",
          oneWay: "y",
          protection: "Basic Collision Damage Protection",
          ratingImg: "rating2.png",
        },
        {
          id: 3,
          image: "car.png",
          title: "Economy",
          price: "US $79",
          subTitle: "Nissan Rogue or similar",
          noOfPerson: 5,
          automatic: 1,
          duration: "1h",
          enhancedCleaning: "y",
          freeCancellation: "y",
          pay: "Pay now and save",
          ratings: "9.5/10",
          noOfRatings: "68 ratings",
          oneWay: "y",
          deal: "y",
          protection: "Basic Collision Damage Protection",
          ratingImg: "rating3.png",
        },
      ];
  return (
    <>
      <Row className={styles.alertDiv}>
        <div
          className="alert alert-primary d-flex align-items-center"
          role="alert"
        >
          <Image
            src={`../images/CarListing/info.svg`}
            alt="info"
            height={40}
            width={40}
            className="me-3"
          />
          <div>
            
          </div>
          <div></div>
        </div>
      </Row>
      {CarsData.map((data) => (
        <Row className="border-top border-bottom py-3 " key={data.id}>
          <Col sm={3} lg={3}>
            <Image
              src={`../images/CarListing/${data.image}`}
              alt={data.title}
              width={192}
              height={143}
            />
          </Col>
          <Col sm={3} lg={4} className={styles.carDetailDiv}>
            {data.deal ? (
              <span className={`badge badge-info fw-bold ${styles.badgeTxt}`}>
                Great Deal
              </span>
            ) : (
              ""
            )}
            <h1 className="header-type1">{data.title}</h1>
            <span className="d-block mb-2">{data.subTitle}</span>
            {data.noOfPerson ? (
              <span className={`${styles.personTxt}`}>{data.noOfPerson}</span>
            ) : (
              ""
            )}
            {data.automatic ? (
              <span className={`${styles.automaticTxt}`}>Automatic</span>
            ) : (
              ""
            )}
            {data.manual ? (
              <span className={`${styles.manualTxt}`}>Manual</span>
            ) : (
              ""
            )}
            <div>
              <span className={`${styles.mileageTxt}`}>Unlimited mileage</span>
            </div>
            <div>
              <span className={`${styles.enhancedTxt}`}>Enhanced cleaning</span>
            </div>
            <div>
              <span className={`${styles.counterTxt}`}>
                Counter and car in terminal
              </span>
            </div>
            <div className="mt-2">
              <Link href="/cardetail">
                <a className="link-type1 fw-bold m-0">View more info</a>
              </Link>
            </div>
          </Col>
          <Col sm={3} lg={3}>
            {data.freeCancellation ? (
              <div className={styles.cancellation}>
                <div className={styles.cancelTxt}>Free cancellation</div>
                <div className={styles.cancelTxt}>{data.protection}</div>
                <div className={styles.cancelTxt}>{data.pay}</div>
              </div>
            ) : (
              ""
            )}
            <div>
              <Image
                src={`../images/CarListing/${data.ratingImg}`}
                alt={data.title}
                className={styles.ratingImg}
                width={43}
                height={20}
              />
              <span className={styles.ratingNo}>{data.ratings} </span>
              <span>{`(${data.noOfRatings})`}</span>
            </div>
          </Col>
          <Col
            sm={3}
            lg={2}
            className={`text-sm-end ${styles.reserveBtnCol}`}
          >
            <div>
              <span className={`${styles.price} `}>{data.price}</span>
              <div className={styles.perDayCharge}>per day</div>
              <div className={styles.perDayCharge}>$1,428 total</div>
            </div>
            <div className={`${styles.ReserveButton} align-self-end`}>
              <ButtonType
                className="btntype1 mt-2"
                name="Reserve"
                onClick={() => console.log("hello")}
              />
            </div>
          </Col>
        </Row>
      ))}

      <div className="text-center mt-4">
        <ButtonType className="btntype2" name="View More" onClick={() => console.log("hello") } />
      </div>
    </>
  )
}

export default ListingProbox