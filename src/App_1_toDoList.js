import { useState } from "react";

function App1() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => setToDo(event.target.value);
  console.log("insert >>>:", toDo);
  const onSubmit = (event) => {
    event.preventDefault();
    console.log("click >>>:", toDo);
    if (toDo === "") {
      return;
    }
    setToDos((currentArray) => [toDo, ...currentArray]);
    setToDo("");
  };
  console.log(toDos);
  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type={"text"}
          placeholder="Write your to do.."
        />
        <button>Add to do</button>
      </form>
    </div>
  );
}

export default App1;
