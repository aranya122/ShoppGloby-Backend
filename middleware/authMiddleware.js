import jwt from 'jsonwebtoken';
export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.error('JWT verification error:', err);
                return res.sendStatus(403); // Forbidden
            }
            req.user = user; // Attach user info to the request
            console.log('Authenticated User:', req.user); // Log user information for debugging
            next();
        });
    } else {
        res.sendStatus(401); // Unauthorized
    }
};