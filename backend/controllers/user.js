const userCollection = require("../model/userModel") 

const getDetails = async(req,res)=>{
    const getAlluser =await userCollection.find({})
    return res.status(200).json({message:"User Fetched Succesfully" , getAlluser})

}

const postDetails = async (req, res) => {
    const { name, email, gender, city } = req.body;
  
    try {
      if (!name || !email || !gender || !city) {
        return res.status(400).json({ message: "Please fill all the fields" });
      }
      const findUser = await userCollection.findOne({ email });
      if (findUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const newUser = await userCollection.create({
        name,
        email,
        gender,
        city,
        profile: req.file?req.file.filename:null,
      });
      return res.status(201).json({ message: "User created successfully", data: newUser });
    } catch (err) {
      return res.status(500).json({ message: "Server error", error: err.message });
      
    }
  };

  const deleteUser = async(req,res)=>{
    const {id}=req.params
    const deleteUser =await userCollection.findByIdAndDelete(id)
    if( deleteUser){
    return res.status(200).json({message:"User Deleted Succesfully" , deleteUser})
    }
    return res.status(404).json({message:"User Not Found"})

  }
module.exports = {
    getDetails,
    postDetails,
    deleteUser
}
