import { MongoClient } from "mongodb"
export async function connectDatabase(){
    const client = await MongoClient.connect(`mongodb+srv://sherry0325:lijing1984@cluster0.hgkie.mongodb.net/events?retryWrites=true&w=majority`)
    return client
}

export async function insertDocument(client, document, collection){
    const db = client.db()
    const result = await db.collection(collection).insertOne(document)
    return result
}