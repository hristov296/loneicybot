import React from "react";

export default function() {
  return (
    <div>
      <div className="setting">
        <label className="setting-label" htmlFor="">
          Status:
        </label>
        <input type="text" className="setting-field" value="Offline" />
        <button value="Join" className="join-button" onClick="" />
        <button value="Leave" className="leave-button" onClick="" />
      </div>
      <div className="setting">
        <label className="setting-label" htmlFor="">
          Message rate:
        </label>
        <input type="text" className="setting-field" value="" />
      </div>
      <div className="setting">
        <label className="setting-label" htmlFor="">
          Hourly rate:
        </label>
        <input type="text" className="setting-field" value="" />
      </div>
    </div>
  );
}
