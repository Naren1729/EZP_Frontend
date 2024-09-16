import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function FetchingUserData() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editUser, setEditUser] = useState(null); // State to manage editing
  const [formData, setFormData] = useState({}); // State to manage form data
  const apiUrl = process.env.REACT_APP_API_URL; // API endpoint to fetch transaction details

  // Function to fetch user data
  const fetchUsers = async () => {
    try {
      let response = await fetch(`${apiUrl}/users`, {
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

  // Function to handle user deletion
  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`${apiUrl}/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the user');
      }

      console.log('User deleted successfully');
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      console.error('There was an error deleting the user!', error);
    }
  };

  // Function to handle user edit
  const handleEdit = (user) => {
    setEditUser(user);
    setFormData({
      id: user.id,
      username: user.username,
      email: user.email,
      currentBalance: user.currentBalance,
      isBlockeListed: user.isBlockeListed,
    });
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setEditUser(null);
    setFormData({});
  };

  // Function to handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Ensure formData.id is treated as a Long
      const response = await fetch(`${apiUrl}/users/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          currentBalance: parseFloat(formData.currentBalance),
          isBlockeListed: formData.isBlockeListed === 'true', // Convert to boolean
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update the user');
      }

      console.log('User updated successfully');
      setUsers(users.map(user => user.id === formData.id ? {
        ...user,
        username: formData.username,
        email: formData.email,
        currentBalance: parseFloat(formData.currentBalance),
        isBlockeListed: formData.isBlockeListed === 'true',
      } : user));
      handleCloseModal();
    } catch (error) {
      console.error('There was an error updating the user!', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []); // Empty dependency array to ensure it only runs once on component mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='get-data-container'>
      <h1 className='get-data-title'>All Users:</h1>
        <ul className="get-data-container">
          {users.map((user) => (
            <li key={user.id} className="card">
              {/* Icon container for Edit and Delete */}
              <div className="circle">
                <div className="edit-delete">
                  <ul className="icon-container">
                    <li className="edit-icon" onClick={() => handleEdit(user)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </li>
                    <li className="delete-icon" onClick={() => handleDelete(user.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </li>
                  </ul>
                </div>
                <h2>{user.id}</h2>
              </div>
              <div className="content">
                <p>Username:<strong className='user-data-label'>{user.username}</strong> </p>
                <p>Email:<strong className='user-data-label'> {user.email}</strong></p>
                <p>Current Balance:<strong className='user-data-label'>{user.currentBalance}</strong> </p>
                <p>Blocklist Status:<strong className='user-data-label'>{user.isBlockeListed ? "Yes" : "No"}</strong></p>
              </div>
            </li>
          ))}
        </ul>

      {editUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={handleCloseModal}>X</button>
            <h2>Edit User</h2>
            <form onSubmit={handleSave} className='modal-form'>
              <label>
                Username:
                <input
                className='modal-input'
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>
              <label>
                Email:
                <input
                className='modal-input'
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
              <label>
                Current Balance:
                <input
                  className='modal-input'
                  type="number"
                  name="currentBalance"
                  value={formData.currentBalance}
                  onChange={handleChange}
                />
              </label>
              <label>
                Blocklist Status:
                <select
                  name="isBlockeListed"
                  value={formData.isBlockeListed}
                  onChange={handleChange}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </label>
              <button className='modal-button' type="submit">Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}