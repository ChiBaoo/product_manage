import React from "react";
import { Card, Skeleton } from "antd";

const LoadingCard: React.FC = () => {
  return (
    <Card style={{ padding: "20px", margin: "20px" }}>
      <Skeleton active>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "300px",
              backgroundColor: "#f0f0f0",
            }}
          ></div>{" "}
          {/* Placeholder for image */}
          <Skeleton
            title={false}
            paragraph={{ rows: 1 }}
            style={{ marginTop: "20px" }}
          />
          <Skeleton title={false} paragraph={{ rows: 1 }} />
          <Skeleton title={false} paragraph={{ rows: 1 }} />
          <Skeleton title={false} paragraph={{ rows: 1 }} />
          <Skeleton title={false} paragraph={{ rows: 1 }} />
          <Skeleton title={false} paragraph={{ rows: 1 }} />
          <Skeleton title={false} paragraph={{ rows: 1 }} />
          <div style={{ width: "100%", marginTop: "20px" }}>
            <Skeleton.Button active style={{ width: "100%" }} />
          </div>
        </div>
      </Skeleton>
    </Card>
  );
};

export default LoadingCard;
