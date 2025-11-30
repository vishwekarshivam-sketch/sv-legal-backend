import express from "express";
import Request from "../models/Request.js";

const router = express.Router();

// Get all requests
router.get("/", async (req,res)=>{
    try{
        const data = await Request.find().sort({createdAt:-1});
        res.json(data);
    }catch(e){
        res.status(500).json({error:"Server Error"});
    }
});

// View single request
router.get("/:id", async(req,res)=>{
    try{
        const data = await Request.findById(req.params.id);
        res.json(data);
    }catch(e){
        res.status(500).json({error:"Not Found"});
    }
});

export default router;
