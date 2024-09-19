import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Container, ListGroup } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getUser } from '../api/user';
import { getAllWorkouts, deleteWorkout } from '../api/workout'; // import deleteWorkout function
import { getAllTypes } from '../api/type';

const WorkoutPage = () => {
  const [userDetails, setUserDetails] = useState({});
  const [workouts, setWorkouts] = useState([]);
  const [workoutTypes, setWorkoutTypes] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const handleNewWorkoutClick = () => {
    router.push('/workout/new');
  };

  const handleDeleteWorkout = async (workoutId) => {
    if (window.confirm('Are you sure you want to delete this workout?')) {
      try {
        await deleteWorkout(workoutId); // Call the delete API
        setWorkouts((prevWorkouts) => prevWorkouts.filter((workout) => workout.id !== workoutId)); // Remove the workout from the state
      } catch (error) {
        console.error('Error deleting workout:', error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, typesData] = await Promise.all([
          getUser(user.uid),
          getAllTypes(),
        ]);
        setUserDetails(userData);
        setWorkoutTypes(typesData);

        const workoutData = await getAllWorkouts(userData.id);
        setWorkouts(workoutData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user.uid]);

  const getWorkoutTypeName = (typeId) => {
    const type = workoutTypes.find((t) => t.id === typeId);
    return type ? type.type_name : 'Unknown';
  };

  return (
    <>
      <Container>
        <h2>{userDetails.username ? `${userDetails.username}'s Workouts` : 'Your Workouts'}</h2>
        <Button onClick={handleNewWorkoutClick} variant="primary">
          New Workout
        </Button>
      </Container>

      <Container>
        {workouts.length > 0 ? (
          <ListGroup>
            {workouts.map((workout) => (
              <ListGroup.Item key={workout.id}>
                <p><strong>Date:</strong> {workout.date}</p>
                <p><strong>Duration:</strong> {workout.duration}</p>
                <p><strong>Intensity:</strong> {workout.intensity}</p>
                <p><strong>Type:</strong> {getWorkoutTypeName(workout.workout_type)}</p>
                <Link href={`/workout/${workout.id}`} passHref>
                  <Button id="viewButton" variant="primary" className="m-2">
                    VIEW
                  </Button>
                </Link>
                <Link href={`/workout/edit/${workout.id}`} passHref>
                  <Button id="editButton" variant="secondary" className="m-2">
                    EDIT
                  </Button>
                </Link>
                <Button
                  id="deleteButton"
                  variant="danger"
                  className="m-2"
                  onClick={() => handleDeleteWorkout(workout.id)} // Add the delete handler
                >
                  DELETE
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p>No workouts found.</p>
        )}
      </Container>
    </>
  );
};

export default WorkoutPage;
