const apiCall = async (url, signal) => await (await fetch(url, { signal })).json();

const API_CONFIG = {
  baseURL: 'https://swapi.dev/api/',
};

export const API_SERVICES = {
  getServices: (service, signal) => new Promise((res, rej) => {
    try {
      res(apiCall(service || API_CONFIG.baseURL, signal));
    } catch(err) {
      rej(err);
    }
  }),
};

export const ABORT = {
  controller: null,
  signal: null,
  abort: () => {
    ABORT.controller = ABORT.controller || new AbortController();
    ABORT.controller.abort();
  },
  new: () => {
    ABORT.controller = new AbortController();
    ABORT.signal = ABORT.controller.signal;
    return {
      signal: ABORT.signal,
    }
  }
}