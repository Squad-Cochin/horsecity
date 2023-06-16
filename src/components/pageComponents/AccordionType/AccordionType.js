// { This component is designed to display information under the activity route map on the 'details' page.
// Here, we provide questions and answers related to the specific tour destination  }

// We installed react-bootstrap and used the Accordion component from the library
import Accordion from "react-bootstrap/Accordion";
import Styles from "./AccordionType.module.scss";

function AccordionType(props) {
  const faqsList = [
    {
      Key: 0,
      header:
        "Inclusions / Exclusions",
      bodycon:
        '<ul class="aminities"><li class="inclusiveitem">Hop-on hop-off bus pass for Barcelona</li><li class="inclusiveitem">Unlimited rides within the duration of your pass</li><li class="inclusiveitem">Pre-recorded commentary in 15 languages.</li><li class="inclusiveitem">Headset for commentary</li><li class="inclusiveitem">Discounts booklet and Barcelona City Tour stops guide.</li><li class="exclusiveitem">Admission to museums and attractions along the tour route</li><li class="exclusiveitem">Lunch, drinks and other services not specified above</li></ul>',
    },
    {
      Key: 1,
      header:
        "What you can expect",
      bodycon:
        'Flamenco Show at Tablao Flamenco Cordobes Barcelona in Las Ramblas is hosted by Flamenco Barcelona - Tablao Flamenco Cordobes. Read reviews, discover additonal experiences or contact Flamenco Barcelona - Tablao Flamenco Cordobes on Tripadvisor. Discover and book Flamenco Show at Tablao Flamenco Cordobes Barcelona in Las Ramblas on Tripadvisor',
    },
    {
      Key: 2,
      header:
        "Know before you book / Additional information",
      bodycon:
        '<ul class="aminities"><li>Children 3 and younger are complimentary.</li><li>This activity is wheelchair accessible.</li><li>The regular Barcelona City Tour service may be affected due to ongoing events in the city, adverse traffic conditions or force majeure reasons out of our control.</li><li>Barcelona City Tour operates from 09:00 to 19:00 (last return) and with a frequency of 30 minutes aproximately between buses at the stops</li><li>In accordance with EU regulations about consumer rights, activities services are not subject to the right of withdrawal. Supplier cancellation policy will apply.</li></ul>',
    },
  ];
  const myList = (props.faqsList ? faqsList : faqsList).map((faqlist) => (

    <Accordion.Item className={Styles.accordionPlus} key={faqlist.Key}>

      <Accordion.Header>{faqlist.header}</Accordion.Header>
      
      <Accordion.Body
        dangerouslySetInnerHTML={{ __html: faqlist.bodycon }}
      ></Accordion.Body>
    </Accordion.Item>
  ));
  return (
    <Accordion
      defaultActiveKey="0"
      flush
      className={`${Styles.accordiontype} ${props.className}`}
    >
      {myList}
    </Accordion>
  );
}
AccordionType.defaultProps = {
  className: "",
};
export default AccordionType;
