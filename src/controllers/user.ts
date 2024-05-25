import User from '../models/user_schema';
import { getUser } from '../middlewares/auth_token';
import { isEmail } from 'validator';
import { Request, Response } from 'express';

const profile = async (req: Request, res: Response) => {
  const token = req.cookies.auth_token;
  if (!token) return res.json({ error: 'User not authenticated!' });

  interface UserObject {
    first_name: string,
    userName: string
    last_name: string,
    email: string,
    isAdmin: boolean,
    password: string,
    phone_number: number,
    _id: string
  }

  try {
    const user: UserObject = await getUser(token);
    if (!user) return res.json({ error: 'Error' });

    const { password, _id, ...rest } = user;
    return res.status(200).json({ data: rest });

  } catch (err) {
    return res.status(500).json({ error: 'Internal Server Error!' })
  }
};

const update_user = async (req: Request, res: Response) => {
  const { first_name, last_name, phone_number } = req.body;

  const token = req.cookies.auth_token;

  interface Object {
    [key: string]: any
  }

  try {
    const user: UserObject = await getUser(token)
    user.first_name = first_name;
    user.last_name = last_name;
    user.phone_number= phone_number;
    await user.save();

    return res.json({ message: 'user updated successfully!' })
  } catch (err) {
    return res.json({ error: 'user update failed!' })
  }
};

const delete_user = (req: Request, res: Response) => {

};

const update_email = () => {}

const forgot_password = () => {}

const verify_otp = () => {}

const reset_password = () => {}

export { delete_user, profile, update_user, reset_password, verify_otp, forgot_password, update_email };
