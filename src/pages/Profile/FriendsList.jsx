// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useState } from 'react';
import FriendsListItem from './FriendsListItem';
import TextField from '@material-ui/core/TextField';
import { ReactComponent as Search } from '../../assets/search.svg';
import { InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { postFriend } from '../../clientAPIs/profile';

const useStyles = () => ({
  textField: css({
    marginBottom: "20px"
  }),
  searchIcon: css({
    width: "20px",
    paddingRight: "10px",
    transform: "translateY(20px)"
  })
});

const FriendsList = () => {

  const styles = useStyles();
  const [friendId, setFriendId] = useState();
 
  const handleOnSubmit = () => {
    postFriend(friendId);
  };

  console.log("FRIEND ID", friendId);
  // need to change the icon button below to a normal button because page is re-rendering and not passing friend ID in
  return (
    <div>
      {/* <form css={styles.textField}>
        <Search css={styles.searchIcon} />
        <TextField label="Search for a Friend" variant="outlined" />
      </form> */}
      <form>
        <InputBase placeholder="Search for friends" onChange={e => setFriendId(e.target.value)} />
        <IconButton type="submit" onClick={handleOnSubmit()}>
          <SearchIcon />
        </IconButton>
      </form>
      <FriendsListItem name="Dustin" />
      <FriendsListItem name="William" />
      <FriendsListItem name="Nick" />
    </div>
  )
};

export default FriendsList;