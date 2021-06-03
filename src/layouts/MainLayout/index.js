import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles, Box } from '@material-ui/core';

import NavBar from './NavBar';
import TopBar from './TopBar';
import useAuth from 'src/hooks/useAuth';

const useStyles = makeStyles(theme => ({
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },

  contentContainer: {
    backgroundColor: '#f8f9fc',
    width: '100%',
    minHeight: window.innerHeight,
    overflowX: 'hidden',
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    padding: 15
  },

  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'hidden',
    marginTop: theme.spacing(2)
  }
}));

const MainLayout = ({ children }) => {
  const classes = useStyles();
  const { logout } = useAuth();

  return (
    <div className={classes.root}>
      <NavBar />
      <Box display="flex" justifyContent="flex-end" mt={'5px'} mr={'5px'} onClick={() => logout()}>
        {' '}
        <button class="btn-round">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-box-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
            />
            <path
              fill-rule="evenodd"
              d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
            />
          </svg>
        </button>
      </Box>

      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>{children}</div>
        </div>
      </div>
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node
};

export default MainLayout;
