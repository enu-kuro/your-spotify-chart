import React, { createContext, useEffect } from 'react';
import { useApiError } from 'ApiError/hooks';
import { ApiError } from 'ApiError/ApiErrorProvider';
import { useUrlParams } from 'Auth/hooks';

type AuthContextValueType = {
  accessToken: string
}
export const AuthContext = createContext({} as AuthContextValueType);

export const getAuthUrl = ():string => {
  const url = new URL('https://accounts.spotify.com/authorize');
  const authParams = {
    response_type: 'token',
    client_id: process.env.REACT_APP_CLIENT_ID,
    scope: 'user-top-read playlist-modify-public',
    redirect_uri: process.env.REACT_APP_REDIRECT_URI,
    state: '',
  };
  url.search = new URLSearchParams(authParams).toString();
  return url.toString();
};

const useSetError = (errorString: string | null) => {
  const { setError } = useApiError();
  useEffect(() => {
    if (errorString) {
      if (errorString === 'access_denied') {
        setError(new ApiError(undefined, 403));
      } else {
        setError(new ApiError(errorString));
      }
    }
  }, [errorString, setError]);
};
const Auth:React.FC = ({ children }) => {
  const { error, accessToken } = useUrlParams();

  if (!accessToken && !error) {
    const authUrl = getAuthUrl();
    window.location.href = authUrl;
  }

  useSetError(error);

  if (error) {
    return <></>;
  }

  return <AuthContext.Provider value={{ accessToken }}>{children}</AuthContext.Provider>;
};

export default Auth;
