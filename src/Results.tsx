import React, { useState, useEffect } from 'react';
import { Jump } from '../types/types';

const apiUrl = () => "http://127.0.0.1:9292"

const initialState = {
  jumps: [],
};

function Results() {
  const [state, setState] = useState(initialState);
  const jumps = state.jumps as Jump[];

  useEffect(() => {
    fetch(`${apiUrl()}/aggregated_results.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Response not OK');
        }
        return response.json();
      })
      .then(data => setState({ jumps: data }))
      .catch(error => console.error('Error with fetch:', error));
  }, []);

  return (
    <div id='results'>
      <table className='ResultsTable'>
        <thead>
          <tr>
            <th>Position</th>
            <th>Source</th>
            <th>Rider</th>
            <th>Height</th>
          </tr>
        </thead>
        <tbody>
          {
            jumps.map(jump => (
              <tr key={jump.position}>
                <td>{jump.position}</td>
                <td>{jump.source}</td>
                <td>{jump.name}</td>
                <td>{jump.height}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

export default Results;
