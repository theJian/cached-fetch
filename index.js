const cachedFetch = (url, options) => {

  let expiry = 120; // default expiry 120 seconds

  if(typeof options === 'number') {
    expiry = options;
    options = undefined;
  } else if(typeof options === 'object') {
    expiry = options.seconds || expiry;
  }

  let cachedKey = url;
  let cachedItem = localStorage.getItem(cachedKey);
  let whenCached = localStorage.getItem(cachedKey + ';ts');
  if(cachedItem !== null && whenCached !== null) {
    let age = (Date.now() - whenCached) / 1000;
    if(age < expiry) {
      let response = new Response(new Blob([cachedItem]));
      return Promise.resolve(response);
    } else {
      // clean up this key
      localStorage.removeItem(cachedKey);
      localStorage.removeItem(cachedKey + ';ts');
    }
  }

  return fetch(url, options).then(response => {
    if(response.status === 200) {
      let ct = response.headers.get('Content-type');
      if(ct && (ct.match(/application\/json/i) || ct.match(/text\//i))) {
        response.clone().text().then(content => {
          localStorage.setItem(cachedKey, content)
          localStorage.setItem(cachedKey + ';ts', Date.now());
        });
      }
    }
    return response;
  });
}

export default cachedFetch;
