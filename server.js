require('dotenv').config();
const app = require('./app.js');
const port = process.env.port || 5000;
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});