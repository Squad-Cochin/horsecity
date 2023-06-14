// { In this component, we display the bottom section on the details page,
//  Here, we provide questions and answers related to the specific tour destination }

// We installed react-bootstrap and used the Accordion component from the library
import Accordion from 'react-bootstrap/Accordion';
import Styles from "./AccordionType.module.scss";
const faqsList = [
  {
    Key: 0, 
    header: 'Which attractions will I visit with Flamenco Show at Tablao Flamenco Cordobes Barcelona in Las Ramblas?', 
    bodycon: 'Flamenco Show at Tablao Flamenco Cordobes Barcelona in Las Ramblas is hosted by Flamenco Barcelona - Tablao Flamenco Cordobes. Read reviews, discover additonal experiences or contact Flamenco Barcelona - Tablao Flamenco Cordobes on Tripadvisor. Discover and book Flamenco Show at Tablao Flamenco Cordobes Barcelona in Las Ramblas on Tripadvisor'
  },
  {
    Key: 1, 
    header: 'How much is Flamenco Show at Tablao Flamenco Cordobes Barcelona in Las Ramblas?', 
    bodycon: 'Flamenco Show at Tablao Flamenco Cordobes Barcelona in Las Ramblas is hosted by Flamenco Barcelona - Tablao Flamenco Cordobes. Read reviews, discover additonal experiences or contact Flamenco Barcelona - Tablao Flamenco Cordobes on Tripadvisor. Discover and book Flamenco Show at Tablao Flamenco Cordobes Barcelona in Las Ramblas on Tripadvisor'
  },
  {
    Key: 2, 
    header: 'What is the Flamenco Show at Tablao Flamenco Cordobes Barcelona in Las Ramblas cancellation policy?',
    bodycon: 'Flamenco Show at Tablao Flamenco Cordobes Barcelona in Las Ramblas is hosted by Flamenco Barcelona - Tablao Flamenco Cordobes. Read reviews, discover additonal experiences or contact Flamenco Barcelona - Tablao Flamenco Cordobes on Tripadvisor. Discover and book Flamenco Show at Tablao Flamenco Cordobes Barcelona in Las Ramblas on Tripadvisor'
  },
  {
    Key: 3, 
    header: 'Which company provides Flamenco Show at Tablao Flamenco Cordobes Barcelona in Las Ramblas?', 
    bodycon: 'Flamenco Show at Tablao Flamenco Cordobes Barcelona in Las Ramblas is hosted by Flamenco Barcelona - Tablao Flamenco Cordobes. Read reviews, discover additonal experiences or contact Flamenco Barcelona - Tablao Flamenco Cordobes on Tripadvisor. Discover and book Flamenco Show at Tablao Flamenco Cordobes Barcelona in Las Ramblas on Tripadvisor'
  },
];

// Define the AccordionType component
function AccordionType(props) {
  const myLists = props.myLists;  
  return (
    
    <Accordion defaultActiveKey="0" flush className={`${Styles.accordiontype} ${props.className}`}>
      {/*We will display the data here*/}
      {faqsList.map((faqlist) =>
        // eslint-disable-next-line react/jsx-key
        <Accordion.Item eventKey={faqlist.Key}>
          <Accordion.Header>{faqlist.header}</Accordion.Header>
          <Accordion.Body>{faqlist.bodycon}</Accordion.Body>
      </Accordion.Item>
      )}
    </Accordion>
  );
}
AccordionType.defaultProps = {
  className:"",
}
export default AccordionType;