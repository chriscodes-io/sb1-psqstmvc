import WeatherReading from '../models/weatherReading.js';

export const createReading = async (req, res) => {
  try {
    const reading = await WeatherReading.create(req.body);
    res.status(201).json(reading);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createBatchReadings = async (req, res) => {
  try {
    const readings = await WeatherReading.insertMany(req.body);
    res.status(201).json(readings);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMaxPrecipitation = async (req, res) => {
  try {
    const fiveMonthsAgo = new Date();
    fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5);

    const reading = await WeatherReading.findOne({
      time: { $gte: fiveMonthsAgo }
    })
    .sort({ precipitation: -1 })
    .select('deviceName time precipitation');

    if (!reading) {
      return res.status(404).json({ message: 'No readings found' });
    }

    res.json(reading);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getStationData = async (req, res) => {
  try {
    const reading = await WeatherReading.findOne({
      deviceName: req.params.id
    })
    .select('temperature atmosphericPressure solarRadiation precipitation')
    .sort({ time: -1 });

    if (!reading) {
      return res.status(404).json({ message: 'Station not found' });
    }

    res.json(reading);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMaxTemperature = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const reading = await WeatherReading.findOne({
      time: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    })
    .sort({ temperature: -1 })
    .select('deviceName time temperature');

    if (!reading) {
      return res.status(404).json({ message: 'No readings found' });
    }

    res.json(reading);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};