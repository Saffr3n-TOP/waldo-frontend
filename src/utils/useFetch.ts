import { useState, useEffect } from 'react';

export default function useFetch() {
  const [error, setError] = useState<ApiError | undefined>();
  const [data, setData] = useState<ApiData | undefined>();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    waldoFetch('/', signal).then((result) => {
      if (result instanceof Error) {
        return setError(result);
      }
      return setData(result);
    });

    return () => controller.abort();
  }, []);

  return { error, data, setError, setData };
}

export async function waldoFetch(url: string, signal?: AbortSignal) {
  const response = await fetch(`http://localhost:3000${url}`, {
    signal,
    credentials: 'include'
  }).catch(() => new Error('Server Error'));

  if (response instanceof Error) {
    const err = new Error(response.message);
    err.status = 500;
    return err;
  }

  const json: ApiJson | Error = await response
    .json()
    .catch(() => new Error('Server Error'));

  if (json instanceof Error) {
    const err = new Error(json.message);
    err.status = 500;
    return err;
  }

  if (json.error) {
    const err = new Error(json.error.message);
    err.status = json.error.status;
    return err;
  }

  return json.data;
}
