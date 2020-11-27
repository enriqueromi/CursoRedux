import { createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import {
  borrar,
  crearTodo,
  editar,
  limpiarCompletados,
  toggleAll,
  toogle,
} from './todos.actions';

export const estadoInicial: Todo[] = [
  new Todo('Salvar al mundo'),
  new Todo('Salvar al Pueblo'),
  new Todo('Salvar a la ciudad'),
  new Todo('Salvar mi casa'),
];

const _todoReducer = createReducer(
  estadoInicial,
  on(crearTodo, (state, { texto }) => [...state, new Todo(texto)]),
  on(borrar, (state, { id }) => state.filter((todo) => todo.id !== id)),
  on(limpiarCompletados, (state) => state.filter((todo) => !todo.completado)),
  on(toogle, (state, { id }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado,
        };
      } else {
        return todo;
      }
    });
  }),
  on(editar, (state, { id, texto }) => {
    return state.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          texto: texto,
        };
      } else {
        return todo;
      }
    });
  }),
  on(toggleAll, (state, { completado }) => {
    return state.map((todo) => {
      return {
        ...todo,
        completado: completado,
      };
    });
  })
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
