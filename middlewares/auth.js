exports.preventAuthAccess = (req, res, next) => {
    const userId = req.signedCookies.userId;
    const userRole = req.signedCookies.userRole;

    if (userId) {
        if (userRole === "Admin") {
            return res.redirect("/admin/users");
        } else {
            return res.redirect("/");
        }
    }

    next();
};
