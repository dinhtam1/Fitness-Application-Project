import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Home() {
  const [users, setUsers] = useState([
    {
        "full_name": "John",
        "phone_number": "1234567890",
        "email": "villadiwc2@gmail.com",
        "age": 30,
        "gender": "male",
        "weight": 70.5,
        "height": 175,
        "level": "BEGINNER",
        "goal": "WEIGHT_LOSS",
        "avatar_url": null,
        "role": "USER",
        "status": "ACTIVE"
    },
    {
        "full_name": "Le Long Bao",
        "phone_number": "0985323277",
        "email": "lelongbao2790@gmail.com",
        "age": 34,
        "gender": "male",
        "weight": 70.5,
        "height": 173,
        "level": "ADVANCED",
        "goal": "GAIN_MUSCLE",
        "avatar_url": null,
        "role": "USER",
        "status": "ACTIVE"
    },
    {
        "full_name": "John",
        "phone_number": "1234567890",
        "email": "villadiwc23@gmail.com",
        "age": 30,
        "gender": "male",
        "weight": 72,
        "height": 175,
        "level": "ADVANCED",
        "goal": "WEIGHT_LOSS",
        "avatar_url": null,
        "role": "USER",
        "status": "ACTIVE"
    },
    {
        "full_name": "John",
        "phone_number": "1234567890",
        "email": "villadiwc1123@gmail.com",
        "age": 30,
        "gender": "male",
        "weight": 70.5,
        "height": 175,
        "level": "ADVANCED",
        "goal": "WEIGHT_LOSS",
        "avatar_url": null,
        "role": "USER",
        "status": "ACTIVE"
    },
    {
        "full_name": "John",
        "phone_number": "1234567890",
        "email": "villadiwc11233@gmail.com",
        "age": 22,
        "gender": "male",
        "weight": 73,
        "height": 179,
        "level": "ADVANCED",
        "goal": "WEIGHT_LOSS",
        "avatar_url": null,
        "role": "USER",
        "status": "ACTIVE"
    }
]);

  // Uncomment and adjust the useEffect hook below when ready to fetch data from the API
  /*
  useEffect(() => {
    axios.get('http://localhost:3055/v1/api/admin/user-management')
      .then(response => {
        const result = response.data;
        if (result.statusCode === 200) {
          setUsers(result.data);
        }
      })
      .catch(error => console.error('Error fetching user management data:', error));
  }, []);
  */

  return (
    <div>
      <h1>User Management</h1>
      <div>
        {users.map((user, index) => (
          <div key={index} style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
            <div><strong>Full Name:</strong> {user.full_name}</div>
            <div><strong>Phone Number:</strong> {user.phone_number}</div>
            <div><strong>Email:</strong> {user.email}</div>
            <div><strong>Age:</strong> {user.age}</div>
            <div><strong>Gender:</strong> {user.gender}</div>
            <div><strong>Weight:</strong> {user.weight}</div>
            <div><strong>Height:</strong> {user.height}</div>
            <div><strong>Level:</strong> {user.level}</div>
            <div><strong>Goal:</strong> {user.goal}</div>
            <div><strong>Role:</strong> {user.role}</div>
            <div><strong>Status:</strong> {user.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;