import React from 'react';
const API_URL = "https://countries.trevorblades.com";
const DELAY = 1100;

const flipCoin = Math.random() < 0.5;

const initialState = { loading: true, error: false, data: undefined };

function reducer(state, action) {
  switch (action.type) {
    case 'loadingFalse':
      return { ...state, loading: false };
    case 'hasError':
      return { ...state, loading: false, error: true };
    case 'setData':
      return { ...state, data: state.data }
    default:
      throw new Error();
  }
}

export function useClient({ query } = {}) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  // const [loading, setLoading] = React.useState(true);
  // const [error, setError] = React.useState(false);
  // const [data, setData] = React.useState(undefined);

  React.useEffect(() => {
    clientFetch()
      .then(({ data }) => setData(data))
      .catch((error) => ({
        // noop
      }));
  }, []);

  const config = React.useMemo(
    () => ({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ query }),
    }),
    [query]
  );

  const clientFetch = React.useCallback(
    () =>
      fetch(API_URL, config).then(async (response) => {
        // simulate flaky network call
        if (response.ok && flipCoin) {
          return new Promise((resolve) => {
            setTimeout(() => {
              dispatch({ type: 'loadingFalse' })
              resolve(response.json());
            }, DELAY);
          });
        }

        const errorMessage = await response.text();
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            dispatch({ type: 'hasError' });
            reject(new Error(errorMessage));
          }, DELAY);
        });
      }),
    [config]
  );

  return {
    data,
    loading,
    error,
    clientFetch,
  };
}
