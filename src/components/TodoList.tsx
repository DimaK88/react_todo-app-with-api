import React from 'react';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';
export type Props = {
  todos: Todo[];
  loadingTodoId?: number[];
  handleToggleTodo: (id: number) => void;
  onDeleteTodo?: (currentTodoId: number) => Promise<void>;
  editingTodoId: number | null;
  editedTitle: string;
  handleEditTodo: (todo: Todo) => void;
  handleEditInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleEditSave: (todo: Todo) => void;
  handleEditCancel: () => void;
};
export const TodoList: React.FC<Props> = ({
  todos,
  loadingTodoId,
  handleToggleTodo = () => {},
  onDeleteTodo = () => {},
  editingTodoId,
  editedTitle,
  handleEditTodo,
  handleEditInput,
  handleEditSave,
  handleEditCancel,
}) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      <>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onloadingTodoIds={loadingTodoId}
            handleToggleTodo={handleToggleTodo}
            handleTodoDelete={onDeleteTodo}
            isEditing={editingTodoId === todo.id}
            editedTitle={editedTitle}
            handleEditTodo={() => handleEditTodo(todo)}
            handleEditInput={handleEditInput}
            handleEditSave={handleEditSave}
            handleEditCancel={handleEditCancel}
          />
        ))}
      </>
    </section>
  );
};
