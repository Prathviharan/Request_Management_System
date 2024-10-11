import React from "react";
import {Empty} from "antd";

const Dashboard: React.FC = () => {
    return (
        <div className="flex justify-center items-center h-full mt-32">
            <Empty description="Dashboard"/>
        </div>
    );
};

export default Dashboard;