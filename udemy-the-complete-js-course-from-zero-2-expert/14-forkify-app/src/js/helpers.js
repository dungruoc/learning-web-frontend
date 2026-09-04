
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const fetchJson = async function(url, timeout_seconds) {
    try {
        const res = await Promise.race([fetch(url), timeout(timeout_seconds)]);
        if (!res.ok) {
            throw new Error(`Something wrong, fetching failed: ${res.status}`);
        }
        return await res.json();
    } catch (err) {
        // console.error(err);
        throw err;
    }
};
