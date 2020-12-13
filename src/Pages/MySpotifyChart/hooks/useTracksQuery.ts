import { ApiError } from 'ApiError/ApiErrorProvider';
import { useApiError } from 'ApiError/hooks';
import { useRequestHeaders } from 'hooks';
import { useQuery } from 'react-query';
import { processFetchResponse } from '../utils';

export const useTracksQuery = ():{ data?:SpotifyApi.UsersTopTracksResponse } => {
  const headers = useRequestHeaders();
  const { setError } = useApiError();
  const url = new URL('https://api.spotify.com/v1/me/top/tracks');
  const queryParams = {
    limit: '25',
    time_range: 'medium_term',
  };

  url.search = new URLSearchParams(queryParams).toString();
  const {
    data,
  } = useQuery<SpotifyApi.UsersTopTracksResponse, Error>(['tracks'], () => fetch(url.toString(), {
    method: 'GET',
    headers,
  }).then((response) => processFetchResponse<SpotifyApi.UsersTopTracksResponse>(response)), {
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
    onError: (error) => {
      console.log('onError: ', Error);
      if (error instanceof ApiError) {
        setError(error);
      } else if (error instanceof Error) {
        setError(new ApiError('エラーが発生しました。'));
      }
    },

  });
  return { data };
};
