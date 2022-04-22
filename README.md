# GraphQL Exercise

Keeping your work within a 1 hour range, design and develop a React component that fetches a list of countries from a remote GraphQL API, then displays the retrieved country names in an HTML list.

```js
const API_URL = "http://countries.trevorblades.com";

const ALL_COUNTRIES_QUERY = `
  {
    countries {
      code
      name
    }
  }
`;

function Countries() {
  // ... the ALL_COUNTRIES_QUERY is sent to the GraphQL API_URL to get the list
  // of countries ...

  return (
    <div className="countries">
      {/* ... something happens here to show the list of countries ... */}
    </div>
  );
}
```

The Countries component should provide a good user experience by showing appropriate loading states to help keep users informed on data loading progress, and by gracefully/effectively handling network errors.

The approach used to fetch remote data should be designed to be re-usable by other components with different GraphQL queries.

Please feel free to use whichever development tools you prefer; we will review and discuss your implementation via a screen share during the interview call.

If you can send us a copy of your code before the interview (e.g. share a link to GitHub repo, a link to the code in an online code editor, etc.), that would be helpful.
