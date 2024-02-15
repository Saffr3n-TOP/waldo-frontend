import { useState, useEffect } from 'react';

export default function useFetch() {
  const [error, setError] = useState<ApiError | undefined>();
  const [data, setData] = useState<ApiData | undefined>();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    waldoFetch('/', setError, setData, signal);
    return () => controller.abort();
  }, []);

  return { error, data, setError, setData };
}

export async function waldoFetch(
  url: string,
  setError: React.Dispatch<React.SetStateAction<ApiError | undefined>>,
  setData: React.Dispatch<React.SetStateAction<ApiData | undefined>>,
  signal?: AbortSignal
) {
  const response = await fetch(`http://localhost:3000${url}`, {
    signal,
    credentials: 'include'
  }).catch(() => new Error('Server Error'));

  if (response instanceof Error) {
    return setError({ status: 500, message: response.message });
  }

  const json: ApiJson | Error = await response
    .json()
    .catch(() => new Error('Server Error'));

  if (json instanceof Error) {
    return setError({ status: 500, message: json.message });
  }

  if (json.error) {
    return setError(json.error);
  }

  setData(json.data);
}
