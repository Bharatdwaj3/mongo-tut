import "dotenv/config";
import express,{NextFunction, Request,Response} from "express";
import NoteModel from "./models/note"

const app = express();

app.get("/", async (req, res,next) => {
  try{
    //throw Error("Bazing");
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch(error){
    next(error);
  }
});
app.use((req,res,next)=>{
  next(Error("Error no endpoint"));
});
app.use((error:unknown,req:Request,res:Response,next:  NextFunction)=>{
    console.log(error);
    let errorMessage = "Error!"
    if(error instanceof Error) errorMessage = error.message;
    res.status(500).json({error:errorMessage});
});
export default app;