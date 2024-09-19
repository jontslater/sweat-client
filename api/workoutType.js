import { clientCredentials } from '../utils/client';

const getSingleWorkoutType = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/workouttypes/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getAllWorkoutTypes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/workouttypes`)
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const createWorkoutType = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/workouttypes`, {
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

const deleteWorkoutType = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/workouttypes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => resolve({ message: 'WorkoutType deleted' }))
    .catch(reject);
});

export {
  getSingleWorkoutType,
  getAllWorkoutTypes,
  createWorkoutType,
  deleteWorkoutType,
};
