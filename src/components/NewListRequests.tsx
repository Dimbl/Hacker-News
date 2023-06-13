import { Button } from "antd";
import { useEffect } from "react";
import { NewStories } from "./NewStories";
import NewsStorys from "./NewsStorys";

export const ListNewStories = () => {
  useEffect(() => {
    NewsStorys.newStoiesReqest();
    const interval = setInterval(() => {
      NewsStorys.newStoiesReqest();
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Button
        type="primary"
        style={{
          backgroundColor: "white",
          color: "black",
          zIndex: "2",
          position: "fixed",
          top: "14px",
          left: "50px",
        }}
        onClick={NewsStorys.newStoiesReqest}
      >
        Refresh
      </Button>
      <ol
        style={{
          fontSize: "x-large",
        }}
      >
        <NewStories />
      </ol>
    </div>
  );
};
