import React, { useState, useEffect } from 'react';
import { Jump } from '../types/types';

const initialState = {
  results: [],
};

function Results() {
  const [state, setState] = useState(initialState);
  const results = state.results as Jump[];

  useEffect(() => {
    fetch('aggregated_results.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Response not OK');
        }
        return response.json();
      })
      .then(data => setState({ results: data }))
      .catch(error => console.error('Error with fetch:', error));
  }, []);

  return (
    <div id='results'>
      <table className='ResultsTable'>
        <thead>
          <tr>
            <th>Source</th>
            <th>Rider</th>
            <th>Height</th>
          </tr>
        </thead>
        <tbody>
          {
            results.map(r => (
              <tr key={`${r.source}-${r.name}-${r.height}`}>
                <td>{r.source}</td>
                <td>{r.name}</td>
                <td>{r.height}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Results;
