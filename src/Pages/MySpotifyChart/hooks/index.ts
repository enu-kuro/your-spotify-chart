import { useState } from 'react';
import { useModal } from 'hooks';
import { useForm } from 'react-hook-form';
import { CreatePlaylistModal, SuccessCreatePlaylistModal } from '../components';
import { FormValuesType } from '../types';
import { useAddTracksToPlaylistMutation } from './useAddTracksToPlaylistMutation';
import { usePlaylistMutation } from './usePlaylistMutation';
import { useTracksQuery } from './useTracksQuery';
import { usePlaylistCoverImageQuery } from './usePlaylistCoverImageQuery';

const retrieveSporityUris = (data?:SpotifyApi.UsersTopTracksResponse) => {
  return data ? data.items.map((track) => track.uri) : [];
};
export const useMySpotifyChart = ():{data?:SpotifyApi.UsersTopTracksResponse, ModalComponent: false | React.ReactElement<unknown> | null, openCreatePlaylistModal:()=>void, playlistId:string} => {
  const { data } = useTracksQuery();
  const [isShowCreatePlaylistModal, openCreatePlaylistModal, closeCreatePlaylistModal] = useModal();

  const [isShowSuccessCreatePlaylistModal, openSuccessCreatePlaylistModal, closeSuccessCreatePlaylistModal] = useModal();
  const [playlistId, setPlaylistId] = useState('');
  const { createPlaylist } = usePlaylistMutation();
  const { addTracksToPlaylist } = useAddTracksToPlaylistMutation();
  const {
    control,
    handleSubmit,
    errors: formErrors,
  } = useForm<FormValuesType>({ defaultValues: { name: 'MySpotifyChart', description: 'From YourSpotifyChart.com' } });
  const onSubmit = handleSubmit(async (formValues) => {
    const response = await createPlaylist(formValues);
    if (!response) {
      return;
    }
    await addTracksToPlaylist({ playlistId: response.id, uris: retrieveSporityUris(data) });
    closeCreatePlaylistModal();
    setPlaylistId(response.id);
    openSuccessCreatePlaylistModal();
  });
  const { playlistCoverImages } = usePlaylistCoverImageQuery(playlistId);

  const ModalComponent = (
    (isShowCreatePlaylistModal
      && CreatePlaylistModal({
        okCallback: onSubmit, cancelCallback: closeCreatePlaylistModal, control, errors: formErrors,
      })
    )
      || (isShowSuccessCreatePlaylistModal
        && SuccessCreatePlaylistModal({ okCallback: closeSuccessCreatePlaylistModal, playlistId, playlistImageUrl: playlistCoverImages ? playlistCoverImages[1].url : '' })
      ));
  return {
    data, ModalComponent, openCreatePlaylistModal, playlistId,
  };
};
