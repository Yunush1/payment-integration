const express = require('express');
const app = express();
const cors = require('cors');
const { dbConnect } = require('./config/db.config');
const { createClient } = require('./config/redise.config');
require('dotenv').config();
const port = 4000;

app.use(express.json());
app.use(cors());
dbConnect()
createClient()
app.use('/api/v2/', require('./routes/payment.routes'));
app.use('/api/v1/', require('./routes/product.routes'));
app.use('/api/v1/', require('./routes/blog.routes'));
app.use('/api/v1/',require('./routes/user.routes'));
app.get('/', (req, res)=>{
    res.send("Hey Server is running");
});

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
});