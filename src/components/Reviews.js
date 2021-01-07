import Review from './Review.js';

//  add  reviews, handleDelete, handleUpdate  when ready as props

function Reviews({reviews, handleDelete, handleUpdate}) {
    return (
        <div>
            {reviews.map(review => 
                <Review 
                    key={review.id} 
                    review={review}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                />
            )} 
        </div>
    );
}

export default Reviews;