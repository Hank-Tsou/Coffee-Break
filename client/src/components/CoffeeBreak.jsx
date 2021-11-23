import React, { useState } from "react";
import coffeeBrands from "../coffeeBrands";
import axios from 'axios';

import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import Time from "./Time";
// import RemainInfo from "./RemainInfo";
import Decision from "./Decision";

function CoffeeBreak(props) {

  const [notes, setNotes] = useState([]);
  const [caffeineRemain, setCaffeineRemain] = useState(500);

  axios.get("/coffee/"+props.userId)
  .then(function (response) {
    setCaffeineRemain(response.data.remain);
  })

  function addNote(newCoffee) {
    const noteIndex = notes.findIndex(note => note.coffeeName === newCoffee.coffeeName);

    if(noteIndex >= 0){
      let newNotes = [...notes];

      newNotes[noteIndex] = {...newNotes[noteIndex],
        cupNumber:newNotes[noteIndex].cupNumber+newCoffee.cupNumber,
        coffineAmount:newNotes[noteIndex].coffineAmount+newCoffee.coffineAmount};

      setNotes(newNotes);
    }else{
      setNotes(prevNotes => {
          return [...prevNotes, newCoffee];
        });
    }
  }

  function deleteNote(id) {
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  function clearCoffee(){
    setNotes([]);
  }

  function createCoffeeStore(coffee){
    return (
      <CreateArea
        key={coffee.id}
        id={coffee.id}
        coffeeName={coffee.coffeeName}
        imgURL={coffee.imgURL}
        description={coffee.description}
        caffeine={coffee.caffeine}
        remain = {caffeineRemain}
        onAdd={addNote}
      />
    );
  }

  return (
    <div>
      {/* =========================================================== Header & Remain Coffine */}
      <Header remain = {caffeineRemain}/>

      {/* =========================================================== Time*/}
        <Time />

      {/* =========================================================== Coffee Store */}
      <div className = "coffeStoreContainer">
        {coffeeBrands.map(createCoffeeStore)}
      </div>

      {/* =========================================================== Selected Coffee */}
      <div className = "selectedCoffeeContainer">
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              coffeeName={noteItem.coffeeName}
              cupNumber={noteItem.cupNumber}
              coffineAmount={noteItem.coffineAmount}
              onDelete={deleteNote}
            />
          );
        })}
      </div>

      {/* =========================================================== Decision */}
      <Decision totalSelection = {notes}
        remain = {caffeineRemain}
        update={setCaffeineRemain}
        clear={clearCoffee}
        userId={props.userId}/>

      {/* =========================================================== Footer */}
      <Footer />

    </div>
  );
}

export default CoffeeBreak;
