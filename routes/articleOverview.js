const router = require("express").Router();

/* GET articleOverview page */
router.get("/articleoverview", (req, res, next) => {
  res.render("articleOverview/articleOverview.hbs");
});


module.exports = router;