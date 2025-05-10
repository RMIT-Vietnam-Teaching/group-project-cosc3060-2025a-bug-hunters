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
   
        exports.requireOwnUserAccess = (req, res, next) => {
            const loggedInUserId = req.signedCookies.userId;
            const routeUserId = req.params.userId;
          
            console.log("🔐 Logged-in user ID from cookie:", loggedInUserId);
            console.log("🧭 Route param user ID:", routeUserId);
          
            if (!loggedInUserId || loggedInUserId !== routeUserId) {
              return res.status(403).send("Unauthorized access.");
            }
          
            next();
          };
          