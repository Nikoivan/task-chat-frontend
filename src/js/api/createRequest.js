const createRequest = async (options) => {
  const { url, method, mode, body, headers } = options;
  const response = await fetch(url, {
    method,
    mode,
    body,
    headers,
  });

  const json = await response.json();
  return json;
};

export default createRequest;
