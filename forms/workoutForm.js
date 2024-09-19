import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router'; // Import useRouter
import { createWorkout } from '../api/workout';
import { getUserByUid } from '../api/user';
import { getAllTypes } from '../api/type';

const WorkoutForm = ({ user }) => {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [intensity, setIntensity] = useState('');
  const [date, setDate] = useState('');
  const [workoutType, setWorkoutType] = useState('');
  const [workoutTypes, setWorkoutTypes] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const intervalRef = useRef(null);

  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    getAllTypes().then(setWorkoutTypes);

    getUserByUid(user.uid)
      .then((fetchedUser) => {
        setUserDetails(fetchedUser);
      })
      .catch((error) => console.error('Error fetching user details:', error));
  }, [user?.uid]);

  const startTimer = () => {
    if (!isActive) {
      setIsActive(true);
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (isActive) {
      setIsActive(false);
      clearInterval(intervalRef.current);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userDetails) {
      console.error('User details not available yet.');
      return;
    }

    const workoutData = {
      user: userDetails.id,
      duration: `00:00:${time.toString().padStart(2, '0')}`,
      intensity: parseInt(intensity, 10),
      date,
      workout_type: parseInt(workoutType, 10),
      reflections: [],
    };
    console.log(workoutData);

    createWorkout(workoutData)
      .then(() => {
        console.log('Workout created successfully!');
        router.push('/workoutPage'); // Redirect to /workoutPage after successful submission
      })
      .catch((error) => console.error('Error creating workout:', error));
  };

  return (
    <div>
      <div>
        <h2>Timer: {time} seconds</h2>
      </div>
      <div>
        <button type="button" onClick={startTimer}>Start</button>
        <button type="button" onClick={stopTimer}>Stop</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="intensity">Intensity</label>
          <input
            type="number"
            id="intensity"
            value={intensity}
            onChange={(e) => setIntensity(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="workoutType">Workout Type</label>
          <select
            id="workout_type"
            value={workoutType}
            onChange={(e) => setWorkoutType(e.target.value)}
            required
          >
            <option value="">Select a workout type</option>
            {workoutTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.type_name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

WorkoutForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
  }),
};

WorkoutForm.defaultProps = {
  user: null,
};

export default WorkoutForm;
