import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../api/user';

function UsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Failed to load users: {error.message}</p>;

  return (
    <div>
      <h1>All Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username} - {user.email} - {user.id}</li>
        ))}
      </ul>
    </div>
  );
}

export default UsersList;
