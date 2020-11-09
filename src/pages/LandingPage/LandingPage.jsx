// /** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';

import GameSelector from '../../components/GameSelector';

const useStyles = () => ({
  wrapper: css({
    // width: "100%",
    height: "100%",
    padding: "20px"
  })
});

const LandingPage = () => {

  const styles = useStyles();

    return (
      <div css={styles.wrapper}>
        <GameSelector />
      </div>
    );
}

export default LandingPage;

