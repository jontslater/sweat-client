/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import ProfileForm from '../../../forms/profileForm';
import { getSingleProfile } from '../../../api/profile';

export default function EditMetrics() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getSingleProfile(id).then(setEditItem);
  }, [id]);

  return (<ProfileForm profileObj={editItem} />);
}
