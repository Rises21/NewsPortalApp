import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    //useCreateindex: true and useFindAndModify : false is not supported ???
    //process.env.MONGO_URI
    const connecting = await mongoose.connect(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`
    );

    // console.log(
    //   `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`,
    //   "<<<<<<"
    // );
    console.log(`Mongodb is connecting ${connecting.connection.host}`);
  } catch (err) {
    console.log(err.message);
  }
};

export default connectDatabase;
