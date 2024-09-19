import { clientCredentials } from '../utils/client';

const getSingleWorkout = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/workouts/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getAllWorkouts = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/workouts?users=${uid}`, {
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
  console.log('Payload being sent:', payload); // Log the payload before sending

  fetch(`${clientCredentials.databaseURL}/workouts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      console.log('Response status:', response.status); // Log the response status
      return response.json().then((data) => {
        console.log('Response data:', data); // Log the response data
        return { status: response.status, data }; // Return an object with status and data
      });
    })
    .then(({ status, data }) => {
      if (status >= 200 && status < 300) {
        resolve(data); // Resolve the promise with the data if status is OK
      } else {
        reject(new Error(`Request failed with status ${status}`)); // Reject with error message
      }
    })
    .catch((error) => {
      console.error('Fetch error:', error); // Log any fetch errors
      reject(error); // Reject the promise with the error
    });
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
