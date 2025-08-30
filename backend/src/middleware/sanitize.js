// src/middleware/sanitize.js
export function sanitize() {
  // remove keys with $ or . from objects (deep)
  const cleanObject = (value) => {
    if (value == null) return value;
    if (typeof value !== 'object') return value;
    if (Array.isArray(value)) return value.map(cleanObject);

    const out = {};
    for (const key of Object.keys(value)) {
      if (key.includes('$') || key.includes('.')) {
        // skip dangerous key
        continue;
      }
      out[key] = cleanObject(value[key]);
    }
    return out;
  };

  return (req, res, next) => {
    try {
      if (req.body) req.body = cleanObject(req.body);
      if (req.params) req.params = cleanObject(req.params);

      // req.query might be getter-only in some environments — try assignment,
      // and if it fails, mutate the existing object instead.
      const cleanedQuery = cleanObject(req.query || {});
      try {
        req.query = cleanedQuery; // common case
      } catch (err) {
        // fallback: mutate in-place to avoid assigning to a getter-only property
        const q = req.query || {};
        // remove dangerous keys first
        for (const k of Object.keys(q)) {
          if (k.includes('$') || k.includes('.')) delete q[k];
        }
        // copy cleaned values
        for (const k of Object.keys(cleanedQuery)) q[k] = cleanedQuery[k];
        // note: no assignment to req.query so getter-only won't throw
      }

      // headers rarely need deep cleaning, but remove dangerous header keys
      if (req.headers) {
        for (const hk of Object.keys(req.headers)) {
          if (hk.includes('$') || hk.includes('.')) delete req.headers[hk];
        }
      }
      next();
    } catch (e) {
      // if sanitizer itself errors, don't break the app — log and continue
      console.error('Sanitize middleware error', e);
      next();
    }
  };
}
