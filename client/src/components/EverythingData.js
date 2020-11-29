import {useEffect, useState} from 'react';
import Entry from "./Entry";

function EverythingData(props) {
    
    useEffect(() => {
        console.log(props);
    }, [props]);

    return <>
        {props.entry != undefined && props.entry.length > 0 && props.entry.map((entry, index) => 
            <Entry key={index} entry={entry} />
        )}
    </>
}

export default EverythingData;