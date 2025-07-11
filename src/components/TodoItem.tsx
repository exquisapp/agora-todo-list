import { CheckCircle, Circle, Trash2 } from "lucide-react";
import { ITodo } from "../type";

interface ITodoItem {
    toggleTodo: (todoId: string) => void;
    deleteTodo: (todoId: string) => void;
    todo: ITodo,
    completed?: boolean
}


const TodoItem = ({ toggleTodo, todo, deleteTodo, completed }: ITodoItem) => (
    <div
        key={todo.id}
        className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg group"
    >
        <button
            onClick={() => toggleTodo(todo.id)}
            className={`${completed ? "text-green-600" : "text-gray-400"}`}
        >
            {completed ? <CheckCircle size={20} /> : <Circle size={20} />}
        </button>
        <span className={`flex-1 text-gray-800 font-medium ${completed && "text-gray-600 line-through"}`}>{todo.text}</span>
        <button
            onClick={() => deleteTodo(todo.id)}
            className="text-gray-400"
        >
            <Trash2 size={16} />
        </button>
    </div>
)

export default TodoItem