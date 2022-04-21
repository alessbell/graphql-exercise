import React from 'react'
import { countryCodeEmoji } from 'country-code-emoji';
import { useClient } from '../lib/client';
import { App } from '../components/layout'
import styles from '../styles/Home.module.css'

const ALL_COUNTRIES_QUERY = `
  {
    countries {
      code
      name
    }
  }
`;

export default function Home() {
  const [countries, setCountries] = React.useState([]);
  const { clientFetch, isLoading, isError } = useClient({
    query: ALL_COUNTRIES_QUERY,
  });

  React.useEffect(() => {
    clientFetch().then(({ data: { countries } }) => setCountries(countries)).catch(error => false);
  }, [clientFetch])

  if (isLoading) return <App><h1>Loading...</h1></App>
  if (isError) return <App><h1>No countries found :(</h1></App>

  return (
    <App>
      {countries.map(({ name, code }) => {
        return (
          <div className={styles.card} key={name}>{`${countryCodeEmoji(code)} ${name}`}</div>
        )
      })}
    </App>
  )
}
