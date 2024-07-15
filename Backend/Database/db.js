import mongoose from 'mongoose';

const connectToDatabase = async () => {
    try {
      await mongoose.connect('mongodb+srv://farah:Farah%40$pagal123@cluster0.hiztfz3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/PWA', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to Database');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  };


export default connectToDatabase;