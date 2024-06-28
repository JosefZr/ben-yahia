import ReactStars from "react-rating-stars-component";
import React from "react";

export default function Stars({ setRating ,size}){
    const ratingChanged = (newRating) => {
        console.log(newRating);
        setRating(newRating); // Update the rating in the parent component
    };
    return(
        <ReactStars
            count={5}
            onChange={ratingChanged}
            size={size}
            isHalf={false}
            emptyIcon={<i className="far fa-star"></i>}
            halfIcon={<i className="fa fa-star-half-alt"></i>}
            fullIcon={<i className="fa fa-star"></i>}
            activeColor="#ffd700"
        />
    );
}

