import {useEffect} from 'react';
import {Button} from 'react-bootstrap';
import {Col} from 'react-bootstrap'

function Links(props) {

    useEffect(() => {
        // Paginator returns the current page, not the previous
        // Here we grab the skip number and subtract 10 to get the previous
        // page or the first page if that number is 0
        let matches = props.link[0].url.match(/\d+$/);
        if(matches !== null) {
            let page = matches[0] - 10;
           
            if(page !== 0) {
                props.link[0].url = props.link[0].url.replace(/\d+$/, page.toString());
            } else {
                props.link[0].url = props.link[0].url.replace(/_skip=\d+$/, "");
            }
        }
       
    }, [props]);

    return <>
        <Col><Button onClick={() => props.getEverything(props.link[0].url)}>Previous</Button></Col>
        <Col><Button onClick={() => props.getEverything(props.link[1].url)}>Next</Button></Col>
    </>
}

export default Links;