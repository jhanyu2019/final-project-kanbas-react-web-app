import React, { useState , useEffect} from "react";
import axios, { AxiosError } from "axios";


interface Todo {
    id: number;
    title: string;
    description: string;
    due: string;
    completed: boolean;
}

function WorkingWithArrays() {
    const [todo, setTodo] = useState({
        id: 1,
        title: "NodeJS Assignment",
        description: "Create a NodeJS server with ExpressJS",
        due: "2021-09-09",
        completed: false,
    });
    const API = "http://localhost:4000/a5/todos";
    const [todos, setTodos] =useState<Todo[]>([]);
    const fetchTodos = async () => {
        const response = await axios.get(API);
        setTodos(response.data);
    };

    const removeTodo = async (todo: Todo) => {
        const response = await axios
            .get(`${API}/${todo.id}/delete`);
        setTodos(response.data);
    };

    const createTodo = async () => {
        const response = await axios.get(`${API}/create`);
        setTodos(response.data);
    };

    const fetchTodoById = async (id:number) => {
        const response = await axios.get(`${API}/${id}`);
        setTodo(response.data);
    };

    const updateTitle = async () =>{
        const response = await axios.get(`${API}/${todo.id}/title/${todo.title}`)
        setTodos(response.data);
    }

    const postTodo = async () => {
        const response = await axios.post(API, todo);
        setTodos([...todos, response.data]);
    };


    const [errorMessage, setErrorMessage] = useState(null);
    const deleteTodo = async (todo:Todo) => {
        try {
            const response = await axios.delete(
                `${API}/${todo.id}`);
            setTodos(todos.filter((t) => t.id !== todo.id));
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.log(error);
                setErrorMessage(error.response?.data.message);
            } else {
                console.log('Unexpected error:', error);
            }
        }
    };


    const updateTodo = async () => {
        try {
            const response = await axios.put(
                `${API}/${todo.id}`, todo);
            setTodos(todos.map((t) => (
                t.id === todo.id ? todo : t)));
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.log(error);
                setErrorMessage(error.response?.data.message);
            } else {
                console.log('Unexpected error:', error);
            }
        }
    };




    useEffect(() => {
        fetchTodos();
    }, []);


    return (
        <div>
            <h3>Working with Arrays</h3>
            <input value={todo.id}   />
            <input  type="text" value={todo.title} onChange={(e) => setTodo({ ...todo, title: e.target.value })} />
            <input  type="text" value={todo.description} onChange={(e) => setTodo({ ...todo, description: e.target.value })} />
            <input type="date" value={todo.due} onChange={(e) => setTodo({ ...todo, due: e.target.value })} /><br/>
            <label>
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={(e) => setTodo({ ...todo, completed: e.target.checked })}
                />
                Completed
            </label>

            <br/>

            <button onClick={postTodo}> Post Todo </button> <br/>
            <button onClick={createTodo} >
                Create Todo
            </button><br/>

            <button onClick={updateTodo}>
                Update Todo
            </button>
            <br/>


            <ul>
                {errorMessage && (
                    <div className="alert alert-danger mb-2 mt-2">
                        {errorMessage}
                    </div>
                )}


                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input checked={todo.completed}
                               type="checkbox" readOnly />
                        {todo.title}
                        <p>{todo.description}</p>
                        <p>{todo.due}</p>

                        <button  onClick={() => fetchTodoById(todo.id)} >
                            Edit
                        </button>

                        <button  onClick={() => removeTodo(todo)} >
                            Remove
                        </button>

                        <button onClick={() => deleteTodo(todo)}
                                className="btn btn-danger float-end ms-2">
                            Delete
                        </button>

                        {todo.title}
                    </li>
                ))}
            </ul>

            <h4>Retrieving Arrays</h4>
            <a href={API}>
                Get Todos
            </a>

            <h4>Retrieving an Item from an Array by ID</h4>
            <input type="number"
                value={todo.id}
                   onChange={(e) => setTodo({ ...todo,
                       id: parseInt(e.target.value) })}/>
            <a href={`${API}/${todo.id}`}>
                Get Todo by ID
            </a>


            <h3>Filtering Array Items</h3>
            <a href={`${API}?completed=true`}>
                Get Completed Todos
            </a>

            <h3>Creating new Items in an Array</h3>
            <a href={`${API}/create`}>
                Create Todo
            </a>

            <h3>Deleting from an Array</h3>
            <a href={`${API}/${todo.id}/delete`}>
                Delete Todo with ID = {todo.id}
            </a>

            <h3>Update the title</h3>
            <input type="number" value={todo.id}
                   onChange={(e) => setTodo({
                       ...todo, id: parseInt(e.target.value) })}/>
            <input type="text" value={todo.title}
                   onChange={(e) => setTodo({
                       ...todo, title: e.target.value })}/>
            <h3>Updating an Item in an Array</h3>
            <a href={`${API}/${todo.id}/title/${todo.title}`} >
                Update Title to {todo.title}
            </a>

            <h3>Update Description</h3>
            <input type="text" value={todo.description}
                   onChange={(e) => setTodo({
                       ...todo, description: e.target.value })}/>
            <a href={`${API}/${todo.id}/description/${todo.description}`}>
                Update Description
            </a>


            <h3>Update Completed Status</h3>
            <input type="checkbox" checked={todo.completed}
                   onChange={(e) => setTodo({
                       ...todo, completed: e.target.checked
                   })}/>
            <a href={`${API}/${todo.id}/completed/${todo.completed}`}>
                Update Completed Status
            </a>




        </div>
    );
}
export default WorkingWithArrays;

