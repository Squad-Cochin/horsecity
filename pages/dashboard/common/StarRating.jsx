///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                                  File for showing the star ratings                                //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

// components/StarRating.js
import React from 'react';
import { BsStarFill } from 'react-icons/bs';

// Function for star rating
function StarRating({ value, onChange }) {
    return (
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= value ? 'star-filled' : 'star-unfilled'}
              onClick={() => onChange(star)}
            >
              <BsStarFill />
            </span>
          ))}
        </div>
      );
}

export default StarRating;
