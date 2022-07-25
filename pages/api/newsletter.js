import {connectDatabase, insertDocument} from "../../helpers/db-util"
async function handler(req, res) {
    if(req.method==="POST"){
        const {email} =req.body
        if(!email || !email.includes("@")) {
            res.status(422).json({message: 'Invalid input', status:"error", title:"failed"})
            return}
        
        let client
        try{
           client = await connectDatabase()
        }catch(err){
            res.status(500).json({message: 'Connecting to database failed', status:"error", title:"failed"})
            return
        }

        try{
            await insertDocument(client, {email}, "emails")
            client.close()
        }catch(err){
            res.status(500).json({message: 'Inserting data to database failed', status:"error", title:"failed"})
            return
        }

        res.status(201).json({ message: 'Signed up!', status:"success", title:"Success" });
}
}

export default handler