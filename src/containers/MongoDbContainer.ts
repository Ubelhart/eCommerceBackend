import mongoose from "mongoose";

export default class MongoDbContainer {
  private config;
  public router;
  constructor(config) {
    this.config = config;
  }

  public async connect() {
    try {
      await mongoose.connect(this.config);
      console.log("MongoDB connected");
    } catch (error) {
      console.log("MongoDB connection error", error);
    }
  }
}
