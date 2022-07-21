const Position = require("../models/Position");
const errorHandler = require("../utils/errorHandler");

module.exports.getByPosition = async function (req, res) {
  try {
    const positions = await Position.find({ user: req.user.id });
    res.status(200).json(positions);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getByCategoryId = async function (req, res) {
  try {
    const position = await Position.find({
      category: req.params.categoryId,
      user: req.user.id,
    });
    res.statuts(200).json(position);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async function (req, res) {
  try {
    const position = await new Position({
      name: req.body.name,
      condition: req.body.condition,
      update: req.body.update,
      category: req.body.category,
      user: req.user.id,
    }).save();
    res.status(201).json(position);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.remove = async function (req, res) {
  try {
    await Position.remove({ _id: req.params.id });
    res.status(200).json({
      message: "Задача була видаленна.",
    });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async function (req, res) {
  try {
    const position = await Position.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    console.log(req.body);
    res.status(200).json(position);
  } catch (e) {
    errorHandler(res, e);
  }
};
