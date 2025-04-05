import React, { useState, useEffect } from 'react';

const DPCount = ({ 
  onIncrementReady,
  name = '',
 }) => {
  const [dpCount, setDpCount] = useState(0);

  // Fetch the current DP count
  const fetchDpCount = async () => {
    try {
      const response = await fetch('https://bitooqoh-server.onrender.com/api/v1/user_dp');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      // Extract the count from the response
      const count = data.results; // Ensure this matches your API response
      console.log('Fetched DP count:', count); // Debugging log
      setDpCount(count);
    } catch (error) {
      console.error('Failed to fetch DP count:', error);
    }
  };

  // Increment the DP count via the backend
  const incrementDpCount = async (name) => {
    console.log('i am name', name);
    try {
      const response = await fetch('https://bitooqoh-server.onrender.com/api/v1/user_dp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }), // Send the name as payload
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      // Extract the count from the response
      const count = data.results; // Ensure this matches your API response
      console.log('Incremented DP count:', count); // Debugging log
      setDpCount(count);
    } catch (error) {
      console.error('Failed to increment DP count:', error);
    }
  };

  useEffect(() => {
    fetchDpCount(); // Fetch the count when the component mounts

    // Pass the increment function to the parent component
    if (onIncrementReady) {
      onIncrementReady(incrementDpCount);
    }
  }, [onIncrementReady]); // Dependency array includes onIncrementReady

  return (
    <div className="mt-4">
      {/* <h3 className="text-lg font-semibold">Total DPs Created:</h3>
      <p className="text-lg">{dpCount}</p> */}
    </div>
  );
};

export default DPCount;
