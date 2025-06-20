const express = require("express");
const app = express();
const Customer = require("../models/customer-model");
const Company = require("../models/Company-model");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const PointRequest =require("../models/Companypoints-model");

// Manager requests to add/deduct points
exports.requestcompanypoints = async (req, res) => {
  try{
    const { companyId, type, value ,manager } = req.body;
    if(!type || !value || !manager){
      return res.status(400).json({
         success: false,
        message: "Please provide details",
      })
    }
    // Convert points to number
    const points = Number(value);
    if (isNaN(points) || points < 0) {
      return res.status(400).json({
        success: false,
        message: "Points must be a valid non-negative number",
      });
    }
      const company = await Company.findOne({ companyId });
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "company not found",
      });
    }
    const request = new PointRequest({
    company:company._id,
    companyId,
    type,
    manager,
    value:points
  });
  
  await request.save();

  res.status(200).json({ 
    success: true,
    message: 'Request submitted for admin approval.',
    request
  });
  }
  catch(err){
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Admin approves or disapproves request
exports.companypointsreview = async(req,res)=>{
  try{
    const { approved } = req.body;
    const request = await PointRequest.findById(req.params.id);
 
  if (!request || request.status !== 'pending') {
    return res.status(400).json({ success: false, message: 'Invalid or already processed request.' });
  }
 
  if (approved) {
    const company = await Company.findById(request.company);
    if (!company) return res.status(404).json({
      message: 'company not found'
    });
 
    if (request.type === 'add') {
      company.points += request.value;
    } else {
      company.points = Math.max(0, company.points - request.value);
    }
 
    await company.save();
    request.status = 'approved';
    request.message = 'Request approved and points updated.';
  } else {
    request.status = 'disapproved';
    request.message = 'Request disapproved. No changes made.';
  }
 
  await request.save();
  res.status(200).json({
    success: true,
    message: request.message,
    request
  });
  }
  catch(err){
    res.status(400).json({
      success:false,
      message:err.message
    })
  }
};

// Get employee points
exports.getemployeepoints =async(req,res)=>{
  try{
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({
       message: 'company not found'
    });
    res.status(200).json({
      success:true,
      message:"company data receive",
      company 
      });
  }
  catch(err){
    res.status(400).json({
      success:false,
      message:err.message
    })
  }
};
 
// Get all requests (for admin dashboard)
exports.allcompanyrequest=async(req,res)=>{
  try{
    const requests = await PointRequest.find().populate('company');
    res.status(200).json({
      success:true,
      message:"get all request",
      requests
    });
}
catch(err){
  res.status(400).json({
      success:false,
      message:err.message
    })
}
}

// create company
exports.CreateCompany = async (req, res) => {
  try {
    const { companyId, name, manager,email,phone,companyaddress } = req.body;
    if (!companyId || !name || !manager) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields",
      });
    }

    const companyexist = await Company.findOne({ companyId });
    if (companyexist) {
      return res.status(400).json({
        success: false,
        message: "Company already existed",
      });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email regex
    if (!emailRegex.test(email)) {
      // If the email format is invalid, return an error response
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }
    const newCompany = await Company({
      name,
      companyId,
      manager,
      email,
      phone,
      companyaddress
    });

    let token = jwt.sign({ id: newCompany._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    await newCompany.save();
    return res.cookie("token", token).status(201).json({
      success: true,
      message: "Company created successfully",
      token,
      newCompany,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// reject company
exports.rejectcompany = async (req, res) => {
  try {
    const compId = req.params.id;

    // Find the company first
    const company = await Company.findById(compId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    // Update status to rejected
    company.status = 'Rejected';
    await company.save();

    res.status(200).json({
      success: true,
      message: "company rejected successfully.",
      company,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// approve company
exports.approvecompany = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the company first
    const company = await Company.findById(userId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "company not found.",
      });
    }

    // Check if already approved
    if (company.status === 'Approved') {
      return res.status(400).json({
        success: false,
        message: "company is already approved.",
      });
    }

    // Update status to Approved
    company.status = 'Approved';
    await company.save();

    res.status(200).json({
      success: true,
      message: "company approved successfully.",
      company,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// delete company
exports.deletecompany = async (req, res) => {
  try {
    const compId = req.params.id;
    // Find the company first
    const company = await Company.findById(compId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "company not found.",
      });
    }

    // Update status to deleted
    company.status = 'Delete';
    await company.save();

    res.status(200).json({
      success: true,
      message: "company delete successfully.",
      company,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// soft delete company
exports.softdeletecompany = async (req, res) => {
  try {
    const Id = req.params.id;
    const company = await Company.findByIdAndUpdate(
      Id,
      { isDeleted: true },
      { new: true }
    );
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "company not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "company soft delete successfully.",
      company,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// get all company
exports.getallcompany = async (req, res) => {
  try {
    const company = await Company.find({ isDeleted: false })
      .populate({
        path: "customers",
        match: { isDeleted: false }, // <-- only customers where isDeleted is false
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Company data fetched successfully",
      company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// update company
exports.updatecompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "please fill in all fields"
      })
    }
    const company = await Company.findOneAndUpdate(
      { companyId },
      { name },
      { new: true }
    )
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "company not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "company updated successfully.",
      company,
    });
  }
  catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

// get single Company data
exports.getCompany = async (req, res) => {
  try {
    const compData = await Company.findById(req.params.id)
    if (!compData) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Company data",
      compData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
