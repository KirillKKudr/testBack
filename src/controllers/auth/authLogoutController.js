import { logoutUser } from '../../services/auth/authLogoutService.js';

export const logoutUserController = async (req, res) => {
  await logoutUser(req.user._id);

  res.sendStatus(204);
};
