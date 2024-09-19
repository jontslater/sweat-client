import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import { getSingleWorkout } from '../../api/workout';
import { getAllTypes } from '../../api/type';
import {
  getSingleReflection, updateReflections, createReflection, deleteSingleReflection,
} from '../../api/reflection';

const WorkoutDetailsPage = () => {
  const [workout, setWorkout] = useState(null);
  const [workoutTypes, setWorkoutTypes] = useState([]);
  const [reflection, setReflection] = useState(null); // For displaying and editing existing reflection
  const [mood, setMood] = useState(0);
  const [notes, setNotes] = useState('');
  const [reflectionError, setReflectionError] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const [fetchedWorkout, fetchedTypes] = await Promise.all([
            getSingleWorkout(id),
            getAllTypes(),
          ]);
          setWorkout(fetchedWorkout);
          setWorkoutTypes(fetchedTypes);

          // Fetch the existing reflection for the workout (if it exists)
          const fetchedReflection = await getSingleReflection(id);
          if (fetchedReflection) {
            setReflection(fetchedReflection);
            setMood(fetchedReflection.mood);
            setNotes(fetchedReflection.notes);
          }
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [id]);

  const getWorkoutTypeName = (typeId) => {
    const type = workoutTypes.find((t) => t.id === typeId);
    return type ? type.type_name : 'Unknown';
  };

  const handleReflectionSubmit = async (e) => {
    e.preventDefault();
    const reflectionData = {
      workout: workout.id,
      mood,
      notes,
    };

    try {
      if (reflection) {
        console.log('Updating reflection with id:', reflection.id); // Debugging
        await updateReflections({ ...reflectionData, id: reflection.id });
        alert('Reflection updated successfully!');
      } else {
        console.log('Creating new reflection'); // Debugging
        await createReflection(reflectionData);
        alert('Reflection created successfully!');
        setReflection(reflectionData); // Update state to show the reflection after creation
      }
      setMood(0);
      setNotes('');
    } catch (error) {
      setReflectionError('Error saving reflection.');
      console.error('Error:', error);
    }
  };

  const handleDeleteReflection = async () => {
    if (reflection && reflection.id) {
      try {
        console.log('Deleting reflection with id:', reflection.id); // Debugging
        await deleteSingleReflection(reflection.id);

        // Reset reflection and form state after successful deletion
        setReflection(null); // Clear reflection from state
        setMood(0); // Reset mood input
        setNotes(''); // Reset notes input

        alert('Reflection deleted successfully!');
      } catch (error) {
        console.error('Error deleting reflection:', error);
      }
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Workout Details</h1>
      <p><strong>Date:</strong> {workout.date}</p>
      <p><strong>Duration:</strong> {workout.duration}</p>
      <p><strong>Intensity:</strong> {workout.intensity}</p>
      <p><strong>Type:</strong> {getWorkoutTypeName(workout.workout_type)}</p>

      <h2>Reflection</h2>

      {reflection ? (
        // Render reflection details if it exists
        <div>
          <p><strong>Mood:</strong> {reflection.mood}</p>
          <p><strong>Notes:</strong> {reflection.notes}</p>
          <Button variant="primary" onClick={() => setReflection(null)}>Edit Reflection</Button>
          <Button variant="danger" onClick={handleDeleteReflection}>Delete Reflection</Button>
        </div>
      ) : (
        // Render form to create or update a reflection
        <Form onSubmit={handleReflectionSubmit}>
          <Form.Group controlId="formMood">
            <Form.Label>Mood (1-10)</Form.Label>
            <Form.Control
              type="number"
              min="1"
              max="10"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formNotes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            />
          </Form.Group>

          {reflectionError && <p style={{ color: 'red' }}>{reflectionError}</p>}

          <Button variant="primary" type="submit">
            {reflection ? 'Update Reflection' : 'Create Reflection'}
          </Button>
        </Form>
      )}
    </div>
  );
};

export default WorkoutDetailsPage;
