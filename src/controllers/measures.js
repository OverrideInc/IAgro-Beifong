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
};

module.exports = usersController;
