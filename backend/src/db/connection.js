//mongo function, export
import mongoose from "mongoose";

const connectDB = async () => {
        try {
                const connectionRes = await mongoose.connect(process.env.MONGODB_URL);
                console.log("Server is connected : ",connectionRes.connection.host);
                
                console.log(`MOngodb connected successfully `);
                
        } catch (error) {
                console.log("Mongodb Connection Erorr", error);
                process.exit(1)

        }
}

export default connectDB