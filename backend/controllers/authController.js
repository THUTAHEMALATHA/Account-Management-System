import supabase from "../config/supabaseClient.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

export const signup = async(req, res)=>{
    const { name, email, password} =req.body;

    const hashedPassword = await bcrypt.hash(password,10);

    const { data, error } = await supabase
    .from ("users")
    .insert([{name,email, password: hashedPassword}])
    .select()
    .single();

    if(error){
        return res.status(400).json({error:error.message});

    }
  const token =generateToken(data.id);

  res.json({
    token,
    user: data,
  });
};


export const login = async (req,res) => {
     const {email,password} = req.body;

     const {data,error} = await supabase
     .from("users")
     .select("*")
     .eq("email", email)
     .single();

     if(error || data){
        return res.status(400).json({message:"user not found"})
     }

     const isMatch = await bcrypt.compare(password,data.password)
     if(!isMatch){
        return res.status(400).json({message:"invaild password"})
     }

     const token = generateToken(data);
     res.json({
        token,
        user:data,
     });

};