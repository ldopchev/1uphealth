import {useEffect, useState} from 'react';
import Entry from "./Entry";
import Links from "./Links";
import {Row} from 'react-bootstrap';

function EverythingData(props) {
    
    useEffect(() => {
        // console.log(props);
    }, [props]);

    return <>
        {props.entry != undefined && props.entry.length > 0 && props.entry.map((entry, index) => 
            <Entry key={index} entry={entry} />
        )}
        <Row>
            {props.link != undefined && <Links link={props.link} getEverything={props.getEverything}/>}
        </Row>
    </>
}

export default EverythingData;