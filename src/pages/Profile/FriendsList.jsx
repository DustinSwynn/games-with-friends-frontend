// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import React from 'react';
import FriendsListItem from './FriendsListItem';
import TextField from '@material-ui/core/TextField';
import { ReactComponent as Search } from '../../assets/search.svg';
import { InputBase, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

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

  return (
    <div>
      {/* <form css={styles.textField}>
        <Search css={styles.searchIcon} />
        <TextField label="Search for a Friend" variant="outlined" />
      </form> */}
      <form>
        <InputBase placeholder="Search for friends" />
        <IconButton type="submit">
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