import express from 'express';
import 'dotenv/config';
import './db';

import authRouter from './routers/auth';

const app = express();

// register our middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);



const PORT = process.env.PORT || 8988;

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
    
})
