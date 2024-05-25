import jwt from 'jsonwebtoken';
import User from '../models/user_schema';

const SECRET_COOKIE_MESSAGE = process.env.SECRET_COOKIE_MESSAGE!;

const requireAuth = async (req: any, res: any, next: any) => {
  const token: string = req.cookies.auth_token;

  try {
    if (!token) return res.redirect('/user/v1/login');

    await getUser(token);
    
    next();
  } catch (error) {
    
    return res.redirect('/user/v1/login');
  }
}

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

interface Token {
  id: string
}

const getUser = (token: string) => {
  return jwt.verify(token, SECRET_COOKIE_MESSAGE, async (err: Error, decodedToken: Token) => {
    if (err) throw new Error('Invalid Cookie!')
    
    const user: UserObject = await User.findById(decodedToken.id);

    if (!user) throw new Error('User does not exist!');

    return user;
  });
}

export { requireAuth, getUser }