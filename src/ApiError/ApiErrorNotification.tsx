import * as React from 'react';
import { createPortal } from 'react-dom';
import {
  Button, Container, Modal,
} from 'semantic-ui-react';
import { getAuthUrl } from 'Auth';
import { useApiError } from 'ApiError/hooks';

export const ErrorModal: React.FC<{
  closeModal: () => void;
  message?: string | JSX.Element | null;
  closeCallback?: (() => void) | null;
}> = ({ closeModal, message = 'エラーが発生しました。', closeCallback }) => {
  return (
    <Modal open size="mini">
      <Modal.Content>
        <Modal.Description>
          {message}
        </Modal.Description>
      </Modal.Content>
      <Container textAlign="center" style={{ padding: 10 }}>
        <Button
          content="OK"
          onClick={() => {
            if (closeCallback) {
              closeCallback();
            }
            closeModal();
          }}
          color="brown"
        />
      </Container>
    </Modal>
  );
};

const STATUS_CODE_TO_MESSAGE:{[key: number]:string | JSX.Element} = { 401: <div>アクセストークンが無効です。<br />Spotifyからアクセストークンを再取得します。</div>, 403: '権限がありません。' };

const reauth = () => {
  const authUrl = getAuthUrl();
  window.location.href = authUrl;
};

const ApiErrorNotification: React.FC = () => {
  const { error, removeError } = useApiError();
  return (
    <>
      {error
        && createPortal(
          <ErrorModal
            closeModal={removeError}
            message={
              error.message
              || (error.statusCode && STATUS_CODE_TO_MESSAGE[error.statusCode])
              || undefined
            }
            closeCallback={
              error.statusCode && [401, 403].includes(error.statusCode) ? reauth : null
          }
          />,
          document.body,
        )}
    </>
  );
};

export default ApiErrorNotification;
