import { ApiError } from 'ApiError/ApiErrorProvider';
import { useApiError } from 'ApiError/hooks';
import { useRequestHeaders } from 'hooks';
import { MutateFunction, useMutation } from 'react-query';
import { AddTracksToPlaylistMutationType } from '../types';
import { processFetchResponse } from '../utils';

export const useAddTracksToPlaylistMutation = ():{
    addTracksToPlaylist: MutateFunction<SpotifyApi.AddTracksToPlaylistResponse, unknown, AddTracksToPlaylistMutationType, unknown>
  } => {
  const headers = useRequestHeaders();
  const { setError } = useApiError();

  const [
    addTracksToPlaylist,
  ] = useMutation(
    ({ playlistId, uris }:AddTracksToPlaylistMutationType) => fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          uris,
        }),
      },
    ).then((response) => processFetchResponse<SpotifyApi.AddTracksToPlaylistResponse>(response)),
    {
      onError: (error?: Error | string) => {
        console.log('onError: ', error);
        if (error instanceof ApiError) {
          setError(error);
        } else if (error instanceof Error) {
          setError(new ApiError('エラーが発生しました。'));
        }
      },
    },
  );
  return { addTracksToPlaylist };
};
