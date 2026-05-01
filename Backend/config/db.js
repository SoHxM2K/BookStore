import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 8000

async function connectDB(app) {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");
    app.listen(PORT,() => console.log(`Server is running on port ${PORT}`)); 
}

export default connectDB;