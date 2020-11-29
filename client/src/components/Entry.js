import {Card, Table} from 'react-bootstrap';
import {useEffect, useState} from 'react';

function Entry(props) {
    const [resource, setResource] = useState({});
   

    return <>
        <Card>
            <Table>
                <tr><td>Full url: {props.entry.fullUrl}</td></tr>
                <tr><td dangerouslySetInnerHTML={{__html: props.entry.resource.text.div}}></td></tr>
            </Table>
        </Card>
    </>
}

export default Entry;