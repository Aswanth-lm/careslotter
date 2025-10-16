import mongoose from "mongoose";

const connectDB = async () =>{

    mongoose.connection.on('connected', () => console.log("Database connected"))

    await mongoose.connect('mongodb+srv://aswanth:doctor123@cluster0.gcqt0do.mongodb.net/CareSlotter?retryWrites=true&w=majority&appName=Cluster0');

}

export default connectDB
