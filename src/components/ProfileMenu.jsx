import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../auth/LoginButton';
import { StepButton } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const ProfileMenu = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { logout } = useAuth0();

  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout({ returnTo: window.location.origin });
    setAnchorEl(null);
  };

  const dropdownButton = (
    <Button color="primary" onClick={handleClick}>
      {username}
    </Button> 
  );

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      setUsername(user.nickname);
    }
  }, [isLoading]);

  return (
    <div>
      {/* {authButton} */}
      {isAuthenticated && !isLoading
        ? dropdownButton
        : <LoginButton />
      }
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <NavLink 
            to="/profile"
            activeStyle={{
              textDecoration: "none"
            }}
          >
            Profile
          </NavLink>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default ProfileMenu;
