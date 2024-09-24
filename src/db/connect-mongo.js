import mongoose from "mongoose";

let cachedConnection = global.mongoose;

if (!cachedConnection) {
  cachedConnection = global.mongoose = null;
}

async function connect() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    cachedConnection = await mongoose.connect(process.env.MONGO_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
    });

    console.log("Connected to MongoDB");
    return cachedConnection;
  } catch (e) {
    console.log(e);
    console.error("Error connecting to MongoDB");
  }
}

export default connect;
