import React, {useEffect,useState} from "react";
import axios from "axios";
import moment, {Moment} from "moment";
import {
    EyeOutlined,
    DeleteOutlined,
    FilterOutlined
} from "@ant-design/icons";
import {
    Tag,
    Table,
    Modal,
    Form,
    Input,
    Select,
    DatePicker,
    notification,
    Button
} from "antd";


const {Option} = Select;

interface RequestTableProps{
    data: any[],
    onDataUpdates: () => void;
    updateCounts: () => void;
}

const getStatusTagColor = (Status: string) => {
    switch (Status) {
        case "NEW":
            return "yellow";
        case "IN_PROGRESS":
            return "green";
        case "ON_HOLD":
            return "red";
        case "REJECTED":
            return "grey";
        case "CANCELLED":
            return "orange";
        default:
            return "default";
    }
}

const getPriorityTagColor = (Priority: string) => {
    switch (Priority) {
        case "HIGH":
            return "red";
        case "MEDIUM":
            return "gray";
        case "LOW":
            return "green";
        default:
            return "default";
    }
}

const columns = (showModal: (record: any) => void) => [
    /*Request ID*/
    {
        title: "Request ID",
        dataIndex: "requestId",
        key: "requestId",
    },
    /*Created ON*/
    {
        title: "Created ON",
        dataIndex: "createdOn",
        key: "createdOn",
    },
    /*Location*/
    {
        title: "Location",
        dataIndex: "location",
        key: "location",
    },
    /*Service*/
    {
        title: "Service",
        dataIndex: "service",
        key: "service",
    },
    /*Status*/
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (Status: string) => (
            <Tag color={getStatusTagColor(Status)}>{Status}</Tag> 
        ),
    },
    /*Department*/
    {
        title: "Department",
        dataIndex: "department",
        key: "department",
    },
    /*Requested BY*/
    {
        title: "Requested By",
        dataIndex: "requestedBy",
        key: "requestedBy",
    },
    /*Assigned */
    {
        title: "Assigned To",
        dataIndex: "assignedTo",
        key: "assignedTo",
    },
    /*Priority */
    {
        title: "Priority",
        dataIndex: "priority",
        key: "priority",
        render: (Priority: string) => (
            <Tag color={getPriorityTagColor(Priority)}>{Priority}</Tag>
        ),
    },
    /*Actions*/
    {
        title: "Actions",
        key: "actions",
        render: (_: any, record:any) => (
            <EyeOutlined onClick={() => showModal(record)}/>
        ),
    },
];

