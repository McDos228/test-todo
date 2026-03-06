import { useEffect, useState } from 'react';

const API = import.meta.env.VITE_API_URL;

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  const load = async () => {
    const res = await fetch(`${API}/todos`);
    setTodos(await res.json());
  };

  useEffect(() => {
    load();
  }, []);

  const create = async () => {
    await fetch(`${API}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    setTitle('');
    load();
  };

  const toggle = async (id: number) => {
    await fetch(`${API}/todos/${id}`, { method: 'PATCH' });
    load();
  };

  const remove = async (id: number) => {
    await fetch(`${API}/todos/${id}`, { method: 'DELETE' });
    load();
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Todo App</h1>

      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <button onClick={create}>Add</button>

      {todos.map(t => (
        <div key={t.id}>
          <span
            style={{
              textDecoration: t.completed ? 'line-through' : 'none',
              cursor: 'pointer',
            }}
            onClick={() => toggle(t.id)}
          >
            {t.title}
          </span>
          <button onClick={() => remove(t.id)}>x</button>
        </div>
      ))}
    </div>
  );
}