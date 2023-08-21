import express from 'express';
import 'dotenv/config';
import './db';

const app = express();

const PORT = process.env.PORT || 8987;

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
    
})
