const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  companyId:{
    type:String,
    required:true,
    unique:true,
  },
  name:{
    type: String,
    required: true,
  },
  isDeleted: {
      type: Boolean,
      default: false,
  },
  status:{
      type:String,
      enum:["Pending","Approved","Rejected","Delete"],
      default:"Pending",
  },
  points:{
    type:Number,
    default:0,
  },
  email:{
    type:String,
    required:true,
  },
  phone:{
    type:Number,
    required:true,
  },
  companyaddress:{
    type:String,
    required:true,
  },
  manager:{
     type:String,
  },
  customers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    ],
  },
{
  timestamps: true,
}
);

module.exports = mongoose.model("Company", companySchema);
