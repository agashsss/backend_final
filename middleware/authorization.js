const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.cookies.access_token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, process.env.SECRET);
        req.userId = data.id;
        req.userRoles = data.roles;
        return next();
    } catch {
        return res.sendStatus(403);
    }
};