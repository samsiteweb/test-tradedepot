import jwt from 'jsonwebtoken';

export const verifyToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  let isExpired = false;
  if (user) {
    const decodedToken = jwt.decode(user.token);
    const dateNow = new Date();

    if (decodedToken.exp < dateNow / 1000) {
      isExpired = true;
    }
  }
  
 
  return isExpired;
};
