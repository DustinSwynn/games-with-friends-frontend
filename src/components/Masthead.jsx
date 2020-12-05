// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

import { ReactComponent as Logo } from '../assets/board-game.svg';
import ProfileMenu from "./ProfileMenu";
import { NavLink } from 'react-router-dom';

const useStyles = () => ({
  wrapper: css({
    width: "100%",
    height: "6.5%",
    padding: "20px",
    boxShadow: "0px 0px 5px 0px #000",
  }),
  logoWrapper: css({
    width: "400px",
    height: "50px",
    position: "absolute"
  }),
  logo: css({
    height: "50px",
    width: "50px",
    float: "left",
    display: "inline-block"
  }),
  name: css({
    float: "left",
    padding: "6px 20px",
    margin: "auto"
  }),
  authButton: css({
    float: "right",
    position: "absolute",
    right: "20px",
    paddingTop: "6px"
  })
});

const Masthead = () => {
  const { user, isAuthenticated } = useAuth0();

  const styles = useStyles();

  return (
    <div css={styles.wrapper}>
      <div css={styles.logoWrapper}>
        <NavLink 
          to="/"
          activeStyle={{
            textDecoration: "none"
          }}
        >
          <Logo css={styles.logo} />
          <h1 css={styles.name}>Games with Friends</h1>
        </NavLink>
      </div>
      <div css={styles.authButton}>
        <ProfileMenu />
      </div>
    </div>
  );
}

export default Masthead;

