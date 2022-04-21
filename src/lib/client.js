import React from 'react';
const API_URL = "http://countries.trevorblades.com";
const DELAY = 1100;

const flipCoin = Math.random() < 0.5;

export function useClient({ query } = {}) {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  const config = React.useMemo(() => ({
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ query })
  }), [query])

  const clientFetch = React.useCallback(() => fetch(API_URL, config)
    .then(async response => {
      if (response.ok && flipCoin) {
        return new Promise(resolve => {
          setTimeout(() => {
            setIsLoading(false)
            resolve(response.json());
          }, DELAY);
        })
      }
      const errorMessage = await response.text()
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          setIsLoading(false)
          setIsError(true)
          reject(new Error(errorMessage));
        }, DELAY);
      })
    }), [config])

  return {
    isLoading,
    isError,
    clientFetch
  }
}