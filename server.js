const express = require("express");
const connectDB = require('./config/db')

const app = express();

// Connect DB
connectDB();

// Init middleware
app.use(express.json({extented: false}));

// Define routes

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/issues', require('./routes/issues'))


const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> console.log(`Server started on ${PORT}`));