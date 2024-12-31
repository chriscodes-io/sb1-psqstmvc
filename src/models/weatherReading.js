import mongoose from 'mongoose';

const weatherReadingSchema = new mongoose.Schema({
  deviceName: {
    type: String,
    required: true,
    index: true
  },
  time: {
    type: Date,
    required: true
  },  // Removed index: true since we're defining it separately
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  temperature: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return v >= -50 && v <= 60;
      },
      message: 'Temperature must be between -50°C and 60°C'
    }
  },
  atmosphericPressure: {
    type: Number,
    required: true
  },
  maxWindSpeed: {
    type: Number,
    required: true
  },
  solarRadiation: {
    type: Number,
    required: true
  },
  vaporPressure: {
    type: Number,
    required: true
  },
  humidity: {
    type: Number,
    required: true,
    validate: {
      validator: function(v) {
        return v >= 0 && v <= 100;
      },
      message: 'Humidity must be between 0% and 100%'
    }
  },
  windDirection: {
    type: Number,
    required: true
  },
  precipitation: {
    type: Number,
    required: true
  }
});

// Indexes
weatherReadingSchema.index({ temperature: 1 });
weatherReadingSchema.index({ humidity: 1, precipitation: 1 });
weatherReadingSchema.index({ time: 1 });

const WeatherReading = mongoose.model('WeatherReading', weatherReadingSchema);

export default WeatherReading;