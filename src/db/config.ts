import mongoose from "mongoose";

export const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { dbName: "library-db" });

    console.log("Mongodb Connect Succesfully");
  } catch (error) {
    console.log("Error connecting to mongodb: ", error.message);

    process.exit();
  }
};
