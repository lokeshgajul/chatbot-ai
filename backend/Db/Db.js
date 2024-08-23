import mongoose from "mongoose";

export const ConnectDb = async () => {
  try {
    const resposne = await mongoose.connect(
      "mongodb+srv://sangeetagajul:xqWcdsl0kgKP50fu@converseaicluster.hwulwor.mongodb.net/?retryWrites=true&w=majority&appName=ConverseAiCluster",
      {
        useNewUrlParser: true,
      }
    );
    // Check if the connection was successful
    if (resposne.connection.readyState === 1) {
      console.log("Connected to MongoDB successfully!");
    } else {
      console.log("Connection to MongoDB was not successful.");
    }
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};
