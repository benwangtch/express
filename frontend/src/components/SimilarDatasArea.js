import React from 'react';

const SimilarDatasArea = ({ similarData }) => {
  return (
    <div className="similar-data-area">
      <h2>Similar Datas</h2>
      <ul>
        {similarData.map((data) => (
          <li key={data.id}>
            {/* Display relevant information from similar data */}
            {JSON.stringify(data)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SimilarDatasArea;
