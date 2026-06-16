const cache = new Map<string, object>();
const inflight = new Map<string, Promise<object>>();

export function getCachedLottie(src: string) {
  return cache.get(src) ?? null;
}

export function loadLottie(src: string): Promise<object> {
  const cached = cache.get(src);
  if (cached) return Promise.resolve(cached);

  const pending = inflight.get(src);
  if (pending) return pending;

  const request = fetch(src)
    .then((response) => {
      if (!response.ok) throw new Error(`Failed to load ${src}`);
      return response.json() as Promise<object>;
    })
    .then((data) => {
      cache.set(src, data);
      inflight.delete(src);
      return data;
    })
    .catch((error) => {
      inflight.delete(src);
      throw error;
    });

  inflight.set(src, request);
  return request;
}
