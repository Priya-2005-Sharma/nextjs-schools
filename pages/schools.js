import {useEffect,useState} from "react";
import styles from "../styles/schools.module.css";

export default function ShowSchools(){
    const [schools,setSchools]=useState([]);

    useEffect(()=>{
        fetch("/api/getSchools")
        .then((res)=>res.json())
        .then((data) => setSchools(data))
        .catch((err)=>console.log(err));
    },[]);

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>Schools</h1>
            <div className={styles.grid}>
                {schools.map((school)=>(
                    <div key={school.id} className={styles.card}>
                        <Image className={styles.image}
                       src={
                      school.image ? `/schoolImages/${school.image}` : "/default-img.jpg"
                        } 
                     alt={school.name}
                     />


                        <h2 className={styles.schoolName}>{school.name}</h2>
                        <p className={styles.schoolText}>{school.address}</p>
                        <p className={styles.schoolText}>{school.city}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}