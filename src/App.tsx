import React, { useState } from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ITodo } from './type';
import TodoItem from './components/TodoItem';
import TodoInput from './components/TodoInput';


function App() {
  const [todos, setTodos] = useLocalStorage<ITodo[]>('todo', []);
  const [inputValue, setInputValue] = useState('');

  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const addTodo = () => {
    if (inputValue.trim()) {
      const newTodo: ITodo = {
        id: Date.now().toString(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date()
      };
      setTodos((prevTodos: ITodo[]) => [...prevTodos, newTodo]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo))
  };

  const deleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  const activeTodos = sortedTodos.filter(todo => !todo.completed);
  const completedTodos = sortedTodos.filter(todo => todo.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Todo List</h1>
        </div>
        
        <TodoInput  handleKeyPress={handleKeyPress} addTodo={addTodo} value = {inputValue} setValue={setInputValue}/>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{todos.length}</div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{activeTodos.length}</div>
            <div className="text-sm text-gray-600">Active Tasks</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{completedTodos.length}</div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>

        <div className="space-y-4">
          {activeTodos.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Circle className="text-blue-600" size={20} />
                Active Tasks ({activeTodos.length})
              </h2>
              <div className="space-y-3">
                {activeTodos.map((todo) => (<TodoItem todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />))}
              </div>
            </div>
          )}

          {completedTodos.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="text-green-600" size={20} />
                Completed Tasks ({completedTodos.length})
              </h2>
              <div className="space-y-3">
              {completedTodos.map((todo) => (<TodoItem completed todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />))}

              </div>
            </div>
          )}

          {todos.length === 0 && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="text-gray-400 mb-4">
                <Circle size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No todos yet</h3>
              <p className="text-gray-500">Add your first todo above to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;