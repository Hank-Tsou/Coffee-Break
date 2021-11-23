import React, { useState } from "react";


function CreateArea(props) {

  const [count, setCount] = useState({
    coffeeName: props.coffeeName,
    cupNumber: 0,
    coffineAmount: 0
  });

  function increase() {
    setCount(prevValue => {
      return {
        ...prevValue,
        cupNumber: (count.cupNumber + 1),
        coffineAmount: (count.coffineAmount+props.caffeine)
      };
    });
  }

  function decrease() {
    if(count.cupNumber > 0){
      setCount(prevValue => {
        return {
          ...prevValue,
          cupNumber: (count.cupNumber - 1),
          coffineAmount: (count.coffineAmount-props.caffeine)
        };
      });
    }else{
      setCount(prevValue => {
        return {
          ...prevValue,
          cupNumber: (0),
          coffineAmount: (0)
        };
      });
    }
  }

  function submitNote(event) {
    if(count.cupNumber!==0){
      props.onAdd(count);
      setCount({
        coffeeName: props.coffeeName,
        cupNumber: 0,
        coffineAmount: 0
      });
    }
  }

  const remainCups = Math.floor(props.remain/props.caffeine);

  return (
    <div className = "coffeeSelection">

        <div className="cupCounterTop">{remainCups}</div>
        <div className = "limitCover" style={(remainCups>0)? {display: "none"}:{display: "block"}}></div>

        <h2>{props.coffeeName}</h2>
        <h3>Caffeine: {props.caffeine}</h3>
        <img src={process.env.PUBLIC_URL + '/img/' +props.imgURL}  alt="coffee_img" />


        <div className="cupCounter">
          <button onClick={decrease}>-</button>
          <div className="cupNumber">{count.cupNumber}</div>
          <button onClick={increase}>+</button>
        </div>

        <h3>Total: {count.coffineAmount} mg</h3>
        <button onClick={submitNote}>Add</button>

    </div>
  );
}

export default CreateArea;
