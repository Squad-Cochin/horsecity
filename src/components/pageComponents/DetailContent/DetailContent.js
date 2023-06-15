// { This component  displays the  details page, and on this page, 
//  we show all the details for that destination }

import Styles from './DetailContent.module.scss';

function DetailContent(props){
    return(
        <div className={Styles.cmssection}>
            <h2 className="header-type1">About the activity / Overview</h2>
            <p className="base-text">
             {props.description}
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