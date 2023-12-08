const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //useCreateindex: true and useFindAndModify : false is not supported ???
    const connecting = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      `Mongodb is connecting ${connecting.connection.host}`.green.underline.bold
    );
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
