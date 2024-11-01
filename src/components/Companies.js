// src/components/PostList.js
import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_COMPANIES = gql`
  query (
	$name: String
	$taxId: String
	$email: String
	$telephoneNumber: String
	$webpage: String
	$limit: Int
  ) {
	companies (
  	name: $name
  	taxId: $taxId
  	email: $email
  	telephoneNumber: $telephoneNumber
  	webpage: $webpage
  	limit: $limit
	) {
  	id
  	legalName
  	brandName
  	profileName
  	taxId
    metadata
    yearFounded
    aboutUs
	}
  }
`;

function Companies({ name }) {
  const { loading, error, data } = useQuery(GET_COMPANIES, { variables: { name } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Companies</h2>
      <ul style={{listStyleType: 'none'}}>
        {data.companies.map((company) => (
          <li key={company.id}>
            brand name: <strong>{company.brandName}</strong> <br/>
            legal name: <strong>{company.legalName}</strong> <br/>
            profile name: <strong>{company.profileName}</strong> <br/>
            year founded: <strong>{company.yearFounded}</strong> <br/>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Companies;
