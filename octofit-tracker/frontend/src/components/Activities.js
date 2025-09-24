import React, { useState, useEffect } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // For development, we'll use localhost if REACT_APP_CODESPACE_NAME is not set
  const apiEndpoint = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
    : 'http://localhost:8000/api/activities/';

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching activities from:', apiEndpoint);
        const response = await fetch(apiEndpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Activities data:', data);
        // Handle both paginated and non-paginated responses
        const activitiesList = data.results || data;
        setActivities(activitiesList);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [apiEndpoint]);

  return (
    <div className="container mt-4">
      <h2>Activities</h2>
      {loading ? (
        <div className="alert alert-info">Loading activities...</div>
      ) : error ? (
        <div className="alert alert-danger">Error: {error}</div>
      ) : activities.length === 0 ? (
        <div className="alert alert-warning">No activities found</div>
      ) : (
        <div className="list-group">
          {activities.map((activity) => (
            <div key={activity._id} className="list-group-item">
              <h5>{activity.type}</h5>
              <p>Duration: {activity.duration} minutes</p>
              <p>Date: {activity.date}</p>
              <p>User: {activity.user}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Activities;