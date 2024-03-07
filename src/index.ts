/* eslint-disable no-console */
import 'dotenv/config';
import app from './app';
import '@/discord';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
