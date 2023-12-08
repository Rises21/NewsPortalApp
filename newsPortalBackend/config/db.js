const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //useCreateindex: true and useFindAndModify : false is not supported ???
    //process.env.MONGO_URI
    const connecting = await mongoose.connect(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    // console.log(
    //   `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`,
    //   "<<<<<<"
    // );
    console.log(
      `Mongodb is connecting ${connecting.connection.host}`.green.underline.bold
    );
    console.log(process.env.NEWS_API_KEY, "KEYYYY");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = connectDB;
