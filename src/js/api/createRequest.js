const createRequest = async (options) => {
  const { url, method, mode, body, headers } = options;
  const response = await fetch(url, {
    method,
    mode,
    body,
    headers,
  });

  const json = await response.json();
  console.log(json);
};

export default createRequest;
