const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
name:{type:String, required:true},
mail:{type:String, required:true},
password:{
  type:String, required:true
}
});

const paymentSchema = new mongoose.Schema({
  name: { type: String, required: true },   
  email: { type: String, required: true }, 
  contact: { type: String, required: true },
  amount: { type: Number, required: true },
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String },
  uniqueId: { type: String, unique: true, required: true },

  status: {
    type: String,
    enum: ["not_issued","initiated", "issued", "failed", "expired"],
    default: "not_issued"
  },
});


const Payment = mongoose.model('Payment', paymentSchema);
const User = mongoose.model('User', userSchema);
module.exports  ={
        Payment,
        User
    };

