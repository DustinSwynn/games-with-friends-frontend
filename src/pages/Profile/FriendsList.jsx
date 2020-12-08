// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { getUser, postFriend } from '../../clientAPIs/profile';

const useStyles = () => ({
  wrapper: css({
    textAlign: "left"
  }),
  header: css({
    textAlign: "left"
  }),
  inputLabel: css({
    textAlign: "left"
  }),
  userId: css({
    marginBottom: "20px" 
  }),
  form: css({
    marginBottom: "30px",
    textAlign: "left"
  }),
  table: {
    minWidth: 650
  },
  tableCell: {
    paddingRight: "8px"
  }
});

const FriendsList = () => {

  const { user, isLoading, isAuthenticated } = useAuth0();
  const userId = user.sub;
  const styles = useStyles();

  const [friendId, setFriendId] = useState();
  const [submitClicked, setSubmitClicked] = useState(false);
  const [nicknames, setNicknames] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleOnSubmit = () => {
    setSubmitClicked(true);
  };

  useEffect(() => {
    if (submitClicked) {
      postFriend(userId, friendId);
    }
  }, [submitClicked]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      getUser(userId)
      .then(res => {
        setNicknames([]);
        let friends = res.data.friend;
        friends.map(friendId => {
          getUser(friendId)
            .then(res => {
              setNicknames(nicknames => [...nicknames, res.data.nickname])
              setLoading(false);
            })
        })
      })
      .catch(err => {
        console.log(err);
      })
    }
  }, [isLoading, isAuthenticated]);

  let friendListItems;

  if (!loading && nicknames && !isLoading && isAuthenticated) {
    friendListItems = (
      nicknames.map((nickname, i) => {
        return (
          <TableRow key={i}>
            <TableCell component="th" scope="row">
              {nickname}
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
        )
      })
    );
  }

  const noFriends = (
    <div>You have no friends, start your list by adding a friend by ID above!</div>
  )

  const currentUserId = (
    <div css={styles.userId}>Your User Id: {user.sub}</div>
  )

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    isAuthenticated && (
      <div css={styles.wrapper}>
        <h2>Friends</h2>
        {currentUserId}
        <form css={styles.form}>
          <InputLabel>Add a friend</InputLabel>
          <InputBase color="primary" placeholder="Friend ID" onChange={e => setFriendId(e.target.value)} />
          <IconButton type="submit" onClick={handleOnSubmit}>
            <AddCircleOutline />
          </IconButton>
        </form>
        <div>
          <TableContainer component={Paper}>
            <Table className={styles.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Friend</TableCell>
                  <TableCell align="right" style={{ "padding-right": "32px" }}>Codenames</TableCell>
                  <TableCell align="right" style={{ "padding-right": "24px" }}>Battleship</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {friendListItems
                  ? friendListItems
                  : noFriends
                }
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    )
  )
};

export default FriendsList;