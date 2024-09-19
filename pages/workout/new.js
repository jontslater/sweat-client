import React from 'react';
import WorkoutForm from '../../forms/workoutForm';
import { useAuth } from '../../utils/context/authContext';

export default function AddWorkout() {
  const { user } = useAuth();

  return (
    <div>
      <WorkoutForm user={user} />
    </div>
  );
}
