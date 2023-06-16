// { This component is designed to display information under the activity route map on the 'details' page.
// Here, we provide questions and answers related to the specific tour destination  }

// We installed react-bootstrap and used the Accordion component from the library
// Importing the necessary dependencies
import Accordion from "react-bootstrap/Accordion"; // Importing the Accordion component from react-bootstrap library
import Styles from "./AccordionType.module.scss"; // Importing the styles from a local module

// Declaring the AccordionType component
function AccordionType(props) {
  // List of FAQs with headers and bodies
  const faqsList = [
    {
      Key: 0,
      header: "Inclusions / Exclusions",
      bodycon:
        '<ul class="aminities">...</ul>', // HTML content for the body of the accordion item
    },
    {
      Key: 1,
      header: "What you can expect",
      bodycon:
        'Flamenco Show at Tablao Flamenco Cordobes Barcelona...', // Text content for the body of the accordion item
    },
    {
      Key: 2,
      header: "Know before you book / Additional information",
      bodycon:
        '<ul class="aminities">...</ul>', // HTML content for the body of the accordion item
    },
  ];

  // Mapping the faqsList array to create the accordion items
  const myList = (props.faqsList ? faqsList : faqsList).map((faqlist) => (
    // eslint-disable-next-line react/jsx-key
    <Accordion.Item className={Styles.accordionPlus} key={faqlist.Key}>

      <Accordion.Header>{faqlist.header}</Accordion.Header>
      <Accordion.Body
        dangerouslySetInnerHTML={{ __html: faqlist.bodycon }} // Setting the HTML content of the accordion body using dangerouslySetInnerHTML to avoid escaping HTML tags
      ></Accordion.Body>
    </Accordion.Item>
  ));

  // Rendering the Accordion component with defaultActiveKey, flush, and className props
  return (
    <Accordion
      defaultActiveKey="0" // Setting the default active accordion item
      flush // Removing the borders and backgrounds of the Accordion component
      className={`${Styles.accordiontype} ${props.className}`} // Applying the styles from local module and any additional className provided through props
    >
      {myList} 
    </Accordion>
  );
}

// Default props for the AccordionType component
AccordionType.defaultProps = {
  className: "", // Default value for the className prop
};

export default AccordionType; // Exporting the AccordionType component
