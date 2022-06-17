import logger from 'jet-logger';
import server from './server';
import { config } from 'dotenv';

// Load env file
config();

// Constants
const serverStartMsg = 'Express server started on port: ';
const port = process.env.PORT || 3000;

// Start server
server.listen(port, () => {
  logger.info(serverStartMsg + port);
});
