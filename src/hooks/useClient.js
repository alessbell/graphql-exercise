import React from 'react';
const API_URL = "https://countries.trevorblades.com";
const DELAY = 1100;

const flipCoin = Math.random() < 0.5;

export function useClient({ query } = {}) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [data, setData] = React.useState(undefined);

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
              setLoading(false);
              resolve(response.json());
            }, DELAY);
          });
        }

        const errorMessage = await response.text();
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            setLoading(false);
            setError(true);
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
