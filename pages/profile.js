/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getUser } from '../api/user';
import { getProfile } from '../api/profile';

export default function Profile() {
  const [userDetails, setUserDetails] = useState({});
  const [profileDetails, setProfileDetails] = useState({});
  const [userAdded, setUserAdded] = useState(false);
  const [metricsExist, setMetricsExist] = useState(false);
  const router = useRouter();
  const { user } = useAuth();
  const { id } = router.query;

  const getAllUsers = () => {
    getUser(user.uid).then(setUserDetails);
    getProfile(user.id).then((profileData) => {
      setProfileDetails(profileData);
      setMetricsExist(!!profileData.age);
    });
  };

  useEffect(() => {
    getAllUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAddUserClick = () => {
    router.push('/user/new');
  };

  const handleEditUserClick = () => {
    router.push(`/user/edit/${userDetails?.id}`);
  };

  const handleAddMetricsClick = () => {
    router.push('/metrics/new');
  };

  const handleEditMetricsClick = () => {
    router.push(`/metrics/edit/${profileDetails?.id}`);
  };

  useEffect(() => {
    if (Object.keys(userDetails).length > 0) {
      setUserAdded(true);
    }
  }, [userDetails, profileDetails]);

  return (
    <Card style={{ width: '30rem' }}>
      <Card.Body>
        {!userAdded ? (
          <Button
            variant="info"
            className="action-button"
            onClick={handleAddUserClick}
          >
            Add User
          </Button>
        ) : (
          <Button
            variant="warning"
            className="action-button"
            onClick={handleEditUserClick}
          >
            Edit User
          </Button>
        )}
        <div />
        {!metricsExist ? (
          <Button
            variant="info"
            className="action-button"
            onClick={handleAddMetricsClick}
          >
            Add Metrics
          </Button>
        ) : (
          <Button
            variant="warning"
            className="action-button"
            onClick={handleEditMetricsClick}
          >
            Edit Metrics
          </Button>
        )}
        <div>
          <img
            src={user?.photoURL}
            className="proPic"
            alt="user"
            style={{ width: '112.5px', height: '112.5px', borderRadius: '50%' }}
          />
        </div>
        <p>User Name: {userDetails?.username}</p>
        <p>Email: {userDetails?.email}</p>
        <p>Age: {profileDetails.age}</p>
        <p>Gender: {profileDetails.gender}</p>
        <p>Weight: {profileDetails.weight}lbs</p>
        <p>Height: {profileDetails.height}in</p>
        <p>Goal: {profileDetails.goal}</p>
      </Card.Body>
    </Card>
  );
}
