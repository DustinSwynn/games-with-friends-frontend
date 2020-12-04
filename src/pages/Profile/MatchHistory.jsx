import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { getUser } from '../../clientAPIs/profile';

const MatchHistory = () => {

  const { user, isAuthenticated, isLoading } = useAuth0();
  const [matchDetails, setMatchDetails] = useState();

  // getMatchHistory(user.sub)
  useEffect(() => {
    getUser("test5")
    .then(res => {
      setMatchDetails(res.data.record);
    })
    .catch(err => {
      console.log(err);
    });
  }, [])

    console.log("Match Details", matchDetails);

    // Map the match history details to a map element
    // Add a total wins and losses at the top
  return (
    <div>
  
    </div>
  );
};

export default MatchHistory;