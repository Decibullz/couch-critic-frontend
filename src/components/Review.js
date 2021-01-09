import { useState } from "react";
import Form from "./Form";


//  add props when ready
function Review(props) {

    const[formVisible, setFormVisible]=useState(false);

    function toggleForm(){
        setFormVisible(!formVisible)
    }

    function handleUpdate(event,form){
        toggleForm()
        props.handleUpdate(event,form)
    }

    return (
        <>
        {
        formVisible ?
        <div>
            <Form review={props.review} handleSubmit={handleUpdate}/>
            <button onClick={toggleForm}>Cancel</button>
        </div> 
    
        :
        <div className="form">
            <h3>{props.review.title}</h3>
            <img src={`${props.review.image}`} alt=""/>   
            <p>Rating:{props.review.rating}</p>
            <p>Review:{props.review.review}</p>
            <p>Where to Watch:{props.review.watch}</p>
    
            <button class= "myButton" onClick={()=> props.handleDelete(props.review)}>Delete</button>
            <button class= "myButton" onClick={toggleForm}>Edit</button>
        </div>
        }
        </>
    );
}

export default Review;