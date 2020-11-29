import {Button} from 'react-bootstrap';

function Links(props) {
    
    return <>
        <Button onClick={props.getEverything(props.link[0])}>Previous</Button>
        <Button onClick={props.getEverything(props.link[1])}>Next</Button>
    </>
}

export default Links;