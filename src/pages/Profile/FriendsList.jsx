// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import FriendsListItem from './FriendsListItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import { getUser, postFriend } from '../../clientAPIs/profile';

const useStyles = () => ({
  wrapper: css({
    textAlign: "left"
  }),
  header: css({
    textAlign: "left"
  }),
  form: css({
    marginBottom: "20px",
    textAlign: "left",
  }),
  inputLabel: css({
    textAlign: "left"
  }),
  userId: css({
    marginBottom: "20px" 
  })
});

const FriendsList = () => {

  const { user } = useAuth0();
  const userId = user.sub;
  const styles = useStyles();

  const [friendId, setFriendId] = useState();
  const [submitClicked, setSubmitClicked] = useState(false);
  const [nicknames, setNicknames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleOnSubmit = () => {
    setSubmitClicked(true);
  };

  useEffect(() => {
    if (submitClicked) {
      postFriend(userId, friendId);
    }
  }, [submitClicked]);

  useEffect(() => {
    getUser(userId)
    .then(res => {
      setNicknames([]);
      let friends = res.data.friend;
      friends.map(friendId => {
        getUser(friendId)
          .then(res => {
            setNicknames(nicknames => [...nicknames, res.data.nickname])
            setIsLoading(false);
          })
      })
    })
    .catch(err => {
      console.log(err);
    })
  }, []);

  let friends;

  if (!isLoading && nicknames) {
    friends = (
      nicknames.map((nickname, i) => {
        return <FriendsListItem name={nickname} key={i} />
      })
    );
  }


  const currentUserId = (
    <div css={styles.userId}>Your User Id: {user.sub}</div>
  )

  return (
    <div css={styles.wrapper}>
      <h2>Friends</h2>
      {currentUserId}
      <form>
        <div></div> 
        <InputLabel>Add a friend</InputLabel>
        <InputBase color="primary" placeholder="Friend ID" onChange={e => setFriendId(e.target.value)} />
        <IconButton type="submit" onClick={handleOnSubmit}>
          <AddCircleOutline />
        </IconButton>
      </form>
      <div>{friends}</div>
    </div>
  )
};

export default FriendsList;