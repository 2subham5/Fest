const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/user.js');
const paymentRouter = require('./routes/payment.js');

const app = express();
dotenv.config();
app.use(cors())
app.use(express.json());

mongoose.set('strictQuery', false);

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family: 4,
})
.then(() => {
    console.log("✅ MongoDB connected successfully");
})
.catch((err) => {
    console.error("❌ MongoDB connection error:", err);
});

app.use('/user',userRouter);
app.use('/payment',paymentRouter);

app.listen(3000, (req,res)=>{
    console.log("App listen at port 3000");
})