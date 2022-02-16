import { useState } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import Navbar from "./components/Navbar";
import People from './components/People';
import Planets from './components/Planets';

const queryClient = new QueryClient();

function App() {
  const [page, setPage] = useState('planets');

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <h1>Star Wars Info</h1>
        <Navbar setPage={setPage} />
        <div className='content'>
          { page === 'planets' ? <Planets /> : <People /> }
        </div>
      </QueryClientProvider>
    </div>
  );
}

export default App;
