import jwt from 'jsonwebtoken'
const JWT_SECRET = 'your_jwt_secret';

const fetchUser = (req, res, next) => {
    // Get the user from the JWT token and add id to req object
    const token = req.header('token');
    if (!token) {
        return res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate using a valid token' });
    }
}



export default fetchUser
