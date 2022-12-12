import Button from "./button.js";
import styles from "./App.module.css";

function App() {
  return (
    <div>
      <h1 className={styles.title}>Welcome!!</h1>
      <Button text="너무나 훌륭한것" />
    </div>
  );
}

export default App;
