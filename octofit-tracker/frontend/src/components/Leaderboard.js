import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [rankings, setRankings] = useState([]);
  const apiEndpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        console.log('Fetching leaderboard from:', apiEndpoint);
        const response = await fetch(apiEndpoint);
        const data = await response.json();
        console.log('Leaderboard data:', data);
        // Handle both paginated and non-paginated responses
        const rankingsList = data.results || data;
        setRankings(rankingsList);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };

    fetchLeaderboard();
  }, [apiEndpoint]);

  return (
    <div className="container mt-4">
      <h2>Leaderboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Rank</th>
            <th>User</th>
            <th>Team</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((rank, index) => (
            <tr key={rank._id}>
              <td>{index + 1}</td>
              <td>{rank.user}</td>
              <td>{rank.team}</td>
              <td>{rank.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;