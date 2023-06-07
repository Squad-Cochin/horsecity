/**Navbar component */
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';


function TopBar(props) {

  // const {id,name,status} = props.obj
  return (
    <>
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>

          <div className = {`form-check form-switch text-${props.mode === 'light' ? 'dark' : 'danger'}`}>
              <input className = 'form-check-input'type = 'checkbox' onClick={() =>{ props.toggleMode(); props.alert();}} id = 'flexSwitchCheckDefault' />
              <label className = 'form-check-label' htmlFor = "flexSwitchCheckDefault">Enable Dark mode</label>          
          </div>
          


          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>

</>
  )
}

export default TopBar