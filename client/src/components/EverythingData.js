import {useEffect, useState} from 'react';
import Entry from "./Entry";
import Links from "./Links";
import {Row, Button} from 'react-bootstrap';

function EverythingData(props) {
    
    useEffect(() => {
        
    }, [props]);

    return <>
        {props.entry != undefined && props.entry.length > 0 && props.entry.map((entry, index) => 
            <Entry key={index} entry={entry} />
        )}
        <Row>
            {props.link != undefined && props.total != undefined && 
            <Links link={props.link} total={props.total} getEverything={props.getEverything}/>}
            {props.link === undefined && <Button onClick={() => props.getEverything()}>First Page</Button>}
        </Row>
    </>
}

export default EverythingData;