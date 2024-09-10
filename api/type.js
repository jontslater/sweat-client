import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSingleType = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/types/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getAllTypes = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/types`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createType = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/types`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateType = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/types/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteSingleType = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/types/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getSingleType, getAllTypes, createType, updateType, deleteSingleType,
};
