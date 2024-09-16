import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { createProfile, getSingleProfile, updateProfile } from '../api/profile';

const initialState = {
  id: '',
  age: '',
  gender: '',
  weight: '',
  height: '',
  goal: '',
};

const ProfileForm = ({ profileObj }) => {
  const [formData, setFormData] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (profileObj?.id) {
          setFormData({
            id: profileObj.id,
            age: profileObj.age || '',
            gender: profileObj.gender || '',
            weight: profileObj.weight || '',
            height: profileObj.height || '',
            goal: profileObj.goal || '',
          });
        } else if (user?.id) {
          const profileData = await getSingleProfile(user.id);
          if (profileData) {
            setFormData(profileData);
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfileData();
  }, [profileObj, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Payload being sent:', formData);

    try {
      if (formData.id) {
        await updateProfile(formData.id, formData);
      } else if (user?.id) {
        await createProfile({ ...formData, user: user.id });
      }

      router.push('/profile');
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  return (
    <div className="profile-form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formAge">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            placeholder="Enter your Age"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            placeholder="Enter your Gender"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formWeight">
          <Form.Label>Weight</Form.Label>
          <Form.Control
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
            placeholder="Enter your Weight"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formHeight">
          <Form.Label>Height</Form.Label>
          <Form.Control
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
            placeholder="Enter your Height"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGoal">
          <Form.Label>Goal</Form.Label>
          <Form.Control
            type="text"
            name="goal"
            value={formData.goal}
            onChange={handleChange}
            required
            placeholder="Enter your Goal"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          {formData.id ? 'Update' : 'Create'} Profile
        </Button>
      </Form>
    </div>
  );
};

ProfileForm.propTypes = {
  profileObj: PropTypes.shape({
    id: PropTypes.number,
    age: PropTypes.number,
    gender: PropTypes.string,
    weight: PropTypes.number,
    height: PropTypes.number,
    goal: PropTypes.string,
  }),
};

ProfileForm.defaultProps = {
  profileObj: initialState,
};

export default ProfileForm;
