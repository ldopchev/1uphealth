import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import {Container, Row, Button, Col} from 'react-bootstrap';
import EverythingData from './components/EverythingData';


function App() {
  const baseUrl = "";
  const [connected, setConnected] = useState(false);
  const [hasToken, setTokenState] = useState(false);
  const [patientUrl, setPatientUrl] = useState("");
  const [everythingData, setEverythingData] = useState({});
 
  // Get code and exchange for token
  useEffect(() => {
    // Check flag if token has been retrieved, 
    // get code in node and exchange for token
    if(!hasToken) {
      fetch(`${baseUrl}/oauth/code`)
      .then(response => response.json())
      .then(data => {
        
        console.log(data);
        fetch(`${baseUrl}/oauth/token`)
          .then(response => response.json())
          .then(data => {
            console.log(data)
            setTokenState(true);
          })
          .catch(error => {console.log(error)});
      })
      .catch(error => {console.log(error)});
    }

    // Set connected to EHR flag if ?success=true
    let urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('success') == 'true') {
      setConnected(true);
    }

  })

  // Does not work if uid already registered
  const register = () => {
    fetch(`${baseUrl}/api/register`)
    .then(response => response.json())
    .then(data => {console.log(data)})
    .catch(error => {console.log(error)});
  }
  
  const connect = () => {
    fetch(`${baseUrl}/api/connect-url`)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // Redirect to EHR auth page
      window.location.href = data.url;
    })
    .catch(error => console.log(error));
  }

  const getPatient = () => {
    fetch(`${baseUrl}/api/patient`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setPatientUrl(data.url);
    })
    .catch(error => console.log(error));
  }

  const getEverything = (url) => {
    fetch(`${baseUrl}/api/everything`)
    .then(response => response.json())
    .then(data => {
      setEverythingData(data);
      console.log(everythingData);
    })
    .catch(error => console.log(error));
  }

  return (
    <Container>
      <Row></Row>
      <Row>
        <Col><Button onClick={() => register()}>Register</Button></Col>
        {!connected && <Col>
          <Button onClick={() => connect()}>Connect</Button>
        </Col>}

        {connected && patientUrl === "" && <Col>
          <Button onClick={ () => getPatient()}>Get Patient Data</Button>
        </Col> }

        {connected && patientUrl !== "" && <Col>
          <Button onClick={() => getEverything()}>$everything</Button>
        </Col>}
      </Row>
      <Row><EverythingData entry={everythingData.entry} link={everythingData.link} getEverything={getEverything}/></Row>
    </Container>
  );
}

export default App;
