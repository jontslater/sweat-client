import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getProfile = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles?uid=${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const profiles = Object.values(data);
      resolve(profiles.length ? profiles[0] : null);
    })
    .catch(reject);
});

const getAllProfiles = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleProfile = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createProfile = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles`, {
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

const updateProfile = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/profiles/${id}`, {
    method: 'PUT',
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
  getProfile, createProfile, updateProfile, getSingleProfile, getAllProfiles,
};
