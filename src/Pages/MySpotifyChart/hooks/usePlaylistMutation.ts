import { ApiError } from 'ApiError/ApiErrorProvider';
import { useApiError } from 'ApiError/hooks';
import { useRequestHeaders } from 'hooks';
import { MutateFunction, useMutation } from 'react-query';
import { FormValuesType } from '../types';
import { processFetchResponse } from '../utils';

export const usePlaylistMutation = ():{
    createPlaylist: MutateFunction<SpotifyApi.CreatePlaylistResponse, unknown, FormValuesType, unknown>
  } => {
  const headers = useRequestHeaders();
  const { setError } = useApiError();

  const [
    createPlaylist,
  ] = useMutation(
    ({ name, description }:FormValuesType) => fetch(
    // 公式サイトだとuserId指定する仕様しか記載がないが'me'でもいける
      'https://api.spotify.com/v1/me/playlists',
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          name,
          description,
          public: true,
        }),
      },
    ).then((response) => processFetchResponse<SpotifyApi.CreatePlaylistResponse>(response)),
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
  return { createPlaylist };
};
