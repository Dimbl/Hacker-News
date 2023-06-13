import { ListNewStories } from "../components/NewListRequests";
import { Layout } from "antd";
import Logo from "../img/logo";
import { Content, Header } from "antd/es/layout/layout";
import { Routes, Route, Link } from "react-router-dom";
import { PageNew } from "../components/PageNew";

export const MainPage = (props: any) => {
  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ff6600",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Logo />
          <h1 style={{ fontSize: "25px", position: "relative", top: "5px" }}>
            Hacher News{" "}
          </h1>
        </div>
      </Header>
      <Content
        style={{
          margin: "30px 0",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Routes>
          <Route path="/" element={<ListNewStories />} />
          <Route path="/PageNew/:id" element={<PageNew />} />
        </Routes>
      </Content>
    </Layout>
  );
};
