const getHandler = async (config) => {
  const { url } = config;
  const result = await fetch(url, { ...config });
  return { status: result.status, ok: result.ok, ...result.json() };
};

const postHandler = async (config) => {
  const { url } = config;
  const result = await fetch(url, { ...config });
  return { status: result.status, ok: result.ok, ...result.json() };
};

const requestHandler = (config) => {
  const { method, uri } = config;
  const url = `${process.env.API_BASE_URL}${uri}`;
  if (method.toLowerCase() === 'get') return getHandler({ ...config, url });
  if (method.toLowerCase() === 'post') return postHandler({ ...config, url });
  return fetch({ ...config, url }).json();
};

export default requestHandler;
