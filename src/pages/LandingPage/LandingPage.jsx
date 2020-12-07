// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

import GameSelector from '../../components/GameSelector';
import { Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const useStyles = () => ({
  wrapper: css({
    // width: "100%",
    height: "100%",
    padding: "20px"
  }),
  header: css({
    margin: "30px"
  }),
  instructions: css({
    marginBottom: "30px"
  })
});

const LandingPage = () => {

  const styles = useStyles();

    return (
      <div css={styles.wrapper}>
        <h2 css={styles.header}>Welcome to Games with Friends!</h2>
        <h3 css={styles.instructions}>Select a game below to begin playing:</h3>
        <GameSelector />
        <NavLink to="/chat">
          <Button variant="contained" color="primary">Join the Community Chat!</Button>
        </NavLink>
      </div>
    );
}

export default LandingPage;
