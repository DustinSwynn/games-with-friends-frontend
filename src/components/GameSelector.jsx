// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'

import { ReactComponent as Next } from '../assets/next.svg';
import { ReactComponent as Back } from '../assets/back.svg';

const useStyles = () => ({
  wrapper: css({
    height: "100%",
    width: "60%",
    display: "flex",
  }),
  gameContainer: css({
    position: "absolute",
    width: "250px",
    height: "40%",
    backgroundColor: "rgba(95, 96, 98, 0.4)",
    color: "#FFFFFF",
    border: "2px solid gray",
    borderRadius: "20px",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    margin: "auto",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgba(95, 96, 98, 0.5)"
    }
  }),
  game: {
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)"
  },
  arrowNext: {
    height: "100px",
    width: "100px",
    right: "200px",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)"
  },
  arrowBack: {
    height: "100px",
    width: "100px",
    left: "200px",
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)"
  }
});

const GameSelector = () => {
  
  const styles = useStyles();

  return (
    <div css={styles.wrapper}>
      {/* <Back css={styles.arrowBack}/> */}
      <NavLink to="/codenames">
        <div css={styles.gameContainer}>
          <h3 css={styles.game}>Codenames</h3>
        </div>
      </NavLink>
      {/* <Next css={styles.arrowNext}/> */}
    </div>
  );
}

export default GameSelector;

