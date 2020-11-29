import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react';
import {Container, Row, Button, Col} from 'react-bootstrap';
import EverythingData from './components/EverythingData';


function App() {
  const baseUrl = "";
  const [connected, setConnected] = useState(false);
  const [patientUrl, setPatientUrl] = useState("");
  const [everythingData, setEverythingData] = useState({});
 
  // Get code and exchange for token
  useEffect(() => {
    // Set connected to EHR flag if ?success=true
    let urlParams = new URLSearchParams(window.location.search);
    if(urlParams.get('success') === 'true') {
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
    fetch(`${baseUrl}/oauth/code`)
      .then(response => response.json())
      .then(data => {
        // Auth code has been retrieved on server
        // Exchange for token
        fetch(`${baseUrl}/oauth/token`)
          .then(response => response.json())
          .then(data => {
            // Token has been retrieved on server
            //Redirect to EHR auth page
            fetch(`${baseUrl}/api/connect-url`)
            .then(response => response.json())
            .then(data => {
              // Redirect to EHR auth page //
              window.location.href = data.url;
            })
            .catch(error => console.log(error));
          })
          .catch(error => {console.log(error)});
      })
    .catch(error => {console.log(error)});

    
  }

  const getPatient = () => {
    fetch(`${baseUrl}/api/patient`)
    .then(response => response.json())
    .then(data => {
      console.log(data.url);
      setPatientUrl(data.url);
    })
    .catch(error => console.log(error));
  }

  const getEverything = (url) => {
    // Send the url we've got
    const apiUrl = url === undefined ? `${baseUrl}/api/everything` 
    : `${baseUrl}/api/everything?url=${url}`;
    
    fetch(apiUrl)
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
          <Button onClick={ () => getPatient()}>Get Patient URL</Button>
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
