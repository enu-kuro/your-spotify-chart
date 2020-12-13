import { ApiError } from 'ApiError/ApiErrorProvider';
import { useApiError } from 'ApiError/hooks';
import { useRequestHeaders } from 'hooks';
import { useQuery } from 'react-query';
import { processFetchResponse } from '../utils';

export const usePlaylistCoverImageQuery = (playlistId:string):{ playlistCoverImages?:SpotifyApi.ImageObject[] } => {
  const headers = useRequestHeaders();
  const { setError } = useApiError();
  const url = new URL(`https://api.spotify.com/v1/playlists/${playlistId}/images`);

  const {
    data,
  } = useQuery<SpotifyApi.ImageObject[], Error>(['playlist-cover-image', playlistId], () => fetch(url.toString(), {
    method: 'GET',
    headers,
  }).then((response) => processFetchResponse<SpotifyApi.ImageObject[]>(response)), {
    enabled: playlistId,
    staleTime: Infinity,
    onError: (error) => {
      console.log('onError: ', Error);
      if (error instanceof ApiError) {
        setError(error);
      } else if (error instanceof Error) {
        setError(new ApiError('エラーが発生しました。'));
      }
    },

  });
  return { playlistCoverImages: data };
};
