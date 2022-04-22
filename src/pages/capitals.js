import React from "react";
import { useClient } from "../hooks/useClient";
import { App } from "../components/layout";
import styles from "../styles/Home.module.css";

const ALL_COUNTRIES_QUERY = `
  {
    countries {
      capital
      emoji
    }
  }
`;

export default function Capitals() {
  const { data, loading, error } = useClient({
    query: ALL_COUNTRIES_QUERY,
  });

  if (loading)
    return (
      <App>
        <h1>Loading...</h1>
      </App>
    );

  if (error)
    return (
      <App>
        <h1>No country capitals found :(</h1>
      </App>
    );

  return (
    <App>
      {data?.countries.map(({ capital, emoji }) => (
        <div className={styles.card} key={emoji}>{`${emoji} ${capital || ''}`}</div>
      ))}
    </App>
  );
}
