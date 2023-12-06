import { useState } from "react";

//este componente maneja las funciones para darle estilo al completar una tarea, tambien la funcion 
//de editar y guardar al utilizar onClick, onChange y el hook useState

function Task({ tarea, onComplete, onDelete, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(tarea.description);

  const getStyle = () => {
    return {
      textDecoration: tarea.completed ? "line-through" : "none",
    };
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = () => {
    editTask(tarea.id, editedDescription);
    setIsEditing(false);
  };

  return (
    <div style={getStyle()} className="tareasStyle">
      {isEditing ? (
        <div>
          <input
            id="input"
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
          />
          <button onClick={handleSave} className="botonGuardar">
            Guardar
          </button>
        </div>
      ) : (
        <>
          <input
            id="nombre"
            type="checkbox"
            checked={tarea.completed}
            onChange={() => onComplete(tarea.id)}
            className="cajitaDeCheck"
          />
          {tarea.description}
          <img
            src="/src/iconos/borrar.svg"
            alt="borrar"
            className="papelera"
            onClick={() => onDelete(tarea.id)}
          />
          <img
            src="/src/iconos/editar.svg"
            alt="editar"
            className="lapiz"
            onClick={handleEdit}
          />
        </>
      )}
    </div>
  );
}

export default Task;