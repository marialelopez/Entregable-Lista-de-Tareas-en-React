import Header from "./componentes/Header";
import TaskList from "./componentes/TaskList";
import './app.css'


function App() {
  return (
    <div className="container">
      <Header />
      <TaskList />
    </div>
  );
}

export default App;