import React,{useEffect,useState} from "react"
import { Container, Row, Col } from "reactstrap"
import { getSettingsPageData } from '../../helpers/ApiRoutes/getApiRoutes'; 
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";
const Footer = () => {
  const [pageTitle, setPageTitle] = useState('HORSCITY');
  
  useEffect(() => {
    getAllData()

  }, [pageTitle]);

  async function getAllData() {
    let settingsData = await getSettingsPageData();
    setPageTitle(settingsData && settingsData?.settingsPageData[0]?.application_title);
   }
   const {  dir } = useSelector(state => ({
    dir: state.Layout.dir,
  }));
  return (
    <React.Fragment>
      <footer className={`footer ${dir ==='rtl'? 'footer-rtl' : ''}`}>
        <Container fluid ={true}>
          <Row>
            <Col sm={6} className={` ${dir ==='rtl'? 'footer-rtl-item' : ''}`}>{new Date().getFullYear()} © {pageTitle}.</Col>
            <Col sm={6}>
      
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>

  );
}

export default Footer;