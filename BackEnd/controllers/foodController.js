import Food from '../models/food.js';

const getAll = async (req, res, next) => {
  try {
    const foods = await Food.find();
    res.status(200).json({ success: true, data: foods });
  } catch (err) {
    next(err);
  }
};
const getById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const getIndividual = await Food.findById(id);
    if (!getIndividual) {
      return res.status(404).json({
        succes: false,
        msg: `the food with the id ${id} can't be found`,
      });
    }
    return res.status(200).json({
      succes: true,
      msg: 'the food with the id has been found',
      data: getIndividual,
    });
  } catch (err) {
    next(err);
  }
};
const create = async (req, res, next) => {
  const newFood = req.body;
  if (req.currentUser.role !== 'admin') {
     return res.status(403).json({ message: 'Not authorized' });
  }
  try {
    const createdFood = await Food.create(newFood);
    return res.status(200).json({
      success: true,
      msg: 'the food with the id has been found',
      data: createdFood,
    });
  } catch (err) {
    next(err);
  }
};
const updateById = async (req, res, next) => {
  const id = req.params['id'];

  try {
    if (req.currentUser.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const updatedFood = await Food.findByIdAndUpdate(id, req.body, {
      returnDocument: 'after',
      runValidators: true,
    });

    if (!updatedFood) {
      return res
        .status(404)
        .json({ message: `Food with id of ${id} not found` });
    }

    return res.status(200).json({
      succes: true,
      msg: 'the food with the id has been found',
      data: updatedFood,
    });
  } catch (err) {
    next(err);
  }
};
const deleteById = async (req, res, next) => {
  const id = req.params['id'];

  try {
    if (req.currentUser.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const deletedFood = await Food.findByIdAndDelete(id);
    if (!deletedFood) {
      return res
        .status(404)
        .json({ message: `Food with id of ${id} not found` });
    }
    return res.status(200).json({
      succes: true,
      msg: `the food with the id of ${id} was succesfully deleted`,
    });
  } catch (err) {
    next(err);
  }
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
