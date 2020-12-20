import React from 'react';
import {
  Button,
  Container, Header, Item,
} from 'semantic-ui-react';
import { useMySpotifyChart } from 'Pages/MySpotifyChart/hooks';
import { generatePlaylistUrlById } from 'Pages/MySpotifyChart/utils';
import { ShareButtons } from 'Pages/MySpotifyChart/components';
import { StyledWrapper } from 'Pages/MySpotifyChart/style';

const TrackItem:React.FC<{order:number, track: SpotifyApi.TrackObjectFull}> = ({ order, track }) => {
  return (
    <Item>
      <div className="order"><span>{order}</span></div>
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
      <StyledWrapper>
        <Container style={{ padding: 40 }}>
          <Header as="h1">YourSpotifyChart</Header>
          {playlistId && <ShareButtons playlistUrl={generatePlaylistUrlById(playlistId)} />}
          <Item.Group divided unstackable>
            {data && data.items.map((track, index) => {
              return <TrackItem key={track.id} order={index + 1} track={track} />;
            })}
          </Item.Group>
          <Button size="big" content="Create YourSpotifyChart Playlist" onClick={openCreatePlaylistModal} />
        </Container>
      </StyledWrapper>
      {ModalComponent}
    </>
  );
};

export default MySpotifyChart;
