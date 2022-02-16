import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async ({ queryKey }) => {
  const [_key, page] = queryKey;
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

function Planets() {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(['planets', page], fetchPlanets, {
    staleTime: 0,
    // cacheTime: 10,
    onSuccess: () => console.log('data fetched successfully'),
    keepPreviousData: true,
  });

  return (
    <div>
      <h2>Planets</h2>
      
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
            {data.results.map(planet => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Planets;