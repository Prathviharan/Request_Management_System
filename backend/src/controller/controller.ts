import {Request,Response} from "express";
import RequestModel, {IRequest} from "../models/model";
import mongoose from "mongoose";

//controller to get all requests
const getRequests = async(req: Request, res: Response): Promise<void> => {
    try{
        const requests: IRequest[] = await RequestModel.find();
        if(requests.length === 0){
            res.status(404).json({message: "No Request Found"});
        }else{
            res.status(200).json(requests);
        }
    }catch(error: any){
        res.status(500).json({message: error.message})
    }
}

//controller to add new requests
const addRequest = async(req: Request, res: Response): Promise<void> => {
    const {
        requestID,
        createdON = new Date(),
        location,
        service,
        status,
        priority,
        department,
        requestedBY,
        assignedTO
    } = req.body;

    //validation for required fields
    if(!location || !service || !status || !priority || !requestedBY || !department) {
        res.status(400).json({message: "Missing Required Fields"});
    }

    //generate id
    const generateRequestID = (): string => {
        return `REQ-${Date.now()}`;
    } 

    const newRequest: IRequest = new RequestModel({
        requestID: requestID || generateRequestID(), //generate ID
        createdON,
        location,
        service,
        status,
        priority,
        department,
        requestedBY,
        assignedTO
    });

    try{
        const savedRequest = await newRequest.save();
        res.status(201).json(savedRequest);
    }catch (error: any){
        res.status(500).json({message: `Error: Saving Request: ${error.message}`})
    }
}

//controller to update a request
const updateRequest = async(req: Request, res:Response): Promise<void> => {
    const {id} = req.params;
    const updates = req.body;

    //validate provided ID
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "Invalid Request ID"});
    }

    try{
        const updatedRequest = await RequestModel.findByIdAndUpdate(id,updates,{
            new: true,
            runValidators: true,
        });
        if(!updatedRequest){
            res.status(404).json({message: `Request ID: ${id} not found`});
        }else{
            res.status(200).json({message: "Request Updated Succesfully",updateRequest});
        }
    }catch (error: any){
        res.status(500).json({ message: `Error updating request: ${error.message}` });
    }
}

//controller to delete a request
const deleteRequest = async (req: Request, res: Response): Promise<void> => {
    const {id} = req.params;

    //validate provided ID
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({message: "Invalid Request ID"});
    }

    try{
        const deletedRequest = await RequestModel.findByIdAndDelete(id);

        if(!deletedRequest){
            res.status(404).json({message: `Request with ID ${id} not found`});
        }else{
            res.status(200).json({message: `Request with ID ${id} deleted successfully`});
        }
    }catch (error:any){
        res.status(500).json({message: `Error deleting request: ${error.message}`});
    }
}

export {getRequests,addRequest,updateRequest,deleteRequest};