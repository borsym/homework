import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import axios, { AxiosError } from 'axios';
import { FC } from 'react';

interface Props {
  status?: string;
  loading?: boolean;
  data: any | null;
  error?:
    | AxiosError<any>
    | null
    | FetchBaseQueryError
    | SerializedError
    | undefined;
  children: JSX.Element;
}

export const RenderLoadingError: FC<Props> = ({
  status,
  data,
  error,
  children,
  loading,
}) => {
  if (status === 'loading' || loading) {
    return <p>Loading...</p>;
  }

  if (status === 'error' || error) {
    if (axios.isAxiosError(error)) {
      return <p>{error?.message || 'An error occurred'}</p>;
    }

    return <p>An error occurred</p>;
  }

  if (!data) {
    return null;
  }

  return <>{children}</>;
};
