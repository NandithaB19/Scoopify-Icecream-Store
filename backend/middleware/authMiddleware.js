const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
try {

const userId = req.headers.userid;

if (!userId) {
return res.status(401).json({ message: "User ID missing" });
}

const user = await User.findById(userId);

if (!user) {
return res.status(401).json({ message: "User not found" });
}

if (user.role !== "admin") {
return res.status(403).json({ message: "Admin access only" });
}

next();

} catch (error) {
res.status(500).json({ message: "Authorization failed" });
}
};

module.exports = adminMiddleware;