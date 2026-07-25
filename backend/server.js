const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require('./app');
const connectDB = require('./utils/db');
const port = process.env.PORT || 8000;
connectDB().then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
})