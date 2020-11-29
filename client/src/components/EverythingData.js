import {useEffect, useState} from 'react';
import Entry from "./Entry";
import Links from "./Links";

function EverythingData(props) {
    
    useEffect(() => {
        console.log(props);
    }, [props]);

    return <>
        {props.entry != undefined && props.entry.length > 0 && props.entry.map((entry, index) => 
            <Entry key={index} entry={entry} />
        )}
        {/* {props.link != undefined && <Links link={props.link} getEverything={props.getEverything}/>} */}
    </>
}

export default EverythingData;