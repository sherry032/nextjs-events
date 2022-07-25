import {connectDatabase, insertDocument} from "../../../helpers/db-util"


async function handler(req, res){
    const {eventId} = req.query
    let client
    try{
       client = await connectDatabase()
    }catch(err){
        res.status(500).json({message:"Database connection failed"})
        return;
    }
    if(req.method==="POST"){
        const {text, name, email} = req.body
        if(!email.includes("@")|| !name || name.trim()===""|| !email || email.trim()===""){
            res.status(422).json({message: "invalid input"})
            return
        }

        const newComment = {
            eventId,
            text,
            email,
            name
        }
       
        try{
       const result = await insertDocument(client, newComment, "comments")
        }catch(err){
            res.status(500).json({message:"Inserting data failed"})
        }
        newComment.id = result.insertedId
        res.status(201).json({message: "comment added", comment: newComment})
    }
    if(req.method==="GET"){
    const db = client.db()
    const documents = await db.collection("comments").find({eventId}).sort({_id: -1}).toArray()
    res.status(200).json({comments: documents})
    }
    client.close()
}

export default handler