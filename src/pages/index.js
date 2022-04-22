import React from "react";
import { countryCodeEmoji } from "country-code-emoji";
import { useClient } from "../hooks/useClient";
import { App } from "../components/layout";
import styles from "../styles/Home.module.css";

const ALL_COUNTRIES_QUERY = `
  {
    countries {
      code
      name
    }
  }
`;

export default function Countries() {
  const { data, isLoading, isError } = useClient({
    query: ALL_COUNTRIES_QUERY,
  });

  if (isLoading)
    return (
      <App>
        <h1>Loading...</h1>
      </App>
    );

  if (isError)
    return (
      <App>
        <h1>No countries found :(</h1>
      </App>
    );

  return (
    <App>
      {data?.countries.map(({ name, code }) => (
        <div className={styles.card} key={code}>{`${countryCodeEmoji(
          code
        )} ${name}`}</div>
      ))}
    </App>
  );
}
