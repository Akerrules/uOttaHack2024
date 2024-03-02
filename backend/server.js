const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
app.use(cors());
const PORT = process.env.PORT || 3500;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use('/geolocation', require('./Routes/googleMapRoute'));
app.use('/directions', require('./Routes/directionsRoute')); 
app.use('/places', require('./Routes/placesRoute'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
