import React from "react";

import Account from "./Account";
import BotSettings from "./BotSettings";
import Sounds from "./Sounds";

export default function Dashboard() {
  const headerTabs = [
    {
      name: "Sounds",
      component: <Sounds />,
    },
    {
      name: "Bot settings",
      component: <BotSettings />,
    },
    {
      name: "Account",
      component: <Account />,
    },
  ];
  return (
    <>
      <div id="dash-header" className="container">
        {/* <div className="dash-header-tabs">{headerTabs.map(el => el.component)}</div> */}
      </div>
      <div className="container">
        <div className="dash-content">{}</div>
      </div>
    </>
  );
}
