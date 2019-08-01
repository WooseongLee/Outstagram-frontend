import React from "react";
import PropTypes from "prop-types";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Login from "../Routes/Login";
import Feed from "../Routes/Feed";

const LoggedInRoutes = () => (
  <>
    <Route exact path="/" component={Feed} />
  </>
); //로그인된 상태라면 Feed페이지(메인 페이지)로 이동.

const LoggedOutRoutes = () => (
  <>
    <Route exact path="/" component={Login} />
  </>
); //로그아웃된 상태라면 Login페이지(로그인 페이지)로 이동.

const AppRouter = ({ isLoggedIn }) => (
  <Router>
    <Switch>{isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}</Switch>
  </Router>
); //로그인 여부에 따라 해당 페이지를 호출할 함수

AppRouter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}; //타입 정의.

export default AppRouter;
