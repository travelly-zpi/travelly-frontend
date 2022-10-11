import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Header from "app/components/header/header";
import Footer from "app/components/footer/footer";
import "./app-container.scss";

const { Content } = Layout;

const AppContainer = () => {
  return (
    <Layout className="layout">
      <Header />
      <Content className="content">
        {/*<Breadcrumb style={{ margin: "16px 0" }}>*/}
        {/*  <Breadcrumb.Item>Home</Breadcrumb.Item>*/}
        {/*  <Breadcrumb.Item>List</Breadcrumb.Item>*/}
        {/*  <Breadcrumb.Item>App</Breadcrumb.Item>*/}
        {/*</Breadcrumb>*/}
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default AppContainer;
