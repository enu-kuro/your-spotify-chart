// https://medium.com/yld-blog/handling-global-notifications-with-reacts-context-api-7d8135510d50
import React, { useState, useCallback } from 'react';

export class ApiError extends Error {
    public statusCode?: number;
    constructor(message? : string, statusCode? : number) {
      super(message);
      this.statusCode = statusCode;
    }
}

export type ApiErrorContextValueType = {
    error?: ApiError | null
    setError: (error:ApiError) => void,
    removeError: () => void
  }
export const ApiErrorContext = React.createContext({} as ApiErrorContextValueType);

const ApiErrorProvider:React.FC = ({ children }) => {
  const [error, setError] = useState<ApiError | null>(null);

  const removeError = () => setError(null);

  const contextValue = {
    error,
    setError,
    removeError: useCallback(() => removeError(), []),
  };

  return (
    <ApiErrorContext.Provider value={contextValue}>
      {children}
    </ApiErrorContext.Provider>
  );
};

export default ApiErrorProvider;
