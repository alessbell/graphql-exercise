import React from "react";
import { useClient } from "../hooks/useClient";
import { App } from "../components/layout";
import styles from "../styles/Home.module.css";

const ALL_COUNTRIES_QUERY = `
  {
    countries {
      code
      name
      emoji
    }
  }
`;

export default function Countries() {
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
        <h1>No countries found :(</h1>
      </App>
    );

  return (
    <App>
      {data?.countries.map(({ name, code, emoji }) => (
        <div className={styles.card} key={code}>{`${emoji} ${name}`}</div>
      ))}
    </App>
  );
}
