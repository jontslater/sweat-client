import { clientCredentials } from '../utils/client';

const baseURL = clientCredentials.databaseURL;

const getAllUsers = () => fetch(`${baseURL}/users`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error fetching users:', error);
    throw error;
  });

const getUser = (id) => new Promise((resolve, reject) => {
  fetch(`${baseURL}/users/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getUserByUid = (uid) => new Promise((resolve, reject) => {
  fetch(`${baseURL}/users/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => {
      console.error('Error fetching user by UID:', error);
      reject(error);
    });
});

const createUser = (payload) => fetch(`${baseURL}/users`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error creating user:', error);
    throw error;
  });

const updateUser = (id, payload) => fetch(`${baseURL}/users/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error updating user:', error);
    throw error;
  });

export {
  createUser,
  updateUser,
  getAllUsers,
  getUser,
  getUserByUid,
};
