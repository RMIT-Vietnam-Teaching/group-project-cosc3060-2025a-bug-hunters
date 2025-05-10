exports.preventAuthAccess = (req, res, next) => {
    const userId = req.signedCookies.userId;
    const userRole = req.signedCookies.userRole;

    if (userId) {
        const path = req.originalUrl;

        if (userRole === "Admin" && !path.startsWith("/admin")) {
            return res.redirect("/admin/users");
        }
        if (userRole !== "Admin" && path !== "/") {
            return res.redirect("/");
        }
    }

    return next();
};

exports.requireOwnUserAccess = (req, res, next) => {
    const loggedInUserId = req.signedCookies.userId;
    const routeUserId = req.params.userId;

    if (!loggedInUserId || loggedInUserId !== routeUserId) {
        return res.status(403).send("Unauthorized access.");
    }

    next();
};
