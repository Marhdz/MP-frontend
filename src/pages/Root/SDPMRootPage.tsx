import { Button, Layout, Menu, Result } from "antd";
import { BuildOutlined, BulbOutlined, QuestionCircleOutlined, HistoryOutlined, MenuOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/lib/layout/layout";
import "antd/dist/antd.css";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import SimulatorPage from "../Simulator/SimulatorPage";
import HistoryPage from "../History/HistoryPage";
import AboutAlgorithmsPage from "../AboutAlgorithms/AboutAlgorithmsPage";
import AboutSimulatorPage from "../AboutSimulator/AboutSimulatorPage";

export default function SDPMRootPage() {
  const urlSplit = document.URL.split("/")
  const actualRoute = urlSplit[urlSplit?.length - 1]

  const allLinks = [
    <Menu.Item key={"simulator"}>
      <NavLink to="/simulator"><BuildOutlined /> Simulador</NavLink>
    </Menu.Item>,
    <Menu.Item key={"history"}>
      <NavLink to="/history"><HistoryOutlined /> Histórico</NavLink>
    </Menu.Item>,
    <Menu.Item key={"aboutAlgorithms"}>
      <NavLink to="/aboutAlgorithms"><BulbOutlined /> Sobre os algoritmos</NavLink>
    </Menu.Item>,
    <Menu.Item key={"aboutSimulator"}>
      <NavLink to="/aboutSimulator"><QuestionCircleOutlined /> Sobre o simulador</NavLink>
    </Menu.Item>,
  ]

  const allRoutes = [
    <Route key="root" path="/" exact component={SimulatorPage} />,
    <Route key="simulator" path="/simulator" component={SimulatorPage} />,
    <Route key="history" path="/history" component={HistoryPage} />,
    <Route key="aboutAlgorithms" path="/aboutAlgorithms" component={AboutAlgorithmsPage} />,
    <Route key="aboutSimulator" path="/aboutSimulator" component={AboutSimulatorPage} />,
    <Route
      key={"404"}
      render={() => <Result
        status="404"
        title="404"
        subTitle="La página que buscas no existe."
        extra={<Button type="primary"><NavLink to="/" >Volver al inicio</NavLink></Button>}
      />}
    />,
  ]

  return <>
    <BrowserRouter>
      <Layout style={{ height: "100vh", overflow: "auto", backgroundColor: "white" }}>
        
        <Content>
          <Switch>
            {allRoutes}
          </Switch>
        </Content>
      </Layout>
    </BrowserRouter>
  </>
}
