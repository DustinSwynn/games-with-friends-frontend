// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

const useStyles = () => ({
  wrapper: css({
    width: "100%",
    height: "100%",
    display: "flex",
    borderTop: "1px solid rgb(128,128,128,0.5)",
    padding: "10px 0px 10px 0px"
  }),
  column: css({
    width: "30%",
    float: "left",
    textAlign: "left",
  })
})

const FriendsListItem = ({ name }) => {

  const styles = useStyles();


  return (
    <div css={styles.wrapper}>
      <div css={styles.column} style={{ padding: "6px 0px 8px 0px" }}>
        {name}
      </div>
      <div css={styles.column}>
        <Button color="secondary">
          Chat
        </Button>
      </div>
      <div css={styles.column}>
      <NavLink to="/">
        <Button color="primary">
          Start Game
        </Button>
      </NavLink>
        
      </div>
    </div>
  );
};

export default FriendsListItem;