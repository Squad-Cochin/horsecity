// { In this component, display the 'Details' page for the features section,
// in there have all the destination details }

import React from "react";


import Styles from "./FeatureTable.module.scss";
import Image from "react-bootstrap/Image";
import Ftime from "../../../asset/images/duration.svg";
import Activity from "../../../asset/images/city.svg";
import Language from "../../../asset/images/language.svg";
import Contact from "../../../asset/images/contact.svg";
import Phone from "../../../asset/images/phone.svg";
import Mail from "../../../asset/images/mail.svg";
import Site from "../../../asset/images/site.svg";

// This component renders each item in the table
function Tableitem(props) {
  return (
    <>
      <li className={Styles.tableItem}>
        <span className={Styles.label}>{props.labels}</span>
        <span className={Styles.value}>
          {props.img ? (
            <Image className={Styles.icon} src={props.img} alt="" />
          ) : null}
          {props.values}
        </span>
      </li>
    </>
  );
}

export const FeatureTable = () => {
  const tablevalues = [
    { id: 1, label: "Duration", value: "4-6 hours", icon: Ftime },
    { id: 2, label: "Age range", value: "5 to 80 years old" },
    { id: 3, label: "Activity Type", value: "City Tour", icon: Activity },
    { id: 4, label: "Max Group Size", value: "Max of 15 per group" },
    { id: 5, label: "Start / Finish", value: "Melbourne / Melbourne" },
    {
      id: 6,
      label: "Cities / Destinations",
      value:
        "Hobart - Freycinet - Launceston - Sydney - Alice Spring - Ayers Rock - Cairns",
    },
    { id: 7, label: "Activity Level", value: "Intermediate Cycling" },
    {
      id: 8,
      label: "Language",
      value: "English, Spanish, Frenchs",
      icon: Language,
    },
  ];
  return (
    <>
      <section className={Styles.featureSection}>
        <h2 className={Styles.title}>Features</h2>
        <div className={Styles.tableList}>
          <ul className={Styles.tableListitem}>

            {tablevalues.map((tablevalue) => (
              <Tableitem
                key={tablevalue.id}
                labels={tablevalue.label}
                values={tablevalue.value}
                img={tablevalue.icon}
              />
            ))}
            <li className={Styles.tableItem}>
              
              <span className={Styles.label}>Contact</span>
              <span className={Styles.value}>
                <Image className={Styles.icon} src={Contact} alt="" />
                Address comes here Postcode City
              </span>
            </li>
            <li className={`socialMedia ${Styles.tableItem}`}>
              <span className={Styles.phone}>
                <Image className={Styles.icon} src={Phone} alt="" />
                <a href="phone">+000 123 456 789</a>
              </span>
              <span className={Styles.mail}>
                <Image className={Styles.icon} src={Mail} alt="" />
                <a href="mail">info@company.com</a>
              </span>
              <span className={Styles.site}>
                <Image className={Styles.icon} src={Site} alt="" />
                <a href="site">www.yourwebsite.com</a>
              </span>
            </li>
          </ul>
        </div>
      </section>
      
    </>
  );
};
export default FeatureTable;
