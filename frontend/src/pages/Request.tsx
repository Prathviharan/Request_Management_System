import React, {useState, useEffect} from "react";
import axios from "axios";
import Circle from "../components/Circle";
import RequestTable from "../components/RequestTable";
import RequestForm from "../components/RequestForm";

const Request: React.FC = () => {
    const [isRequestFormVisible, setIsRequestFormVisible] = useState(false);
    const [data, setData] = useState<any[]>([]);
    const [counts, setCounts] = useState({
        newRequests : 0,
        inProgressRequests: 0,
        escalatedRequests: 0,
        onHoldRequests: 0,
    });

    const toggleRequestForm = () => {
        setIsRequestFormVisible(!isRequestFormVisible);
    };

    const fetchData = async () => {
        try{
            const response = await axios.get("/api/requests");
            const requests = response.data;
            
            const newRequests = requests.filter(
                (req : any) => req.status === "NEW"
            ).length;

            const inProgressRequests = requests.filter(
                (req : any) => req.status === "IN_PROGRESS"
            ).length;

            const escalatedRequests = requests.filter(
                (req : any) => req.status === "REJECTED" || req.status === "CANCELLED"
            ).length;

            const onHoldRequests = requests.filter(
                (req : any) => req.status === "ON_HOLD"
            ).length;
            setCounts({
                newRequests,
                inProgressRequests,
                escalatedRequests,
                onHoldRequests
            });
            setData(requests);
        } catch (error){
            console.error("Error Fetching Data",error);
        }
    };

    const updateCounts = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
    }, []); 

    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 mt-4">
            <div className="max-w-8xl mx-auto flex flex-col md:flex-row justify-between items-center mb-4">
                <div className="flex items-center space-x-4 mb-2 md:mb-0 md:mt-4">
                    <h2 className="text-2xl font-bold">
                        Requests
                    </h2>
                    <button className="bg-[#830823] hover:bg-[#dc2626] text-white font-bold py-2 px-4 rounded flex items-center" onClick={toggleRequestForm}>
                        <span className="mr-1">+</span>
                         New Request
                    </button>
                </div>
                <div className="ml-0 md:ml-4">
                    <Circle counts={counts}/>
                </div>
                <RequestTable data={data} onDataUpdates={fetchData} updateCounts={updateCounts}/>

                <RequestForm visible={isRequestFormVisible} onCancel={() => setIsRequestFormVisible(false)} onFormSubmit={fetchData}/>
            </div>
        </div>
    )
}

export default Request;