/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import UserForm from '../../../forms/userForm';
import { getUser } from '../../../api/user';

export default function EditUser() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getUser(id).then(setEditItem);
  }, [id]);

  return (<UserForm obj={editItem} />);
}
