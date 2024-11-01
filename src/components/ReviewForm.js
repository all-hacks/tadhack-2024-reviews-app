// ReviewForm.js

import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_PEOPLE = gql`
  query (
	$includedType: B2cConnectionType
	$excludedType: B2cConnectionType
	$limit: Int
  ) {
	b2cConnections (
  	includedType: $includedType
  	excludedType: $excludedType
  	limit: $limit
	) {
  	id
  	type
  	insertedAt
  	updatedAt
  	startedAt
  	company {
    	id
        legalName
  	}
  	connectedUser {
    	id
        firstName
        lastName
        username
  	}

	}
  }
`;


const ReviewForm = ({ onAddReview }) => {
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  let customers = data.b2cConnections.map((conn) => {
    return conn.connectedUser.firstName + ' ' + conn.connectedUser.lastName;
  });

//	console.log('cust', customers);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.values(customers).find(val => val === author)) {
    const newReview = {
      author,
      comment,
      rating
    };
    onAddReview(newReview);
    setAuthor('');
    setComment('');
    setRating(0);
    } else {
    alert("You must be a connected person to submit a review!");
    }
  };

  return (
    <div>
    <h2>Submit a Review</h2>
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Your Name" 
        value={author} 
        onChange={(e) => setAuthor(e.target.value)} 
      />
      <textarea 
        placeholder="Write your review..." 
        value={comment} 
        onChange={(e) => setComment(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Rating (1-5)" 
        min="1" 
        max="5" 
        value={rating} 
        onChange={(e) => setRating(parseInt(e.target.value))} 
      />
      <button type="submit">Submit Review</button>
    </form>
    </div>
  );
};

export default ReviewForm;
