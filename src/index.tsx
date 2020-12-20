import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Auth from 'Auth';
import ApiErrorProvider from 'ApiError/ApiErrorProvider';
import ApiErrorNotification from 'ApiError/ApiErrorNotification';
import 'semantic-ui-css/semantic.min.css';
import ErrorBoundary from 'ErrorBoundary';
import GlobalLoadingIndicator from 'GlobalLoadingIndicator';
import AppRoutes from 'Routes';
import { StyledWrapper, GlobalStyle } from 'style';

ReactDOM.render(
  <>
    <GlobalStyle />
    <StyledWrapper>
      <ErrorBoundary>
        <BrowserRouter>
          <ApiErrorProvider>
            <Auth>
              <AppRoutes />
            </Auth>
            <ApiErrorNotification />
            <GlobalLoadingIndicator />
          </ApiErrorProvider>
        </BrowserRouter>
      </ErrorBoundary>
    </StyledWrapper>
  </>,
  document.getElementById('root'),
);
