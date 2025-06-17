import 'dotenv/config';
import http from 'http';
import app from './app.js';
import { connectDb } from './config/db.js';

const server = http.createServer(app);
const port = process.env.PORT;

(async () => {
  try {
    await connectDb();
    server.listen(port, () => console.log(`Server is running on port ${port}`));
  } catch (error) {
    console.log(`Server running error: ${error}`);
    process.exit(1);
  }
})();
