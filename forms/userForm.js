import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import {
  createUser,
  updateUser,
  getUser,
  getUserByUid,
} from '../api/user'; // Ensure functions are imported

const initialState = {
  username: '',
  email: '',
};

function UserForm({ obj }) {
  const [formData, setFormData] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserData = async () => {
      if (obj.id) {
        const userData = await getUser(obj.id);
        setFormData(userData);
      } else if (obj.uid) {
        // Fetch user by UID
        const userData = await getUserByUid(obj.uid);
        setFormData(userData);
      }
    };

    fetchUserData();
  }, [obj.id, obj.uid]);

  const handleChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !user.uid) {
      console.error('User data not available');
      return;
    }

    const payload = { ...formData, uid: user.uid };

    if (obj.id) {
      await updateUser(obj.id, payload);
    } else if (obj.uid) {
      await createUser(payload);
    }

    router.push('/profile');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
          placeholder="Enter your Username"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Enter your Email"
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {obj.id ? 'Update' : 'Create'} Profile
      </Button>
    </Form>
  );
}

UserForm.propTypes = {
  obj: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    uid: PropTypes.string,
  }),
};

UserForm.defaultProps = {
  obj: initialState,
};

export default UserForm;
