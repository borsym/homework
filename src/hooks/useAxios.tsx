import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

type FetchStatus = 'idle' | 'loading' | 'success' | 'error';

interface FetchState<T> {
  status: FetchStatus;
  data: T | null;
  error: AxiosError<T> | null;
}

function useAxios<T>(url: string, options: AxiosRequestConfig): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<FetchStatus>('idle');
  const [error, setError] = useState<AxiosError<T> | null>(null);

  const fetchData = async (url: string, options?: AxiosRequestConfig) => {
    setStatus('loading');

    try {
      const response = await axios(url, options);
      setData(response.data);
      setStatus('success');
    } catch (error: unknown) {
      setError(error as AxiosError<T>);
      setStatus('error');
    }
  };

  useEffect(() => {
    fetchData(url, options);
    return () => {};
  }, []);

  return { status, data, error };
}

export default useAxios;
