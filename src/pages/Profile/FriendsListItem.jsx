// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { setId } from '../../clientAPIs/codenames';
import { Context as GlobalContext } from '../../context/GlobalContext';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = () => ({
  wrapper: css({
    width: "100%",
    height: "100%",
    display: "flex",
    borderTop: "1px solid rgb(128,128,128,0.5)",
    padding: "10px 0px 10px 0px"
  }),
  column: css({
    width: "25%",
    float: "left",
    textAlign: "left",
  })
})

const FriendsListItem = ({ name }) => {

  const styles = useStyles();

  const { 
    codenames: {
      gameId
    }
  } = useContext(GlobalContext);

  return (
    <div css={styles.wrapper}>
      <TableContainer component={Paper}>
        <Table className={styles.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Friend</TableCell>
              <TableCell align="right">Codenames</TableCell>
              <TableCell align="right">Battleship</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                {name}
              </TableCell>
              <TableCell align="right">
                <NavLink to="/codenames">
                  <Button color="primary">
                    Invite Friend
                  </Button>
                </NavLink>
              </TableCell>
              <TableCell align="right">
                <NavLink to="/battleship">
                  <Button color="primary">
                    Invite Friend
                  </Button>
                </NavLink>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* <div css={styles.column} style={{ padding: "6px 0px 8px 0px" }}>
        {name}
      </div>
      <div css={styles.column}>
        <Button color="secondary">
          Chat
        </Button>
      </div>
      <div css={styles.column}>
        <NavLink to="/codenames">
          <Button color="primary">
            Invite Friend To Codenames
          </Button>
        </NavLink>
      </div>
      <div css={styles.column}>
        <NavLink to="/battleship">
          <Button color="primary">
            Invite Friend - Battleship
          </Button>
        </NavLink>
      </div> */}
    </div>
  );
};

export default FriendsListItem;