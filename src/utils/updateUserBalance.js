import { findUserById } from '../services/user/userCurrentService.js';
import createHttpError from 'http-errors';

export const updateUserBalance = async (
  userId,
  oldTransaction = null,
  newTransaction = null,
) => {
  const user = await findUserById(userId);

  if (!user) throw createHttpError(404, 'User not found');

  if (oldTransaction && newTransaction) {
    if (oldTransaction.type === 'expense' && newTransaction.type === 'income') {
      user.balance += oldTransaction.sum + newTransaction.sum;
    } else if (
      oldTransaction.type === 'income' &&
      newTransaction.type === 'expense'
    ) {
      user.balance -= oldTransaction.sum + newTransaction.sum;
    } else {
      const difference = newTransaction.sum - oldTransaction.sum;
      if (newTransaction.type === 'income') {
        user.balance += difference;
      } else if (newTransaction.type === 'expense') {
        user.balance -= difference;
      }
    }
  } else if (newTransaction) {
    if (newTransaction.type === 'income') {
      user.balance += newTransaction.sum;
    } else if (newTransaction.type === 'expense') {
      user.balance -= newTransaction.sum;
    }
  } else if (oldTransaction) {
    if (oldTransaction.type === 'income') {
      user.balance -= oldTransaction.sum;
    } else if (oldTransaction.type === 'expense') {
      user.balance += oldTransaction.sum;
    }
  }

  await user.save();
};
