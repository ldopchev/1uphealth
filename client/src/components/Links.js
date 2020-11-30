import {useEffect, useState} from 'react';
import {Button} from 'react-bootstrap';
import {Col} from 'react-bootstrap'

function Links(props) {
    const [previousPage, setPrevious] = useState("");
    const [total, setTotal] = useState("");

    useEffect(() => {
        
        // Paginator returns the current page, not the previous
        // Here we grab the skip number and subtract 10 to calculate the previous
        // page or the first page if the calculated page is 0
        let matches = props.link[0].url.match(/\d+$/);
        let totalRecords = props.link[1].url.match(/\d+$/);
        if(matches !== null) {
            let page = matches[0] - 10;
           
            if(page !== 0) {
                setPrevious(props.link[0].url.replace(/\d+$/, page.toString()));
            } else {
                setPrevious(props.link[0].url.replace(/\?_skip=\d+$/, ""));
            }
        }

        if(totalRecords !== null) {
            setTotal(totalRecords);
        }
       
    }, [props]);

    return <>
        <Col className={3}><Button onClick={() => props.getEverything(previousPage)}>Previous</Button></Col>
        <Col className={3}><Button onClick={() => props.getEverything(props.link[1].url)}>Next</Button></Col>
        <Col className={6}><div>Total {total} of {props.total}</div></Col>
    </>
}

export default Links;