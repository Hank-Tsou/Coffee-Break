import React, { useState } from "react";
import axios from "axios";

function Decision(props) {

  const [err, setErr] = useState("");
  var totalSelectionCoffine = 0;

  if(props.totalSelection.length !== 0){
    props.totalSelection.map((coffee)=>{
      totalSelectionCoffine = totalSelectionCoffine + coffee.coffineAmount;
      return 0;
    })
  }

  function updateRemainAndRecord(e){
    if(props.remain-totalSelectionCoffine >= 0){
      props.update(props.remain-totalSelectionCoffine);
      props.clear();
      setErr("");

      const coffeeInfo = {
        remain: props.remain-totalSelectionCoffine
      };

      axios.post('/coffee/'+props.userId, coffeeInfo);

    }else{
      setErr("!!! Please Reduce Your Coffee");
    }
  }

  function clearSelection(e){
    props.clear();
    setErr("");
  }

  return (
    <div className="DecisionContainer">
      <p>Total caffeine: <strong>{totalSelectionCoffine}</strong> mg {err}</p>
      <p>Current Remaining: <strong>{props.remain-totalSelectionCoffine}</strong> mg</p>

      <div className="DecisionButton">
        <button onClick={updateRemainAndRecord}>DRINK</button>
        <button onClick={clearSelection}>CLEAR</button>
      </div>

    </div>
  );
}

export default Decision;
