import React from "react";
import { Card, Skeleton } from "antd";

const LoadingCard: React.FC = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {Array.from({ length: 12 }).map((_, index) => (
        <Card key={index} style={{ width: 240, margin: "16px" }}>
          <Skeleton active>
            <div style={{ height: "200px", backgroundColor: "#f0f0f0" }}></div>
            {/* Placeholder for image */}
            <Skeleton paragraph={{ rows: 2 }} active />
            <Skeleton title={false} paragraph={{ rows: 1 }} active />
            <Skeleton title={false} paragraph={{ rows: 1 }} active />
          </Skeleton>
        </Card>
      ))}
    </div>
  );
};

export default LoadingCard;
