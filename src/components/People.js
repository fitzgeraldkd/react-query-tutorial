import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Person from './Person';

const fetchPeople = async ({ queryKey }) => {
  const [_key, page] = queryKey;
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  return res.json();
};

function People() {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(['people', page], fetchPeople, {
    keepPreviousData: true,
  });

  return (
    <div>
      <h2>People</h2>
      
      {status === 'loading' && (
        <div>Loading data...</div>
      )}
      {status === 'error' && (
        <div>Error fetching data</div>
      )}
      {status === 'success' && (
        <>
          <button onClick={() => setPage(currentPage => Math.max(1, currentPage - 1))} disabled={page===1}>
            Previous Page
          </button>
          <span>{page}</span>
          <button onClick={() => setPage(currentPage => (!data || !data.next ? currentPage : currentPage + 1))} disabled={!data || !data.next}>
            Next Page
          </button>
          <div>
            {data.results.map(person => (
              <Person key={person.name} person={person} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default People;