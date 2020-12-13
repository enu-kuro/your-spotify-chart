import { useContext } from 'react';
import { ApiErrorContext, ApiErrorContextValueType } from 'ApiError/ApiErrorProvider';

export const useApiError = (): ApiErrorContextValueType => {
  const { error, setError, removeError } = useContext(ApiErrorContext);
  return { error, setError, removeError };
};
