import { useEffect, useState } from "react";
import API from "../api/axios";

 function Statement(){
    const[transcations, setTranscations]= useState([]);
    useEffect(()=>{
        const fetchData = async()=>{
            const res = await API.get("/account/statement");
            setTranscations(res.data);
        };
        fetchData();
    },[]);

    return(
        <table border="1">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                {transcations.map((tx)=>(
                    <tr 
                    key={tx.id}
                    style={{
                        color:tx.transcation_type === "credit" ? "green" : "red",

                    }}>
                        <td>{new Date(tx.created_at).toLocaleDateString()}</td>
                        <td>{tx.transcation_type}</td>
                        <td>₹{tx.amount}</td>

                    </tr>
                ))}
            </tbody>

        </table>
    )
 }
 export default Statement;
