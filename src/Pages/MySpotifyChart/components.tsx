import React from 'react';
import {
  Control, Controller, DeepMap, FieldError,
} from 'react-hook-form';
import {
  Modal, Form, Button, Container, Input, Label, TextArea, Image, Header,
} from 'semantic-ui-react';
import {
  TwitterShareButton,
  TwitterIcon,
  LineShareButton,
  LineIcon,
  FacebookShareButton,
  FacebookIcon,
} from 'react-share';
import { FormValuesType } from './types';
import { generatePlaylistUrlById, SPOTIFY_COLOR_STYLE } from './utils';

export const CreatePlaylistModal:React.FC<{
    okCallback: () => void;
    cancelCallback: () => void;
    control: Control;
    errors: DeepMap<FormValuesType, FieldError>;
  }> = ({
    okCallback, cancelCallback, control, errors,
  }) => {
    return (
      <Modal open size="mini" mountNode={document.getElementById('root') || null}>
        <Modal.Header>Create YourSpotifyChart Playlist</Modal.Header>
        <Modal.Content style={{ paddingBottom: 0 }}>
          <Form>
            <Form.Field required error={!!errors.name}>
              <label htmlFor="name">Name</label>
              <Controller
                id="name"
                as={<Input />}
                control={control}
                name="name"
                rules={{ required: { value: true, message: 'Please enter your playlist name' } }}
              />
              {errors.name && (
              <Label pointing color="red">
                {errors.name.message}
              </Label>
              )}
            </Form.Field>
            <Form.Field>
              <label htmlFor="name">Description</label>
              <Controller
                id="description"
                as={<TextArea />}
                control={control}
                name="description"
              />
            </Form.Field>
          </Form>

        </Modal.Content>
        <Container textAlign="center" style={{ padding: 20 }}>
          <Button content="CREATE" onClick={okCallback} style={SPOTIFY_COLOR_STYLE} />
          <Button content="CANCEL" color="grey" onClick={cancelCallback} />
        </Container>
      </Modal>
    );
  };

export const ShareButtons:React.FC<{playlistUrl:string}> = ({ playlistUrl }) => {
  const shareUrl = playlistUrl;
  const title = "That's My Spotify Chart!";
  const hashtag = 'YourSpotifyChart';
  const shareIconSize = 50;
  return (
    <>
      <Button.Group style={{ paddingTop: 20 }}>
        <TwitterShareButton url={shareUrl} title={title} hashtags={[hashtag]} style={{ paddingRight: 10 }}>
          <TwitterIcon size={shareIconSize} round />
        </TwitterShareButton>
        <LineShareButton title={title} url={shareUrl} style={{ paddingRight: 10 }}>
          <LineIcon size={shareIconSize} round />
        </LineShareButton>
        <FacebookShareButton
          url={shareUrl}
          quote={title}
        >
          <FacebookIcon size={shareIconSize} round />
        </FacebookShareButton>
      </Button.Group>
    </>
  );
};

export const SuccessCreatePlaylistModal:React.FC<{
    okCallback: () => void;
    playlistId: string;
    playlistImageUrl: string;
  }> = ({
    okCallback,
    playlistId,
    playlistImageUrl,
  }) => {
    const playlistUrl = generatePlaylistUrlById(playlistId);

    return (
      <Modal open size="small" mountNode={document.getElementById('root') || null}>
        <Modal.Header as="h3">YourSpotifyChart Playlist has been created!</Modal.Header>
        <Modal.Content image style={{ paddingBottom: 0 }}>
          <Image src={playlistImageUrl} size="medium" href={playlistImageUrl} target="_blank" rel="noopener noreferrer" />
          <Modal.Description>
            <Header as="h3"><a style={{ verticalAlign: 'top' }} target="_blank" rel="noopener noreferrer" href={playlistUrl}>YourSpotifyChart</a></Header>
            <ShareButtons playlistUrl={playlistUrl} />
          </Modal.Description>
        </Modal.Content>
        <Container textAlign="center" style={{ padding: 10 }}>
          <Button content="OK" onClick={okCallback} />
        </Container>
      </Modal>
    );
  };
