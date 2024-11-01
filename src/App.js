//App.js
import React, { useRef, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './client';
import './App.css';
import ReviewForm from './components/ReviewForm';
import ReviewList from './components/ReviewList';
import ConnectedPeople from './components/ConnectedPeople';
import Companies from './components/Companies';

function App() {
  const [reviews, setReviews] = useState([]);

  const handleAddReview = (review) => {
    setReviews([...reviews, review]);
  };

  return (
    <ApolloProvider client={client}>
    <div className="App">
      <h1>Reviews and Ratings</h1>
      <Companies name="akasia"/>
      <ConnectedPeople />
      <ReviewForm onAddReview={handleAddReview} />
      <ReviewList reviews={reviews} />
    </div>
    </ApolloProvider>
  );
}

export default App;
