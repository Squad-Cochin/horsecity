// { This component  displays the  details page, and on this page, 
//  we show all the details for that destination }

import Styles from './DetailContent.module.scss';

function DetailContent(){
    return(
        <div className={Styles.cmssection}>
            <h2 className="header-type1">About the activity / Overview</h2>
            <p className="base-text">
              Enjoy an exclusive intimate evening watching the sunset in
              Barcelona on board an ultimate generation luxury sailboat. Relax
              and let your worries dril away as you sail into the Mediterranean
              Sea to marvel at Barcelona’s skyline as the sun sets. Discover
              Barcelona from a unique and different point of view through the
              crystalline waters of the Mediterranean, while enjoying your
              favorite drink (Champagne, wine or beer) accompanied by some snack
              (Spanish olives, chips, crackers, nuts). Have fun and feel unique
              in your experience in a small group. Your expert crew as the
              professional guide will make sailing a truly unique experience
              that you will enjoy with a maximum of 12 persons.
            </p>
            <h2 className="header-type1">Languages</h2>
            <p className="base-text">Bilingual Tour - English/Spanish</p>
            <h2 className="header-type1">Location</h2>
            <p className="base-text">
              <strong>Start point:</strong> Port Olímpic: Moll de Mestral 2841
              <br />
              Please ensure you arrive at the meeting point at least 15 minutes
              prior to the Tour start time.
              <br />
              <strong>End point:</strong> Same as the starting point
            </p>
            <h2 className="header-type1">Schedule</h2>
            <p className="base-text">Duration: 1,5 Hours</p>
            <h2 className="header-type1">Guide options</h2>
            <p className="base-text">
              Guide type: Guide
              <br />
              Group size: 12 People
            </p>
            <h2 className="header-type1">Requirements</h2>
            <p className="base-text mb-5">
              Please notice that this activity is subject to a minimum of 2
              people.
              <br />
              Please note that the itinerary could vary due to force majeure
              circumstances.
              <br />
              Please note that excursions may be subject to change or not
              available during adverse weather conditions.
              <br />
              Passport or ID are required
            </p>
        </div>
    );
}
    
export default DetailContent;