import { useState, useEffect } from 'react';
import Input from './Input.js';

function Form(props) {
    const [formState, setFormState] = useState({
        title:'',
        image:'',
        rating:'',
        review:'',
        watch:'',
    });

    useEffect(()=>{
        if(props.review){
            setFormState({
                title: props.review.title,
                image: props.review.image,
                rating: props.review.rating,
                review: props.review.review,
                watch: props.review.watch,
                id: props.review.id,
            })
        }
    },[props.review])

    function handleChange(event) {
        setFormState(prevState => ({
        ...prevState,
        [event.target.id] : event.target.value
        }));
    }

    function handleSubmit(event){
        event.preventDefault();
        if(props.review) formState.id=props.review.id
        props.handleSubmit(event, formState);
    }
    return (
        <form className="container" onSubmit={handleSubmit}>
            <div className="review">
            <Input
                handleChange={handleChange}
                name="title"
                placeholder="Title"
                type="text"
                value={formState.title}
                id="title"
            />


            <Input
                handleChange={handleChange}
                name="image"
                placeholder="Image Link"
                type="text"
                value={formState.image}
                id="image"
            />
            <Input
                handleChange={handleChange}
                name="rating"
                placeholder="Rating"
                type="select"
                value={formState.rating}
                id="rating"
            />

          
                <Input
                    handleChange={handleChange}
                    name="watch"
                    placeholder="Where to watch"
                    type="text"
                    value={formState.watch}
                    id="watch"
                />
            

            <Input
                handleChange={handleChange}
                name="review"
                placeholder="Review"
                type="text-area"
                value={formState.review}
                id="review"
                />

                </div>

            <input className= "myButton" type="submit" value={props.review ? 'Edit review' : 'Add review'}/>
        </form>
    );
}

export default Form;
