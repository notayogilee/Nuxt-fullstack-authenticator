import mongoose from "mongoose";

export default defineNitroPlugin(() => {
  mongoose.connect(useRuntimeConfig().MONGO_URI);
  console.log("Connected to MongoDB!");
});
