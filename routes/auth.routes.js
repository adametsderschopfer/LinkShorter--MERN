const { Router } = require("express");
const router = Router();
const config = require('config')
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { check, validationResult } = require("express-validator");

// /api/auth/register
router.post(
  "/register",
  [
    check("email", "Некоректный email").isEmail(),
    check("password", "Минимальная длина пароля 6 символов").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          erros: errors.array(),
          message: "Некоректные данные при регистрации",
        });
      }

      const { email, password } = req.body

      const candidate = await User.findOne({ email });

      if (candidate) {
        res.status(400).json({ message: "Такой пользователь уже существует!" });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({ email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: "Пользователь успешно создан!" });
    } catch (error) {
      res
        .status(501)
        .json({ message: "Что-то пошло не так, попробуйте снова..." });
    }
  }
);

// /api/auth/login
router.post(
  "/login",
  [
    check("email", "Ввидите коректный email").normalizeEmail().isEmail(),
    check("password", "Введите пароль").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          erros: errors.array(),
          message: "Некоректные данные при входе в систему!",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Пользоваель не найден." });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Неверный пароль, попробуйте снова!" });
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '1h' }
      )

      res.json({ token, userId: user.id })

    } catch (error) {
      res
        .status(500)
        .json({ message: "Что-то пошло не так, попробуйте снова..." });
    }
  }
);

module.exports = router;
