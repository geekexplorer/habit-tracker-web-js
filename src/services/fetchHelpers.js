import { TIMEOUT_SEC } from "../config.js";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`The request timed out after ${s} seconds`));
    }, s * 1000);
  });
};

const POST = "POST";
const PUT = "PUT";
const DELETE = "DELETE";
const HEADERS = {
  "Content-Type": "application/json",
};

export const REST = {
  Get: async function (url) {
    try {
      const fetchPromise = fetch(url, { cache: "no-store" });
      const response = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`${data.message} (${response.status})`);
      }

      return data;
    } catch (err) {
      throw err;
    }
  },

  Post: async function (url, uploadData = undefined) {
    if (!uploadData) return;
    try {
      const fetchPromise = fetch(url, {
        method: POST,
        headers: HEADERS,
        body: JSON.stringify(uploadData),
        cache: "no-cache",
      });

      const response = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(`${data.message} (${response.status})`);
      }

      return data;
    } catch (err) {
      throw err;
    }
  },

  Put: async function (url, uploadData) {
    if (!uploadData) return;
    try {
      const fetchPromise = fetch(url, {
        method: PUT,
        headers: HEADERS,
        body: JSON.stringify(uploadData),
      });

      const response = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);

      if (!response.ok) {
        throw new Error(`(${response.status}) ${response.statusText}`);
      }
    } catch (err) {
      throw err;
    }
  },

  Delete: async function (url) {
    try {
      const fetchPromise = fetch(url, {
        method: DELETE,
        headers: HEADERS,
      });

      const response = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);

      if (!response.ok) {
        throw new Error(`(${response.status}) ${response.statusText}`);
      }
    } catch (err) {
      throw err;
    }
  },
};
