exports.renderAboutUsPage = async (req, res) => {
    try {
        res.render("AboutUs");
    } catch (error) {
        console.log("Error rendering register page:", error);
    }
};

