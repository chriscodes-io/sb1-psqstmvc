import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteStudents = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    
    const result = await User.deleteMany({
      role: 'user',
      createdAt: {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      }
    });

    res.json({ message: `${result.deletedCount} students deleted` });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updatePrecipitation = async (req, res) => {
  try {
    const { userId, precipitation } = req.body;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { 'precipitation': precipitation } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateAccessLevels = async (req, res) => {
  try {
    const { users } = req.body;
    
    const updates = await Promise.all(
      users.map(({ userId, role }) =>
        User.findByIdAndUpdate(
          userId,
          { role },
          { new: true }
        )
      )
    );

    res.json(updates);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};