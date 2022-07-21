const express = require("express");
const pasport = require("passport");
const controller = require("../controllers/position");
const router = express.Router();

router.get(
  "/",
  pasport.authenticate("jwt", { session: false }),
  controller.getByPosition
);
router.get(
  "/:categoryId",
  pasport.authenticate("jwt", { session: false }),
  controller.getByCategoryId
);
router.post(
  "/",
  pasport.authenticate("jwt", { session: false }),
  controller.create
);
router.patch(
  "/:id",
  pasport.authenticate("jwt", { session: false }),
  controller.update
);
router.delete(
  "/:id",
  pasport.authenticate("jwt", { session: false }),
  controller.remove
);

module.exports = router;
