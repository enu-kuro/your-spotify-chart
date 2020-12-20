import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle({
  ':root': {
    '--main': 'white',
    '--bg': 'rgb(24, 24, 24)',
  },
});

export const StyledWrapper = styled.div({
  backgroundColor: 'var(--bg)',
  color: 'var(--main)',
});
