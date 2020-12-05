import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ProfileTabs from './ProfileTabs';

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>
  };

  return (
    <div>
      <ProfileTabs />
    </div>
  )
}

export default Profile;