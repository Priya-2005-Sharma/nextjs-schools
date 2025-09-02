import {db} from "../../utils/db";

export default async function handler(req,res){
    if(req.method === "GET"){
        try{
            const [rows]=await db.query("SELECT * FROM schools");
            res.status(200).json(rows);
        }catch(error){
            res.status(500).json({error:error.message});
        }
    }else{
        res.status(405).json({message:"Method not allowed"});
    }
}