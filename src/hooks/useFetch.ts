import { useEffect, useReducer, useRef } from 'react';

interface State<T> {
  data?: T;
  error?: Error;
}

type Action<T> =
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error };

type Cache<T> = { [url: string]: T };

function useFetch<T>(url?: string) {
  const cache = useRef<Cache<T>>({});

  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'loading':
        return {};
      case 'fetched':
        return { data: action.payload };
      case 'error':
        return { error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, {});

  useEffect(() => {
    // Do nothing if the url is not given
    if (!url) return;

    const abortController = new AbortController();

    const fetchData = async () => {
      dispatch({ type: 'loading' });

      // If a cache exists for this url, return it
      if (cache.current[url]) {
        dispatch({ type: 'fetched', payload: cache.current[url] });
        return;
      }

      try {
        const response = await fetch(url, { signal: abortController.signal });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = (await response.json()) as T;

        // Cache the response
        cache.current[url] = data;

        dispatch({ type: 'fetched', payload: data });
      } catch (error) {
        if (abortController.signal.aborted) {
          return;
        }

        dispatch({ type: 'error', payload: error as Error });
      }
    };

    fetchData();

    // Use the cleanup function for avoiding a possibly
    // state update after the component was unmounted
    return () => {
      abortController.abort();
    };
  }, [url]);

  return state;
}

export default useFetch;
