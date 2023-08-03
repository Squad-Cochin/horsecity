import React,{useEffect,useState} from "react"
import { Container, Row, Col } from "reactstrap"
import { getSettingsPageData } from '../../helpers/ApiRoutes/getApiRoutes'; 
// import { useSelector } from "react-redux";
const Footer = () => {
  const [pageTitle, setPageTitle] = useState('HORSCITY');
  
  useEffect(() => {
    getAllData()

  }, [pageTitle]);

  async function getAllData() {
    let settingsData = await getSettingsPageData();
    setPageTitle(settingsData?.settingsPageData[0]?.application_title);
   }
  //  const { data } = useSelector(state => ({
  //   data: state.settings.data,
  // }));
  // console.log("DAta",data);
 
  return (
    <React.Fragment>
      <footer className="footer">
        <Container fluid ={true}>
          <Row>
            <Col sm={6}>{new Date().getFullYear()} © {pageTitle}.</Col>
            <Col sm={6}>
              {/* <div className="text-sm-end d-none d-sm-block">
                Crafted with <i className="mdi mdi-heart text-danger"></i> by
                Themesdesign
              </div> */}
            </Col>
          </Row>
        </Container>
      </footer>
    </React.Fragment>

  );
}

export default Footer;