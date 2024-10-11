import React from "react";
import axios from "axios";
import {
    Modal, 
    Form, 
    Input, 
    DatePicker, 
    Select, 
    message} from "antd";

const {Option} = Select;

interface RequestFormProps {
    visible: boolean,
    onCancel: () => void;
    onFormSubmit: () => void;
}

const RequestForm: React.FC<RequestFormProps> = ({
    visible,
    onCancel,
    onFormSubmit,
}) => {
    const [form] = Form.useForm();
    const onFinish = async(values: any) => {
        try{
            const Response = await axios.post("/api/request",values);
            message.success("Submitted Successfully",Response.data);
            form.resetFields();
            onCancel();
            onFormSubmit();
        }catch (error){
            console.error(error);
            message.error("Failed. Plase Try Agin!");
        }
    }

    return (
        <Modal 
            title="Add Request"
            open={visible}
            onCancel={onCancel}
            destroyOnClose
        >
            <Form 
                form={form}
                onFinish={onFinish}
                layout="vertical"
            >
                {/*Request ID*/}
                <Form.Item
                    name="requestId"
                    label="Request ID"
                    rules={[{required:true, message: "Please Enter Request ID"}]}
                >
                    <Input placeholder="Enter Request ID:"/>
                </Form.Item>

                {/*Created ON*/}
                <Form.Item
                    name="createdOn"
                    label="Created ON"
                    rules={[{required:true, message: "Please Select Created Date"}]}
                >
                    <DatePicker className="w-full"/>
                </Form.Item>
                
                {/*Location*/}
                <Form.Item
                    name="location"
                    label="Location"
                    rules={[{required:true, message: "Please Enter Location"}]}
                >
                    <Input placeholder="Enter Location:"/>
                </Form.Item>

                {/*Service*/}
                <Form.Item
                    name="service"
                    label="Service"
                    rules={[{required:true, message: "Please Enter Service"}]}
                >
                    <Input placeholder="Enter Service"/>
                </Form.Item>

                {/*Status*/}
                <Form.Item
                    name="status"
                    label="Status"
                    rules={[{required:true, message: "Please Select Status"}]}
                >
                    <Select placeholder="Select Status">
                        <Option value="NEW">NEW</Option>
                        <Option value="IN_PROGRESS">IN PROGRESS</Option>
                        <Option value="ON_HOLD">ON HOLD</Option>
                        <Option value="REJECTED">REJECTED</Option>
                        <Option value="CANCELLED">CANCELLED</Option>
                    </Select>
                </Form.Item>

                {/*Priority*/}
                <Form.Item
                    name="priority"
                    label="Priority"
                    rules={[{required:true, message: "Please Select Priority"}]}
                >
                    <Select placeholder="Select Priority">
                        <Option value="HIGH">HIGH</Option>
                        <Option value="MEDIUM">MEDIUM</Option>
                        <Option value="LOW">LOW</Option>
                    </Select>
                </Form.Item>

                {/*Department*/}
                <Form.Item
                    name="department"
                    label="Department"
                    rules={[{required:true, message: "Please Enter Department"}]}
                >
                    <Input placeholder="Enter the Department"/>
                </Form.Item>

                {/*Requested By*/}
                <Form.Item
                    name="requestedBy"
                    label="Requested By"
                    rules={[{required:true, message: "Please Enter Requester Name"}]}
                >
                    <Input placeholder="Enter the requester name"/>
                </Form.Item>

                {/*Assigned To*/}
                <Form.Item
                    name="assignedTo"
                    label="Assigned To"
                    rules={[{required:true, message: "Please Enter Assigner Name"}]}
                >
                    <Input placeholder="Enter Assigner Name"/>
                </Form.Item>

                {/*Submit*/}
                <Form.Item>
                    <button type="submit" className="bg-[#830823] hover:bg-[#6a0620] text-white font-bold py-2 px-4 rounded transition-colors duration-300">
                        Submit
                    </button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default RequestForm;