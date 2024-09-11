/**
 * @author Naren
 * @description This component fetches user data from a backend API and displays it in a structured format. 
 * It handles the loading state, errors, and displays user information including their username, email, 
 * current balance, and blocklist status.
 */

import React, { useEffect, useState } from 'react';

// FetchingUserData component to retrieve and display user information
export default function FetchingUserData() {
  // State to store the fetched user data
  const [users, setUsers] = useState([]);
  // State to handle loading indicator while fetching the data
  const [loading, setLoading] = useState(true);
  // State to handle potential errors during data fetching
  const [error, setError] = useState(null);
  
  const url = "http://localhost:9090/api/users"; // API endpoint to fetch user details

  // useEffect hook to fetch user data from the API on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Fetching user data from the backend API
        let response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        // If the response is not OK, throw an error
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        // Parsing the response data as JSON
        let data = await response.json();
        console.log(data); // Optional: Log data for debugging purposes
        setUsers(data); // Updating the state with fetched user data
      } catch (error) {
        setError(error); // Handling errors if the fetch fails
      } finally {
        setLoading(false); // Stop loading once data is fetched or error occurs
      }
    };

    fetchUsers(); // Invoke the function to fetch user data
  }, []); // Empty dependency array ensures it runs only once on mount

  // If data is still loading, display a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there is an error, display an error message
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // If data is successfully fetched, render the user details
  return (
    <div className='get-data-container'>
      <h1 className='get-data-title'>All Users:</h1>
      <ul className="get-data-container">
        {users.map((user, index) => (
          <li key={user.id} className="card">
            {/* Circle containing the user's ID */}
            <div className="circle">
              <h2>{user.id}</h2> {/* Displaying user ID */}
            </div>

            <div className="content">
              {/* Displaying user's username */}
              <p>Username: <strong className='user-data-label'>{user.username}</strong></p>
              {/* Displaying user's email */}
              <p>Email: <strong className='user-data-label'>{user.email}</strong></p>
              {/* Displaying user's current balance */}
              <p>Current Balance: <strong className='user-data-label'>{user.currentBalance}</strong></p>
              {/* Displaying whether the user is blocklisted */}
              <p>Blocklist Status: 
                <strong className='user-data-label'>
                  {user.isBlockeListed ? "Yes" : "No"}
                </strong>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
