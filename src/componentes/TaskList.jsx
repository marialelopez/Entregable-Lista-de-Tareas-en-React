import { useEffect, useState } from "react";
import Task from "./Task";
import AddTask from "./AddTask";
import { v4 as uuidv4 } from "uuid";
uuidv4();

//este componente padre contiene las funciones que estamos exportando a los componentes hijos Task y AddTask

function TaskList() {
  const [tareas, setTareas] = useState([]);

  const onComplete = (id) => {
    setTareas(
      tareas.map((tarea) => {
        if (tarea.id === id) {
          return { ...tarea, completed: !tarea.completed };
        }
        return tarea;
      })
    );
  };

  const onDelete = (id) => {
    setTareas([...tareas].filter((tarea) => tarea.id !== id));
  };

  const addNewTask = (newTarea) => {
    let newItem = { id: uuidv4(), description: newTarea, completed: false };
    setTareas([...tareas, newItem]);
    // console.log(tareas);
  };

  const editTask = (id, newDescription) => {
    setTareas((tareaAnterior) =>
      tareaAnterior.map((tarea) => {
        if (tarea.id === id) {
          return { ...tarea, description: newDescription};
        }
        return tarea;
      })
    );
  };

  useEffect(() => {
    const storageTareas = localStorage.getItem("tareas");
    if (storageTareas) {
      setTareas(JSON.parse(storageTareas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tareas", JSON.stringify(tareas));
    console.log("Tareas guardadas en el local storage", tareas);
  }, [tareas]);


  return (
    <div>
      <AddTask addNewTask={addNewTask} />
      {tareas.map((tarea) => (
        <Task
          key={tarea.id}
          tarea={tarea}
          onComplete={onComplete}
          onDelete={onDelete}
          editTask={editTask}
        />
      ))}
    </div>
  );
}

export default TaskList;