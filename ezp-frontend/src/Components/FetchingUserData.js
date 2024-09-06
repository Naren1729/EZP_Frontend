import React, { useEffect, useState } from 'react';

export default function FetchingUserData() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const url = "http://localhost:9090/api/users";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        let data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='get-data-container'>
      <h1 className='get-data-title'>All Users:</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <div className="get-data-container">
          {users.map((transaction, index) => (
          
            <div className="card">
              <div class="circle">
                <h2>{transaction.id}</h2>
              </div>
              <div class="content">
                <p>Username:<strong className='user-data-label'>{transaction.username}</strong> </p>
                <p>Password:<strong className='user-data-label'> {transaction.password}</strong></p>
                <p>Email:<strong className='user-data-label'> {transaction.email}</strong></p>
                <p>Current Balance:<strong className='user-data-label'>{transaction.currentBalance}</strong> </p>
             </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
