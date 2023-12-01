//Connection file to mongo db
const mongoose = require("mongoose")
const connectDB = async () => {
  let pass = 'islL4cegzOzgQhzJ'
  const MONGOURI = `mongodb+srv://waqasijazx6:${pass}@cluster0.3wzjmvz.mongodb.net/?retryWrites=true&w=majority`;
  try {
    const conn = await mongoose.connect(MONGOURI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error1: ${error.message}`);
    process.exit();
  }
};

module.exports = connectDB;