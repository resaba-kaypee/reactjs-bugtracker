const express = require("express");

const app = express();

app.get('/',(req, res) => res.json({msg: 'Welcome to Contact Keeper API'}))

// Define routes

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/issue', require('./routes/issue'))
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> console.log(`Server started on ${PORT}`));