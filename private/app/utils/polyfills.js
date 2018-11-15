export const addPolyfills = async () => {
  const features = {
    fetch: () => import('node-fetch'),
  };

  const [fetch] = await Promise.all(
    Object.entries(features).map(([feature, polyfill]) =>
      !(feature in global) ? Promise.resolve() : polyfill(),
    ),
  );

  if (fetch?.default) {
    const { Headers, Request, Response } = fetch;
    global.fetch = fetch.default;
    if (!('Headers' in global)) global.Headers = Headers;
    if (!('Request' in global)) global.Request = Request;
    if (!('Response' in global)) global.Response = Response;
  }
};
