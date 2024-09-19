/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleWorkout } from '../../../api/workout';
import WorkoutForm from '../../../forms/workoutForm';

export default function EditUser() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getSingleWorkout(id).then(setEditItem);
  }, [id]);

  return (<WorkoutForm obj={editItem} />);
}
