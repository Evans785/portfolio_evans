import React from "react";
import AdminPanel from "./components/admin/AdminPanel";
import AdminLogin from "./components/admin/AdminLogin";
import Dashboard from "./components/admin/Dashboard";
import Messages from "./components/admin/Messages";
import Setting from "./components/admin/Setting";

const UserApp = () => {
  return (
    <>
      <AdminLogin />
      <AdminPanel />
      <Dashboard />
      <Messages />
      <Setting />
    </>
  );
};

export default UserApp;
