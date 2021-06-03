import React, { createContext, useEffect, useReducer } from 'react';
import { Login, Register } from 'src/redux/store/auth';
import { LOCAL_STORAGE_KEY } from 'src/constants';
import { GetDataFromStorage, ClearStorage, SetDataToStorage } from 'src/utils';

const ACTION_TYPE = {
  INITIALIZE: 'INITIALIZE',
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT'
};

const initialAuthState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPE.INITIALIZE: {
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated: isAuthenticated,
        isInitialised: true,
        user
      };
    }
    case ACTION_TYPE.LOGIN: {
      const { user } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        user: user
      };
    }
    case ACTION_TYPE.DANGNHAP: {
      return {
        ...state,
        isAuthenticated: true
      };
    }
    case ACTION_TYPE.LOGOUT: {
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    }
    default: {
      return state;
    }
  }
};

const AuthContext = createContext({
  ...initialAuthState,
  login: () => Promise.resolve(),
  logout: () => {}
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialAuthState);

  const initialAuth = async () => {
    const _token = GetDataFromStorage(LOCAL_STORAGE_KEY.ID);
    let user = null;

    if (_token) {
      try {
        user = _token;
      } catch (error) {}
    }
    dispatch({
      type: ACTION_TYPE.INITIALIZE,
      payload: {
        isAuthenticated: !!_token,
        user: user
      }
    });
  };

  const login = async data => {
    try {
      const resLogin = await Login(data);
      if (resLogin) {
        SetDataToStorage(LOCAL_STORAGE_KEY.ID, resLogin?.item?.id);

        if (resLogin?.item) {
          dispatch({
            type: ACTION_TYPE.LOGIN,
            payload: {
              user: resLogin?.item?.id
            }
          });
          return resLogin;
        }

        throw resLogin;
      }

      throw resLogin;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.clear();
    dispatch({ type: ACTION_TYPE.LOGOUT });
  };

  useEffect(() => {
    initialAuth();
  }, []);

  // if (!state.isInitialised) {
  //   return <SplashScreen />;
  // }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
