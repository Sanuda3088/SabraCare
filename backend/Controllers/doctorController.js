import Doctor from "../models/DoctorSchema.js";

export const updateDoctor = async(req,res)=>{
    const id = req.params.id;
    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id,{$set:req.body},{new:true});
        res.status(200).json({success:true, message:"Successfully Updated", data:updateDoctor});
    } catch (error) {
        res.status(500).json({success:false, message:"Failed to Update"});
    }
};


export const deleteDoctor = async(req,res)=>{
    const id = req.params.id;
    try {
        await Doctor.findByIdAndDelete(id);
        res.status(200).json({success:true, message:"Successfully deleted"});
    } catch (error) {
        res.status(500).json({success:false, message:"Try again later"});
    }
};


export const getSingleDoctor = async(req,res)=>{
    const id = req.params.id;
    try {
        const doctor = await Doctor.findById(id).populate("reviews").select("-password");
        res.status(200).json({success:true, message:"Doctor Found", data:doctor});
    } catch (error) {
        res.status(404).json({success:false, message:"No Doctor Found"});
    }
};


export const getAllDoctor = async(req,res)=>{

    try {
        const {query} = req.query;
        let doctors;
        if (query) {
            doctors = await Doctor.find({
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { specialization: { $regex: query, $options: "i" } }
                ]
            }).select('-password');
        } else {
            doctors = await Doctor.find({ isApproved: "approved" }).select('-password');
        }

        res.status(200).json({success:true, message:"Doctors Found", data:doctors});
    } catch (error) {
        res.status(404).json({success:false, message:"No user Found"});
    }
};