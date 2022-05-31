const jwt = require("jsonwebtoken");

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "user is unauthorized"})
            }

            

            let hasRole = false;

            if (!hasRole) {
                return res.status(403).json({message: "have no access"})
            }
            next();
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "user is unauthorized"})
        }
    }
};