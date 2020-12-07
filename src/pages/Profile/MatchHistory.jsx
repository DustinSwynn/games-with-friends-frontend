// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import moment from 'moment';

import { getUser } from '../../clientAPIs/profile';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = () => ({
  header: {
    textAlign: "left",
    marginBottom: "20px"
  },
  table: {
    minWidth: 650
  },
  winLoss: {
    fontSize: "20px",
    padding: "20px",
    marginBottom: "20px",
    border: "1px solid black"
  },
  noHistory: {
    textAlign: "left",
    padding: "20px"
  }
});

const MatchHistory = () => {

  const styles = useStyles();
  const { user } = useAuth0();
  const [matchDetails, setMatchDetails] = useState({});
  const [body, setBody] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUser(user.sub)
      .then(res => {
        let record = res.data.record;
        setMatchDetails(record);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  let matchHistories;
  let winLoss;
  let winLossContainer;

  if (!isLoading && matchDetails) {
    matchHistories = (
      matchDetails.map((match, i) => {
        let date = match.when;
        let outcome;
        if (match.win === true) {
          outcome = "Win";
        } else {
          outcome = "Lose";
        };
        return (
          <TableRow key={i}>
            <TableCell component="th" scope="row">
              {date}
            </TableCell>
            <TableCell align="right">{match.game}</TableCell>
            <TableCell align="right">{outcome}</TableCell>
          </TableRow>
        )
      })
    );
    
    const winsLosses = () => {
      let wins = 0;
      let losses = 0;
      matchDetails.map(match => {
        if (match.win === true) {
          wins += 1;
        } else {
          losses += 1;
        }
      })
      return [wins, losses];
    }

    const winCount = winsLosses()[0];
    const lossCount = winsLosses()[1];
    winLossContainer = (
      <div css={styles.winLoss}>
        <div>Total Wins: {winCount}</div>
        <div>Total Losses: {lossCount}</div>
      </div>
    )
  };

  const noHistory = (
    <div css={styles.noHistory}>Play a game to add to your match history!</div>
  )

  
  return (
    <div>
      <h2 css={styles.header}>Match History</h2>
      {winLossContainer}
      <TableContainer component={Paper}>
        <Table className={styles.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="right">Game</TableCell>
              <TableCell align="right">Outcome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {matchHistories 
              ? matchHistories 
              : noHistory
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MatchHistory;