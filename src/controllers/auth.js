import { loginUser, registerUser } from '../services/auth.js';

export const registerController = async (req, res) => {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  const registeredUser = await registerUser(payload);

  res.status(201).send({
    status: 201,
    message: 'Successfully registered a user!',
    data: registeredUser,
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  const session = await loginUser(email, password);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.send({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
