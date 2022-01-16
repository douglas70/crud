import React, {useState} from 'react';
import { isEmpty, size } from 'lodash';
import shortid from 'shortid';


function App() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [editMode, setEditMode] = useState(false)
    const [id, setId] = useState("")
    const [error, setError] = useState(null)

    const validarForm =()=>{
        let isValid=true
        if (isEmpty(task)){
          setError("Debes de ingresar una tarea")
          isValid=false  
      }
      return isValid
    }
    const addTask =(e)=>{
     e.preventDefault() // evitar que recargue la pagina
     if(!validarForm()){
       return
     }

      const newtask ={
        id:shortid.generate(),
        name: task
       
      }
    
      setTasks([ ...tasks, newtask]); // agregar una nueva tarea y ponerla en tasks
      setTask("");
      setError("");
    }

    const saveTask =(e)=>{
      e.preventDefault() // evitar que recargue la pagina
      if(!validarForm()){
        return
      }

    
     //Modifica una nueva tarea y ponerla en tasks
      const editedTask = tasks.map(item => item.id === id ? {id, name:task}: item)
      setTasks(editedTask)
      setEditMode(false);
      setId("");
      setTask("");
      setError("");
    }

      const deleteTask = (id) => {
        const filteredTask = tasks.filter(task => task.id !== id )
         setTasks(filteredTask)
         setError("");
      
    }
    const editTask = (theTask) => {
      setTask(theTask.name)
     setEditMode(true)
     setId(theTask.id)
  }

    return ( 
       <div className="container mt-5">
      <h1>Tareas</h1>
      <hr/>


      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de Tareas</h4>
         {
           size(tasks)==0 ? (
            <li className="list-group-item"> No hay tereas programadas </li>
           )
           : (  
            <ul className="list-group">
            {   
                 tasks.map((task) =>(           
                   <li className="list-group-item" key = {task.id}>
                   <span className="lead">{task.name}</span>
                   <button 
                         className="btn btn-danger btn-sm float-right mx-2 "
                          onClick = {() => deleteTask(task.id)}
                    >
                          Eliminar
                   </button>
                   <button 
                      className="btn btn-warning btn-sm float-right "
                       onClick = {() => editTask(task)}
                   >
                        Editar
                  </button>
                    </li>           
                 ))
             }
            </ul> 
        
           )
         }
        </div> 
        <div className="col-4">
          <h4 className="text-center">{editMode ?"Editar Tarea" :"Agregar Tareas"}</h4>
          <form onSubmit={editMode ? saveTask : addTask}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Ingrese la tarea..."
              onChange={(text) => setTask(text.target.value)}
              value={task}
            />
            {
              error && <span className='text-danger'>{error}</span>
            }
             <button 
                 className={editMode ? "btn btn-warning btn-block" : "btn btn-dark btn-block" } 
                 type="sumit"
              >
               {editMode ? "Grabar":"Agregar"}
              </button>
          </form>
        </div>
      </div>
    </div>

  );
}


export default App;
