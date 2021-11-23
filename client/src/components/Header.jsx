import React from "react";
import {useNavigate} from "react-router-dom";

function Header(props) {

  const today = new Date();
  let navigate = useNavigate();

  const dateSchema = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  };

  const todayDate = today.toLocaleDateString("en-US", dateSchema);

  function logout(){
    navigate('/');
    window.location.reload();
  }

  return (
    <header>
      <div className="dateContainer">
        <h1>{todayDate}</h1>
        <button onClick={logout}>Logout</button>
      </div>

      <div className = "TitleContainer">
        <h1 className="appTitle">Coffee Break</h1>
        <h1 className="coffineRemain">Remain Amount: {props.remain} mg</h1>
      </div>
    </header>
  );
}

export default Header;
