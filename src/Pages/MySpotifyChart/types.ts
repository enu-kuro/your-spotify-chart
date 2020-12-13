export type usePlaylistMutationPropsType = {
    successCallback?: (response?:SpotifyApi.CreatePlaylistResponse) => void,
    errorCallback?: (error?:Error | string) => void,
  }

export type FormValuesType = {
    name: string,
    description: string,
  };

export type AddTracksToPlaylistMutationType = {
    playlistId: string;
    uris: string[];
  }
