import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectToDatabase from './src/config/DatabaseConection';

import userRouter from './src/users/infrestructure/routes/UserRouter';

const Port = parseInt(process.env['APP_PORT'] ?? '3001');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);

app.get('/', (_req, res) =>{
    res.send('Main API')
});

connectToDatabase()
    .then(() => {
        app.listen(Port, () => {
            console.log('Server listening on port', Port);
        });
    })
    .catch((err) => {
        console.error('Error initializing server:', err);
    });
