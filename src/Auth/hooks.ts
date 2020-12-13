import { useLocation } from 'react-router-dom';

export const useUrlParams = ():{error:string | null, accessToken:string} => {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const error = urlParams.get('error');
  const accessToken = location.hash.substr(1).split('&')[0].split('=')[1];
  return { error, accessToken };
};
