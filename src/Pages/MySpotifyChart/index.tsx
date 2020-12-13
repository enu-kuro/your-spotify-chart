import React from 'react';
import {
  Button,
  Container, Header, Item,
} from 'semantic-ui-react';
import { useMySpotifyChart } from 'Pages/MySpotifyChart/hooks';
import { generatePlaylistUrlById, SPOTIFY_COLOR_STYLE } from './utils';
import { ShareButtons } from './components';
import './index.css';

const TrackItem:React.FC<{order:number, track: SpotifyApi.TrackObjectFull}> = ({ order, track }) => {
  return (
    <Item style={{ padding: 10 }}>
      <div style={{ margin: 'auto 1em' }}>{order}</div>
      <Item.Image src={track.album.images[2].url} />
      <Item.Content>
        <Item.Description style={{ marginTop: 4, marginBottom: 4 }} as="h4">{track.name}</Item.Description>
        <Item.Meta style={{ marginTop: 0, fontSize: 12 }}>
          {track.artists.map((artist, index) => {
            if (index === 0) {
              return artist.name;
            }
            return ` / ${artist.name}`;
          })}
        </Item.Meta>
      </Item.Content>
    </Item>
  );
};

const MySpotifyChart:React.FC = () => {
  const {
    data, ModalComponent, openCreatePlaylistModal, playlistId,
  } = useMySpotifyChart();

  return (
    <>
      <Container style={{ padding: 40 }}>
        <Header as="h1">Your Spotify Chart</Header>
        {playlistId && <ShareButtons playlistUrl={generatePlaylistUrlById(playlistId)} />}
        <Item.Group divided unstackable>
          {data && data.items.map((track, index) => {
            return <TrackItem key={track.id} order={index + 1} track={track} />;
          })}
        </Item.Group>
        <Button size="big" style={SPOTIFY_COLOR_STYLE} content="Create YourSpotifyChart Playlist" onClick={openCreatePlaylistModal} />
      </Container>
      {ModalComponent}
    </>
  );
};

export default MySpotifyChart;
