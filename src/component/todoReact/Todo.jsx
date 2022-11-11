import React from "react";
import { useState, useEffect } from "react";
import "./style.css";

// get the local storage data back
const getLocaldata = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};
const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [items, setItems] = useState(getLocaldata());
  const [isEdititem, setIsEdititem] = useState();
  const [toggleButton, setToggleButton] = useState(false);

  // add the items function
  const addItem = () => {
    if (!inputdata) {
      alert("plz fil the data");
    } else if (inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === isEdititem) {
            return { ...curElem, name: inputdata };
          }
          return curElem;
        })
      );
      setInputData("");
      setIsEdititem(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };
      setItems([...items, myNewInputData]);
      setInputData("");
    }
  };

  //edit the items
  const editItem = (index) => {
    const items_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(items_todo_edited.name);
    setIsEdititem(index);
    setToggleButton(true);
  };

  // delete How to items
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };

  // REMOVE ALL THE ITEMS
  const removeAll = () => {
    setItems([]);
  };

  // adding localstorage

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="todologo" />
            <figcaption>
              Add your list here <i class="fa-brands fa-angellist"></i>
            </figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ add items "
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleButton ? (
              <i class="fa fa-edit   add-btn" onClick={addItem}></i>
            ) : (
              <i class="fa fa-plus  add-btn" onClick={addItem}></i>
            )}
          </div>

          {/* show our items */}
          <div className="showItems">
            {items.map((curElem, index) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <i
                      class="far fa-edit  add-btn"
                      onClick={() => editItem(curElem.id)}
                    ></i>
                    <i
                      class="far fa-trash-alt add-btn"
                      onClick={() => deleteItem(curElem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          {/* remove all bbtn */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="REMOVE ALL"
              onClick={removeAll}
            >
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
