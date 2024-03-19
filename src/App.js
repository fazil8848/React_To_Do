import React, { useState } from "react";
import "./App.css";
import Added from "./components/Added";
import Completed from "./components/Completed";

function App() {
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");
  const [count, setCount] = useState(0);
  const [com, setCom] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const date = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = days[date.getDay()];

  const addToDo = () => {
    if (toDo.trim() !== "") {
      setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
      setToDo("");
      setCount(count + 1);
    }
  };

  const statusUpdate = (id) => {
    setToDos((prevStatus) => {
      return prevStatus.map((todo) => {
        if (todo.id === id) {
          setCom(com + 1);
          setCount(count - 1);
          return { ...todo, status: !todo.status };
        }
        return todo;
      });
    });
  };

  const removeToDo = (id) => {
    setToDos((prevStatus) => {
      const removedToDo = prevStatus.find((todo) => todo.id === id);
      const isFalse = removedToDo && removedToDo.status === false;

      if (isFalse) {
        setCount(count - 1);
      } else {
        setCom(com - 1);
      }
      return prevStatus.filter((todo) => todo.id !== id);
    });
  };

  const startEditing = (id) => {
    setEditingId(id);
  };

  const finishEditing = () => {
    setEditingId(null);
  };

  const handleEditChange = (id, newText) => {
    setToDos((prevStatus) => {
      return prevStatus.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text: newText };
        }
        return todo;
      });
    });
  };

  return (
    <div className="app">
      <div className="mainHeading">
        <h1>ToDo List</h1>
      </div>
      <div className="subHeading">
        <br />
        <h2>Whoop, it's {currentDay} 🌝 ☕ </h2>
      </div>
      <div className="input">
        <input
          value={toDo}
          onChange={(e) => setToDo(e.target.value)}
          type="text"
          placeholder="🖊️ Add item..."
        />
        <i onClick={addToDo} className="fas fa-plus"></i>
      </div>

      {count > 0 ? <Added /> : null}

      {toDos.map((value) => {
        if (!value.status) {
          return (
            <div className="todos" key={value.id}>
              <div className="todo">
                <div className="left">
                  <input
                    onChange={() => statusUpdate(value.id)}
                    checked={value.status}
                    type="checkbox"
                    name=""
                    id=""
                  />
                  {editingId === value.id ? (
                    <input
                      type="text"
                      value={value.text}
                      onChange={(e) =>
                        handleEditChange(value.id, e.target.value)
                      }
                      onBlur={finishEditing}
                      autoFocus
                    />
                  ) : (
                    <p>{value.text}</p>
                  )}
                </div>
                <div className="right">
                  <i
                    onClick={() => removeToDo(value.id)}
                    className="fas fa-times"
                  ></i>
                  <i
                    onClick={() => startEditing(value.id)}
                    className="fa fa-edit"
                  ></i>
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
      {com > 0 ? <Completed /> : null}
      {toDos.map((obj) => {
        if (obj.status) {
          return (
            <div className="todos1" key={obj.id}>
              <div className="todo">
                <div className="left">
                  <p>{obj.text}</p>
                </div>
                <div className="right">
                  <i
                    onClick={() => removeToDo(obj.id)}
                    className="fas fa-times"
                  ></i>
                </div>
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

export default App;
