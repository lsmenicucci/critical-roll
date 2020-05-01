// import react
import React, { useState } from "react";
import { connect } from "react-redux";
import classNames from "classnames";

// import local pages and components
import Dashboard from "./Dashboard";
import MasterDashboard from "./MasterDashboard";
import Modal from "../components/Frames/Modal";
import LoginForm from "../components/Card/LoginForm";

const Main = ({ currentUser, connection }) => {
  return (
    <main>
      <Modal visible={!currentUser.loaded}>
        <LoginForm />
      </Modal>
      <Modal visible={connection.reconnecting}>Reconectando...</Modal>
      {(currentUser.isMaster && <MasterDashboard />) ||
        (currentUser.charId && <Dashboard />)}
    </main>
  );
};

const stateToProps = ({ currentUser, connection }) => ({
  currentUser,
  connection,
});

export default connect(stateToProps)(Main);
