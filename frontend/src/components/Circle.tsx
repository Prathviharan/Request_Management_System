import React from "react";

interface CircleProps {
    counts: {
        newRequests : number,
        inProgressRequests: number,
        escalatedRequests: number,
        onHoldRequests: number,
    };
}

const Circle: React.FC<CircleProps> = ({
    counts: {
        newRequests = 0,
        inProgressRequests = 0,
        escalatedRequests = 0,
        onHoldRequests = 0,
    },
}) => {
    return (
        <div className="flex justify-between space-x-4 mt-8 flex-wrap md:flex-nowrap">
            <div className="flex-1 bg-red-200 rounded-full p-4 text-black font-bold text-center mb-4 md:mb-0">
                <div className="w-24 h-24 rounded-full flex flex-col items-center justify-center mx-auto">
                    <div className="text-3xl">{newRequests}</div>
                    <div className="text-sm">New Requests</div>
                </div>
            </div>

            <div className="flex-1 bg-purple-300 rounded-full p-4 text-black font-bold text-center mb-4 md:mb-0">
                <div className="w-24 h-24 rounded-full flex flex-col items-center justify-center mx-auto">
                    <div className="text-3xl">{inProgressRequests}</div>
                    <div className="text-sm">In Progress Requests</div>
                </div>
            </div>

            <div className="flex-1 bg-purple-300 rounded-full p-4 text-black font-bold text-center mb-4 md:mb-0">
                <div className="w-24 h-24 rounded-full flex flex-col items-center justify-center mx-auto">
                    <div className="text-3xl">{escalatedRequests}</div>
                    <div className="text-sm">Escalated Requests</div>
                </div>
            </div>

            <div className="flex-1 bg-purple-300 rounded-full p-4 text-black font-bold text-center mb-4 md:mb-0">
                <div className="w-24 h-24 rounded-full flex flex-col items-center justify-center mx-auto">
                    <div className="text-3xl">{onHoldRequests}</div>
                    <div className="text-sm">On Hold Requests</div>
                </div>
            </div>
        </div>
    )
}

export default Circle;