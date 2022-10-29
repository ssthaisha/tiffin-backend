import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 's@g.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'jhs@g.com',
    password: bcrypt.hashSync('abcdef', 10),
    isAdmin: true,
  },
  {
    name: 'Jane User',
    email: 'sj@g.com',
    password: bcrypt.hashSync('coolpw', 10),
    isAdmin: true,
  },
];

export default users;