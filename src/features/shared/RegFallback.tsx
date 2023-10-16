import React, { ReactNode, memo } from 'react';
import { ErrorMessage } from '../expression/ErrorMessage';

type Props = {
  children: ReactNode;
  isError: boolean;
  errorMessage?: string;
}

export const RegFallback = memo(({ children, isError, errorMessage = "regexp error" }: Props) => {
  return (
    <>
      {isError && <ErrorMessage message={errorMessage} />}
      <div className='h-100' style={{ visibility: isError ? "collapse" : "visible" }}>{children}</div>
    </>
  );
});