const RequestTable: React.FC<RequestTableProps> = ({
    data,
    onDataUpdates,
    updateCounts,
}) => {
    const [isModalVisible, setISModeVisible] = useState(false);
    const [currentRecord, setCurrentRecord] = useState<any>(null);
    const [filteredData, setFilteredData] = useState(data);
    const [form] = Form.useForm();
    const [filters, setFilters] = useState({
        searchText: "",
        selectedDate: null as Moment | null,
        selectedStatus: null as string | null,
        selectedDepartment: null as string | null,
    });
    const [departmentOptions, setDepartmentOptions] = useState<string[]>([]);

    useEffect(() => {
        setISModeVisible(false);
    }, [data]);

    useEffect(() => {
        let filtered = data;
        const {
            searchText, 
            selectedDate,
            selectedStatus,
            selectedDepartment
        } = filters;

        if(searchText)  {
            filtered = filtered.filter((item) => Object.values(item).some(
                (value) => 
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchText.toLowerCase())
                )
            )
        }

        if(selectedDate) {
            filtered = filtered.filter((item) => 
                moment(item.createdOn).isSame(selectedDate,"day")
            )
        }

        if(selectedStatus) {
            filtered = filtered.filter((item) => item.status === selectedStatus);
        }

        if(selectedDepartment) {
            filtered = filtered.filter(
                (item) => item.department === selectedDepartment
            )
        }

        setFilteredData(filtered);
    }, [filters, data]);

    useEffect(() => {
       const departments = new Set<string>();
       data.forEach((item) => {
            departments.add(item.department);
       });
       setDepartmentOptions(Array.from(departments));
    }, [data]);

    const showModal = (record: any) => {
        setCurrentRecord(record);
        setISModeVisible(true);
        form.setFieldsValue(record);
    };

    const handleCancel = () => {
        setISModeVisible(false);
        setCurrentRecord(null);
    };

    const handleUpdate = async (values: any) => {
        try{
           await axios.patch(`/api/requests/${currentRecord._id}`,values);
           notification.success({
            message: "Data Updated Successfully!",
            description: "The Request has been Upadated Sucessfully",
           });
           onDataUpdates();
           updateCounts();
        }catch (error){
            notification.error({
                message: "Data Update is Failed!",
                description: "There was an error updating the Requests",
            });
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/requests/${currentRecord._id}`);
            notification.success({
                message: "Data Deleted Successfully!",
                description: "The Request has been deleted Sucessfully",
            });
        }catch (error) {
            notification.error({
                message: "Data Delete Failed",
                description: "There was an error deleting the Request",
            });
        }
    };

    const confirmDelete = () => {
        Modal.confirm({
            title: "Want to delete this Request?",
            onOk: handleDelete, 
        });
    };

    const clearFilters = () => {
        setFilters({
            searchText: "",
            selectedDate: null,
            selectedStatus: null,
            selectedDepartment: null,
        });
    };

    return (
        <div className="overflow-x-auto">
            <div className="flex flex-wrap items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-2">
                <Input 
                    placeholder="Search" 
                    value={filters.searchText} 
                    onChange={(e) => 
                        setFilters({ ...filters,searchText: e.target.value})
                    }
                    className="w-full sm:w-auto"
                />

                <DatePicker
                    onChange={(date) => 
                        setFilters({
                            ...filters,
                            selectedDate: date ? moment(date.valueOf()) : null,
                        })
                    }
                    className="w-full sm:w-auto"
                />

                <Select
                    placeholder="Status Filter"
                    onChange={(value) => setFilters({ ...filters, selectedStatus: value})}
                    value={filters.selectedStatus}
                    allowClear
                    className="w-full sm:w-auto"
                >
                    <Option value="NEW">NEW</Option>
                    <Option value="IN_PROGRESS">IN_PROGRESS</Option>
                    <Option value="ON_HOLD">ONHOLD</Option>
                    <Option value="REJECTED">RdaEJECTED</Option>
                    <Option value="CANCELLED">CANCELLED</Option>
                </Select>

                <Select
                    placeholder="Department Filter"
                    onChange={(value) => 
                        setFilters({ ...filters,selectedDepartment: value})
                    }
                    value={filters.selectedDepartment}
                    allowClear
                    className="w-full sm:w-auto"
                >
                    {departmentOptions.map((department) => (
                        <Option 
                            key={department}
                            value={department}
                        >
                            {department}
                        </Option>
                    ))}
                </Select>

                <Button
                    type="primary"
                    onClick={clearFilters}
                    icon={<FilterOutlined/>}
                    className="w-full sm:w-auto"
                    style={{
                        background: "#830823",
                        borderColor: "#830823",
                        color: "white",
                    }}
                >
                    Clear Filters
                </Button>
            </div>

            <Table
                columns={columns(showModal)}
                dataSource={filteredData}
                rowKey="_id"
                scroll={{ x: true}}
            />

            <Modal
                title="Request Details"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button
                        key="delete"
                        type="primary"
                        danger
                        icon={<DeleteOutlined/>}
                        onClick={confirmDelete}
                        style={{float: "left"}}
                    >
                        Delete
                    </Button>,

                    <Button
                        key="submit"
                        type="primary"
                        onClick={() => form.submit()}
                        style={{ backgroundColor: "#830823", borderColor: "#830823" }}
                    >
                        Update
                    </Button>,
                ]}
            >
                <Form 
                    form={form}
                    onFinish={handleUpdate}
                    layout="vertical" >
                    
                    <Form.Item label="Request ID" name="requestId">
                        <Input disabled/>
                    </Form.Item>

                    <Form.Item label="Created ON" name="createdOn">
                        <Input disabled/>
                    </Form.Item>

                    <Form.Item label="Location" name="location">
                        <Input disabled/>
                    </Form.Item>

                    <Form.Item label="Service" name="service">
                        <Input disabled/>
                    </Form.Item>

                    <Form.Item label="Status" name="status">
                        <Select>
                            <Option value="NEW">NEW</Option>
                            <Option value="IN_PROGRESS">IN_PROGRESS</Option>
                            <Option value="ON_HOLD">ONHOLD</Option>
                            <Option value="REJECTED">REJECTED</Option>
                            <Option value="CANCELLED">CANCELLED</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Department" name="department">
                        <Input disabled/>
                    </Form.Item>

                    <Form.Item label="Requested BY" name="requestedBy">
                        <Input disabled/>
                    </Form.Item>

                    <Form.Item label="Assigned TO" name="assignedTo">
                        <Input/>
                    </Form.Item>

                    <Form.Item label="Priority" name="priority">
                        <Select>
                            <Option value="HIGH">HIGH</Option>
                            <Option value="MEDIUM">MEDIUM</Option>
                            <Option value="LOW">LOW</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default RequestTable;