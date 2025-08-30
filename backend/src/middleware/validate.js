// src/middleware/validate.js
import mongoose from "mongoose";

export function validate(schema) {
  return (req, res, next) => {
    try {
      const data = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query
      });

      // ✅ merge instead of reassign
      if (data.body) Object.assign(req.body, data.body);
      if (data.params) Object.assign(req.params, data.params);
      if (data.query) Object.assign(req.query, data.query);

      next();
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: err.errors });
    }
  };
}

export function validateObjectId(paramKey = "id") {
  return (req, res, next) => {
    if (!mongoose.isValidObjectId(req.params[paramKey])) {
      return res
        .status(400)
        .json({ message: `Invalid ObjectId in :${paramKey}` });
    }
    next();
  };
}
