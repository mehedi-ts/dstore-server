const { mongoose } = require("mongoose");
const createHttpError = require("http-errors");

const getItemById = async (id, model) => {
  if (!mongoose.isValidObjectId(id)) {
    throw createHttpError(400, `Invalid ${model.modelName} ID`);
  }
  const item = await model.findById(id);
  if (!item) {
    throw createHttpError(404, `${model.modelName} Not Found`);
  }
  return item;
};
module.exports = getItemById;
