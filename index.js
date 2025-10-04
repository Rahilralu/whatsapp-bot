import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import router from './routes/bot.js';

const app = express();

app.use(cors({
    origin: "*",
    methods: ["GET","POST"],
    allowedHeaders: ["Content-Type","Authorization"]
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/',router);

const PORT = process.env.PORT || 5000;

app.get('/',(req,res) => {
    res.send('Backend is running');
})

app.listen(PORT, () => console.log(`Server running in ${PORT}`));

