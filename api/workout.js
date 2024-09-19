import { clientCredentials } from '../utils/client';

const getSingleWorkout = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/workouts/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getAllWorkouts = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/workouts?users=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createWorkout = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/workouts`, {
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
  fetch(`${clientCredentials.databaseURL}/workouts/${payload.id}`, {
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
  fetch(`${clientCredentials.databaseURL}/workouts/${id}`, {
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
  getAllWorkouts,
};
