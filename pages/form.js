import { useState } from "react";
import styles from "../styles/form.module.css";

export default function SchoolForm(){
    let[formData,setFormData]=useState({
        name:"",
        address:"",
        city:"",
        state:"",
        contact:"",
        email_id:"",
        image:"",
    });

const [message,setMessage]=useState("");

const handleChange= (event)=>{
    const {name,value,type,files}=event.target;
    if(type==="file"){
        setFormData({...formData,[name]:files[0] });
    }else{
        setFormData({...formData,[name]:value})
    }
};

const handleSubmit=async(event)=>{
    event.preventDefault();

    try{
        const data= new FormData();
        for(let key in formData){
            if (formData[key]) data.append(key, formData[key]);
        }
        const res=await fetch("/api/addSchool",{
            method:"POST",
            body:data,
        })

         const result = await res.json();

        if(res.ok){
            setMessage("School added successfully");
            setFormData({
                name:"",
                address:"",
                city:"",
                state:"",
                contact:"",
                email:"",
                image:"",
            });
        }else{
            setMessage(result.error || "Error adding school");
        }
    }catch(error) {
        console.log(error);
        setMessage("Something went wrong");
    }
};

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Add a School</h1>
            <form onSubmit={handleSubmit} className={styles.form}> 
                <input name="name" placeholder="School Name" onChange={handleChange} required/>
                <br></br>
                <input name="address"placeholder="Address" onChange={handleChange} required/>
                 <br></br>
                <input name="city" placeholder="City" onChange={handleChange} required/>
                 <br></br>
                <input name="state" placeholder="State" onChange={handleChange} required/>
                 <br></br>
                <input name="contact"placeholder="Contact Number" type="number"  onChange={handleChange} required/>
                 <br></br>
                <input name="email_id" placeholder="Email ID" type="email" onChange={handleChange} required/>
                 <br></br>
                <input name="image" type="file" accept="image/*" placeholder="Image URL" onChange={handleChange} />
                 <br></br>
                <button className={styles.button} type="submit">Submit</button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
        </div>
    )
}