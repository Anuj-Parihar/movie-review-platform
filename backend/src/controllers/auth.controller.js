// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { z } from 'zod';
// import { User } from '../models/user.model.js';
// import { env } from '../config/env.js';
// import { validate } from '../middleware/validate.js';

// export const registerSchema = z.object({
//   body: z.object({
//     username: z.string().min(3).max(30),
//     email: z.string().email(),
//     password: z.string().min(6)
//   })
// });

// export const loginSchema = z.object({
//   body: z.object({
//     email: z.string().email(),
//     password: z.string().min(6)
//   })
// });

// export const register = [
//   validate(registerSchema),
//   async (req, res, next) => {
//     try {
//       const { username, email, password } = req.body;
//       const exists = await User.findOne({ $or: [{ email }, { username }] });
//       if (exists) return res.status(409).json({ message: 'Email or username already in use' });

//       const hash = await bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS);
//       const user = await User.create({ username, email, password: hash });

//       const token = jwt.sign({ id: user._id.toString(), role: user.role }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
//       res.status(201).json({
//         user: { id: user._id, username: user.username, email: user.email, role: user.role },
//         token
//       });
//     } catch (err) { next(err); }
//   }
// ];

// export const login = [
//   validate(loginSchema),
//   async (req, res, next) => {
//     try {
//       const { email, password } = req.body;
//       const user = await User.findOne({ email });
//       if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//       const ok = await bcrypt.compare(password, user.password);
//       if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

//       const token = jwt.sign({ id: user._id.toString(), role: user.role }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
//       res.json({
//         user: { id: user._id, username: user.username, email: user.email, role: user.role },
//         token
//       });
//     } catch (err) { next(err); }
//   }
// ];
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { User } from '../models/user.model.js';
import { env } from '../config/env.js';
import { validate } from '../middleware/validate.js';

const ADMIN_EMAIL = "ronakparihar0001@gmail.com";

export const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(6)
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6)
  })
});

export const register = [
  validate(registerSchema),
  async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const exists = await User.findOne({ $or: [{ email }, { username }] });
      if (exists) return res.status(409).json({ message: 'Email or username already in use' });

      const hash = await bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS);
      const role = email === ADMIN_EMAIL ? "admin" : "user";

      const user = await User.create({ username, email, password: hash, role });

      const token = jwt.sign({ id: user._id.toString(), role: user.role }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
      res.status(201).json({
        user: { id: user._id, username: user.username, email: user.email, role: user.role },
        token
      });
    } catch (err) { next(err); }
  }
];

export const login = [
  validate(loginSchema),
  async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });

      const ok = await bcrypt.compare(password, user.password);
      if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

      // 🔑 If admin email logs in, upgrade role to admin automatically
      if (email === ADMIN_EMAIL && user.role !== "admin") {
        user.role = "admin";
        await user.save();
      }

      const token = jwt.sign({ id: user._id.toString(), role: user.role }, env.JWT_SECRET, { expiresIn: env.JWT_EXPIRES_IN });
      res.json({
        user: { id: user._id, username: user.username, email: user.email, role: user.role },
        token
      });
    } catch (err) { next(err); }
  }
];
// inside src/controllers/auth.controller.js (after login/register exports)
export const me = async (req, res, next) => {
  try {
    const user = await User.findById(req.user?.id).select('-password').lean();
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) { next(err); }
};

