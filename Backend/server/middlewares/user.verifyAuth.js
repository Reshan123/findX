// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');

// const authMiddleware = (role) => {
//     return (req, res, next) => {
//         const authHeader = req.headers.authorization;
        
//         if (!authHeader || !authHeader.startsWith('Bearer ')) {
//             return res.status(401).json({ message: 'Access denied. No token provided or invalid token format.' });
//         }

//         const token = authHeader.split(' ')[1];

//         try {
//             const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
//             req.user = {
//                 id: decodedToken.id,
//                 role: decodedToken.role
//             };

//             // Check for role-based access
//             if (role && req.user.role !== role) {
//                 return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
//             }

//             next();
//         } catch (error) {
//             return res.status(401).json({ message: 'Invalid or expired token.' });
//         }
//     };
// };

// module.exports = authMiddleware;

const jwt = require('jsonwebtoken');

const authMiddleware = (role) => {
    return (req, res, next) => {
        console.log("hh")
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access denied. No token provided or invalid token format.' });
        }

        const token = authHeader.split(' ')[1];

        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            req.user = {
                id: decodedToken.id,
                role: decodedToken.role
            };

            // Check for role-based access
            if (role && req.user.role !== role) {
                return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
            }

            next();
        } catch (error) {
            console.error('Token verification error:', error.message);
            return res.status(401).json({ message: 'Invalid or expired token.' });
        }
    };
};

module.exports = authMiddleware;
