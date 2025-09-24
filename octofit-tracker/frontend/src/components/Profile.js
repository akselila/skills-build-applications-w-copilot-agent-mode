import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [activities, setActivities] = useState([]);
  const baseUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;
  const profileEndpoint = `${baseUrl}/profile/`;
  const activitiesEndpoint = `${baseUrl}/activities/`;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('Fetching profile from:', profileEndpoint);
        const response = await fetch(profileEndpoint);
        const data = await response.json();
        console.log('Profile data:', data);
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    const fetchUserActivities = async () => {
      try {
        console.log('Fetching user activities from:', activitiesEndpoint);
        const response = await fetch(activitiesEndpoint);
        const data = await response.json();
        console.log('User activities data:', data);
        // Handle both paginated and non-paginated responses
        const activitiesList = data.results || data;
        setActivities(activitiesList);
      } catch (error) {
        console.error('Error fetching user activities:', error);
      }
    };

    fetchProfile();
    fetchUserActivities();
  }, [profileEndpoint, activitiesEndpoint]);

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{profile.username}</h5>
              <p className="card-text">Email: {profile.email}</p>
              <p className="card-text">Team: {profile.team}</p>
              <p className="card-text">Total Activities: {activities.length}</p>
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <h3>Recent Activities</h3>
          <div className="list-group">
            {activities.slice(0, 5).map((activity) => (
              <div key={activity._id} className="list-group-item">
                <h6>{activity.type}</h6>
                <p className="mb-1">Duration: {activity.duration} minutes</p>
                <small>Date: {activity.date}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;