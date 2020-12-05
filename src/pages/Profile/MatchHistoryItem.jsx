// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import Button from '@material-ui/core/Button';

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

const MatchHistoryItem = ({ date, game, outcome }) => {

  const styles = useStyles();

  return (
    <div css={styles.wrapper}>
      <div css={styles.column} style={{ padding: "6px 8px"}}>
        {date}
      </div>
      <div css={styles.column}>
        {game}
      </div>
      <div css={styles.column}>
        {outcome}
      </div>
    </div>
  );
};

export default MatchHistoryItem;