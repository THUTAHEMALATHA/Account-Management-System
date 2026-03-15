import supabase from "../config/supabaseClient.js";

export const getBalance = async(req, res)=>{
    const userId= req.user.id;
    const {data,error} = await supabase
    .from("users")
    .select("balance")
    .eq("id", userId)
    .single();
    
    if(error){
        return res.status(400).json({error:error.message})
    }
    res.json(data);
}

export const getUsers =async(req,res)=>{
    const {data,error} = await supabase
    .from ("users")
    .select("id,name,email");

    if(error){
        return res.status(400).json({error:error.message})
    }
    res.json(data);
}

export const transferMoney = async(req,res)=>{
    const senderId =req.user.id;
    const {receiverId, amount}= req.body;

    const{data: sender}= await supabase
    .from("users")
    .select("*")
    .eq("id",senderId)
    .single();
    
    if(sender.balance < amount){
        return res.status(400).json({message:"insufficient balaance"})
    }

    const { data: receiver} = await supabase
    .from("users")
    .select("*")
    .eq("id", receiverId)
    .single();
    if(!receiver){
        return res.status(400).json({message:"Receivr not found"})
    }
    const newSenderBalance = sender.balance - amount;
    const newReceiverBalance = receiver.balance + amount;

    await supabase
    .from("users")
    .update({balance: newSenderBalance})
    .eq("id", senderId);

    await supabase
    .from("users")
    .update({balance: newReceiverBalance})
    .eq("id", receiverId);

    await supabase.from("transactions").insert([
     {
        sender_id : senderId,
        receiver_id : receiverId,
        amount,
        transcation_type:"debit",

     },
      {
        sender_id : senderId,
        receiver_id : receiverId,
        amount,
        transcation_type:"credit",
        
     },
    ]);
    res.json({message:"transfer successful"});
    
};

export const getStatement = async(req,res)=>{
    const userId = req.user.id;
    const {data,error} = await supabase
    .from("transactions")
    .select("*")
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order("created_at",{ascending:false});

    if(error){
        return res.status(400).json({error:error.message});

    }
    res.json(data);
}