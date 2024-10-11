import mongoose, {Document, Schema} from "mongoose";

//enum for request status
export enum Status{
    NEW = "NEW",
    IN_PROGRESS = "IN_PROGRESS",
    ON_HOLD = "ON_HOLD",
    REJECTED = "REJECTED",
    CANCELLED = "CANCELLED",
}

//enum for priority
export enum Priority{
    HIGH = "HIGH",
    MEDIUM = "MEDIUM",
    LOW = "LOW",
}   

//interface for request document
export interface IRequest extends Document {
    requestId: string;
    createdOn: Date;
    location: string;
    service: string;
    status: Status;
    priority: Priority;
    department: string;
    requestedBy: string;
    assignedTo?: string;
}

const requestSchema: Schema = new Schema({
    requestId: { type: String, required: true, unique: true, index: true },
    createdOn: { type: Date, default: Date.now, required: true },
    location: { type: String, required: true },
    service: { type: String, required: true },
    status: { type: String, enum: Object.values(Status), required: true },
    priority: { type: String, enum: Object.values(Priority), required: true },
    department: { type: String, required: true },
    requestedBy: { type: String, required: true },
    assignedTo: { type: String },
},{timestamps: true})

export default mongoose.model<IRequest>("Request",requestSchema);