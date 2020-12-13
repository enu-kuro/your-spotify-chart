import { ApiError } from 'ApiError/ApiErrorProvider';

export const SPOTIFY_COLOR_STYLE = { backgroundColor: '#1DB954', color: '#fff' };

export const generatePlaylistUrlById = (playlistId:string):string => {
  return `https://open.spotify.com/playlist/${playlistId}`;
};

// https://stackoverflow.com/questions/41103360/how-to-use-fetch-in-typescript
export const processFetchResponse = <T>(
  response: Response,
):Promise<T> => {
  if (response.ok && /^2.+/.test(response.status.toString())) {
    return response.json() as Promise<T>;
  }
  return Promise.reject(new ApiError(undefined, response.status));
};
