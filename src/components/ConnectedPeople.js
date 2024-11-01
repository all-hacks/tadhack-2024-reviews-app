// src/components/PostList.js
import React from 'react';
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

function ConnectedPeople() {
  const { loading, error, data } = useQuery(GET_PEOPLE);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Connected People</h2>
      <ul style={{listStyleType: 'none'}}>
        {data.b2cConnections.map((conn) => (
          <li key={conn.id}>
            company <strong>{conn.company.legalName}</strong> <br/>
	    {conn.connectedUser.username}: <strong>{conn.connectedUser.firstName} {conn.connectedUser.lastName}</strong> <br/>
	    type <strong>{conn.type}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ConnectedPeople;
