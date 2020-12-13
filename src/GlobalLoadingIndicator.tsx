import React from 'react';
import { createPortal } from 'react-dom';
import { useIsFetching } from 'react-query';
import { Dimmer, Loader } from 'semantic-ui-react';

const GlobalLoadingIndicator: React.FC = () => {
  const isFetching = useIsFetching();
  return (
    <>
      {isFetching > 0
    && createPortal(
      <Dimmer active inverted style={{ position: 'fixed', width: '100%', height: '100%' }}>
        <Loader inverted />
      </Dimmer>,
      document.body,
    )}
    </>
  );
};
export default GlobalLoadingIndicator;
