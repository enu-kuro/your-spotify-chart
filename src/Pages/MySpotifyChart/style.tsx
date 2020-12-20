import styled from 'styled-components';

export const StyledWrapper = styled.div({
  '.ui.unstackable.items>.item>.image, .ui.unstackable.items>.item>.image>img': {
    width: '40px!important', objectFit: 'contain',
  },
  '.ui.unstackable.items>.item>.image': {
    display: 'flex',
  },
  '.ui.divided.items>.item': {
    padding: '10px 0',
    borderBottom: '1px solid rgb(170, 170, 170)',
  },
  '.ui.divided.items>.item:last-child': {
    paddingBottom: '10px!important',
  },
  '.ui.divided.items>.item>.order': {
    minWidth: 20,
    margin: 'auto 1em',
    textAlign: 'center',
  },
  '.ui.items>.item>.content>.description, .ui.items>.item .meta': {
    color: 'var(--main)',
  },
  '.ui.header': {
    fontFamily: 'Montserrat, sans-serif',
    color: 'var(--main)',
  },
  '.ui.button': {
    backgroundColor: 'var(--bg)',
    color: 'var(--main)',
    border: '1px solid var(--main)',
    hover: 'rgb(200, 200, 200)',
  },
  '.ui.button:hover': {
    backgroundColor: 'rgb(40, 40, 40)',
  },
});
