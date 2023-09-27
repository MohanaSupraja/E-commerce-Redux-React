const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;
const generateToken = (id:string): string => {
  try {
    const token = jwt.sign({ id },  jwtSecret, { expiresIn: '1d' });
    console.log('Generated token:', token);
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    return "";
  }
};

export default generateToken;
