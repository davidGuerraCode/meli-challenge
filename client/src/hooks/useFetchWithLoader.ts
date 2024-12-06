import React from 'react';

type FetchCallReturn<T> = {
  data: T | null;
  status: number;
};

const useFetchWithLoader = () => {
  const [loading, setLoading] = React.useState(false);

  const controllerRef = React.useRef<AbortController | null>(null);

  interface FetchCall {
    call: Promise<Response>;
    controller: AbortController;
  }

  const callEndpoint = React.useCallback(async function callEndpoint<T>(
    fetchCall: FetchCall
  ): Promise<FetchCallReturn<T>> {
    if ('controller' in fetchCall) controllerRef.current = fetchCall.controller;
    setLoading(true);

    let result;

    try {
      const response = await fetchCall.call;
      result = {
        data: await response.json(),
        status: response.status,
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setLoading(false);

      result = {
        data: null,
        status: err.status,
      };
    }

    setLoading(false);

    return result;
  },
  []);

  const cancelEndpointCall = React.useCallback(() => {
    setLoading(false);

    if (controllerRef.current) {
      controllerRef.current.abort();
    }
  }, []);

  React.useEffect(() => {
    return () => cancelEndpointCall();
  }, [cancelEndpointCall]);

  return { loading, callEndpoint };
};

export default useFetchWithLoader;
