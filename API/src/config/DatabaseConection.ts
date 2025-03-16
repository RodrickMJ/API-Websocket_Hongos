import mongoose from "mongoose";
import 'dotenv/config';

const MONGODB_HOST = process.env['MONGODB_HOST'] || 'localhost';
const PORT_DATABASE = process.env['PORT_DATABASE'] || '27017';
const MONGODB_DATABASE =process.env['MONGODB_DATABASE'] || 'HongosDB';

const MongoUrl = `mongodb://${MONGODB_HOST}:${PORT_DATABASE}/${MONGODB_DATABASE}`;

export default async function connectToDatabase() {
    try{
        await mongoose.connect(MongoUrl, {
            connectTimeoutMS: 10000
        });
        console.log('Database Conected Seccessfully');
    } catch (Error) {
        console.log(Error);
    }
}