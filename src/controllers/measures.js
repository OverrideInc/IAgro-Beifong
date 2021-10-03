const { StatusCodes } = require('http-status-codes');
const measures = require('../repositories/measures');
const { MeasureSerializer } = require('../serializers');

const usersController = {
  create: async (req, res) => {
    const payload = req.body;

    const measure = await measures.create({ payload });
    const serialized = new MeasureSerializer({
      includeTimestamp: true,
    }).serialize(measure);

    res.status(StatusCodes.CREATED).json(serialized);
  },

  read: async (req, res) => {
    const measure = await measures.findLast();
    const serialized = new MeasureSerializer({
      includeTimestamp: true,
    }).serialize(measure);

    res.status(StatusCodes.OK).json(serialized);
  },
};

module.exports = usersController;
