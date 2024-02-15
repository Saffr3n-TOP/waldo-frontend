import { useState, useEffect } from 'react';

export default function useFetch(url: string) {
  const [error, setError] = useState<ApiError | undefined>();
  const [data, setData] = useState<ApiData | undefined>();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    (async () => {
      const response = await fetch(url, { signal }).catch(
        () => new Error('Server Error')
      );

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
    })();

    return () => controller.abort();
  }, [url]);

  return { error, data };
}
