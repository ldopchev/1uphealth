import {Card, Table} from 'react-bootstrap';
import {useEffect, useState} from 'react';

function Entry(props) {
    const [resource, setResource] = useState({});

    const flattenObject = (object, objectHolder) => {
        
        for(let property in object) {
            if(object[property] instanceof  Object) {
                flattenObject(object[property], objectHolder);
            } 
            else { 
                objectHolder[property] = object[property];
            }
        }


    }
    
    useEffect(() => {
        let objectHolder = {};
        // Flatten Object and display results.
        flattenObject(props.entry.resource, objectHolder);
        
        setResource(objectHolder);
    }, [props])

    return <>
        <Card>
            <Table>
                {Object.keys(resource).map(key => {
                    return <tr><td>{key} : {resource[key]}</td></tr>
                })}
            </Table>
        </Card>
    </>
}

export default Entry;