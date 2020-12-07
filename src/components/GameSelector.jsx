// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'

import { ReactComponent as BattleShip } from '../assets/battleship.svg';
import { ReactComponent as Codenames } from '../assets/codenames.svg';

const useStyles = () => ({
  wrapper: css({
    height: "350px",
    textAlign: "center"    
  }),
  navContainer: css({
    position: "relative"
  }),
  gameContainer: css({
    position: "relative",
    display: "inline-block",
    width: "250px",
    height: "100%",
    // backgroundColor: "rgba(95, 96, 98, 0.4)",
    color: "#000000",
    border: "2px solid gray",
    borderRadius: "20px",
    // top: 0,
    // right: 0,
    // bottom: 0,
    // left: 0,
    margin: "0px 20px 0px 0px",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "rgba(95, 96, 98, 0.75)",
      color: "#FFFFFF"
    }
  }),
  game: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    borderTop: "1px solid black",
    padding: "20px 0px 0px 0px"
  },
  gameImg: {
    height: "200px",
    width: "200px",
    padding: "44px 26px 44px 26px",
    // borderRadius: "10%",
    position: "absolute",
    display: "block",
  }
});

const GameSelector = () => {
  
  const styles = useStyles();

  return (
    <div css={styles.wrapper}>
      <NavLink to="/codenames">
        <div css={styles.gameContainer}>
          {/* <img css={styles.gameImg} src="./codenames.jpg" /> */}
          <Codenames css={styles.gameImg} />
          <h3 css={styles.game}>Codenames</h3>
        </div>
      </NavLink>
      <NavLink to="/battleship">
        <div css={styles.gameContainer}>
          <BattleShip css={styles.gameImg} />
          <h3 css={styles.game}>Battleship</h3>
        </div>
      </NavLink>
    </div>
  );
}

export default GameSelector;

