import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Signup(){
    const navigate = useNavigate();
        const [form, setForm] = useState({
            name:"",
            email:"",
            password:"",
        });

        const handleSubmit = async(e)=>{
            e.preventDefault();

            const res = await API.post("/auth/signup", form);

            localStorage.setItem("token", res.data.token);
            
            navigate("/dashboard");
        };

        return(
            <form onSubmit={handleSubmit}>
                <input 
                placeholder="Name"
                onChange={(e)=>setForm({...form, name: e.target.value})}/>

                <input 
                placeholder="Email"
                onChange={(e)=>setForm({...form, email: e.target.value})}/>

                <input 
                type="password"
                placeholder="password"
                onChange={(e)=>setForm({...form, password: e.target.value})}/>
                
                <button type="submit">
                    Signup
                </button>
            </form>
        )

        
    
}
export default Signup;
