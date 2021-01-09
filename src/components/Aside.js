import Form from './Form.js';

function Aside(props) {
    return (
        <aside>
            <h1><span>What'd you think</span></h1>
            <Form handleSubmit={props.handleSubmit}/>
        </aside>
    );
}

export default Aside;
