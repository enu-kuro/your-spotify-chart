import { useState, useCallback, useContext } from 'react';
import { AuthContext } from 'Auth';

export const useModal = (
  initialValue = false,
): [boolean, () => void, (
  ) => void] => {
  const [isShowModal, setValue] = useState(initialValue);
  const openModal = useCallback(() => setValue(true), []);
  const closeModal = useCallback(() => setValue(false), []);
  return [isShowModal, openModal, closeModal];
};

export const useRequestHeaders = ():{Authorization: string} => {
  const { accessToken } = useContext(AuthContext);
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};
