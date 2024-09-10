import { clientCredentials } from '../utils/client';

const getSingleWorkout = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/workouts/${id}.json`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createWorkout = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/workouts.json`, {
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

const updateWorkout = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/workouts/${payload.id}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteWorkout = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/workouts/${id}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => resolve({ message: 'Workout deleted' }))
    .catch(reject);
});

export {
  getSingleWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout,
};
