import { AxiosError } from 'axios';
import { FC } from 'react';

interface Props {
  status: string;
  data: any | null;
  error?: AxiosError<any> | null;
  children: JSX.Element;
}

export const RenderLoadingError: FC<Props> = ({
  status,
  data,
  error,
  children,
}) => {
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <p>{error?.message || 'An error occurred'}</p>;
  }

  if (!data) {
    return null;
  }

  return <>{children}</>;
};
