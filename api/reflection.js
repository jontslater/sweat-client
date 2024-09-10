import { clientCredentials } from '../utils/client';

const getSingleReflection = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reflections/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// const getAllReflections = (id) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/reflections/${id}`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then(resolve)
//     .catch(reject);
// });

const deleteSingleReflection = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reflections/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

const updateReflections = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reflections/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(resolve)
    .catch(reject);
});

const createReflection = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reflections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getSingleReflection, deleteSingleReflection, updateReflections, createReflection,
};
