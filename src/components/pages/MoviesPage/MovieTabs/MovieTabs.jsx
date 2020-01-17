import React, {useState} from "react";
import {Redirect, Route, Switch, withRouter} from "react-router";
import {Link} from "react-router-dom";
import {Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import MovieVideos from "../Video/MovieVideos";
import MovieDetail from "../../MoviePage/MovieDetail";
import MovieCredits from "../Credits/MovieCredits";

const DETAIL = "detail";
const VIDEOS = "videos";
const CREDITS = "credits";
const regExpFindPathName = /(detail|videos|credits)$/;

const MovieTabs = ({movieId, location}) => {

  const {pathname} = location;
  const path = regExpFindPathName.exec(pathname);
  const pathName = path ? path[1] : DETAIL;

  const [activeTab, setActiveTab] = useState(pathName);


  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div>
      <Nav tabs>
        <NavItem>
          <NavLink
            tag={Link} extract="true" to={`/movie/${movieId}/${DETAIL}`}
            className={classnames({active: activeTab === DETAIL})}
            onClick={() => {
              toggle(DETAIL);
            }}
          >
            О фильме
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag={Link} extract="true" to={`/movie/${movieId}/${VIDEOS}`}
            className={classnames({active: activeTab === VIDEOS})}
            onClick={() => {
              toggle(VIDEOS);
            }}
          >
            Видео
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            tag={Link} extract="true" to={`/movie/${movieId}/${CREDITS}`}
            className={classnames({active: activeTab === CREDITS})}
            onClick={() => {
              toggle(CREDITS);
            }}
          >
            Актёры
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <Switch>
          <Route path={`/movie/${movieId}/${DETAIL}`}>
            <TabPane tabId={DETAIL}>
              <Row>
                <Col sm="12">
                  <MovieDetail/>
                </Col>
              </Row>
            </TabPane>
          </Route>
          <Route path={`/movie/${movieId}/${VIDEOS}`}>
            <TabPane tabId={VIDEOS}>
              <Row>
                <Col sm="12">
                  <MovieVideos/>
                </Col>
              </Row>
            </TabPane>
          </Route>
          <Route path={`/movie/${movieId}/${CREDITS}`}>
            <TabPane tabId={CREDITS}>
              <Row>
                <Col sm="12">
                  <MovieCredits/>
                </Col>
              </Row>
            </TabPane>
          </Route>
          <Route path={`/movie/${movieId}`}>
            <Redirect to={`/movie/${movieId}/${DETAIL}`}/>
          </Route>
        </Switch>
      </TabContent>
    </div>
  );
};

export default withRouter(MovieTabs);
