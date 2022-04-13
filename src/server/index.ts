import express from 'express';
import cors from 'cors';
import token from './routes/api/token';
import visibility from './routes/api/visibility';
import PORT from './PORT';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', token);
app.use('/api', visibility);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
