import { Plus } from "lucide-react";

interface ITodoInputProps {
    value: string;
    setValue: (value: string) => void;
    handleKeyPress: (e: React.KeyboardEvent) => void;
    addTodo: () => void
}
const TodoInput = ({value, setValue, handleKeyPress, addTodo}: ITodoInputProps) => (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
    <div className="flex gap-3">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Add a new todo..."
        className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
      />
      <button
        onClick={addTodo}
        disabled={!value.trim()}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium"
      >
        <Plus size={20} />
        Add
      </button>
    </div>
  </div>
)

export default TodoInput