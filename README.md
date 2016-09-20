# cached-fetch
Cache fetched request in the browser.

## Usage

The `cached fetch` funtion APIs is same as `fetch` function, but with differences below.

It will cache calls in the browser and clear after a while. The default expiry time is 120 seconds.

```
cachedFetch('/data.json')
  .then(res => res.json())
  .then(json => console.log(json));
```

Passing a number of seconds as the second argument to customize expiry time individually.

```
cachedFetch('/data.json', 30 * 60) // clean up after 30 minutes
  ...
```

Another way is Adding a `seconds` key to the options object.

```
cachedFetch('/data.json', { seconds: 30 * 60 })
  ...
```

## License

MIT@A2ZH
