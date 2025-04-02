import type { Todo } from '@/usecases/todo/models/todo'
import type { TodoRepository } from '@/usecases/todo/repositories/todoRepository'
import axios, { type AxiosResponse } from 'axios'

/**
 * Todoリストを管理するRepositoryの実装クラス
 */
export class TodoRepositoryImpl implements TodoRepository {
  /**
   * IDを指定してTODOを取得する
   * @param id ID
   * @returns TODO
   */
  public async findOne(id: string): Promise<Todo | null> {
    const todo = (await axios.get<Todo, AxiosResponse<Todo>, never>(`/bff-api/v1/todo/${id}`)).data
    return todo
  }

  /**
   * TODOリストを取得する
   * @returns TODOリスト
   */
  public async findAll(): Promise<Todo[]> {
    return (await axios.get<Todo[], AxiosResponse<Todo[]>, never>('/bff-api/v1/todo')).data
  }
  /**
   * TODOを作成する
   * @param todo TODO
   * @returns 作成したTODO
   */
  public async create(todo: Todo): Promise<Todo> {
    return (await axios.post<Todo, AxiosResponse<Todo>, Todo>('/bff-api/v1/todo', todo)).data
  }
  /**
   * TODOを更新する
   * @param todo TODO
   */
  public async update(todo: Todo): Promise<void> {
    return (await axios.put<void, AxiosResponse<void>, Todo>(`/bff-api/v1/todo`, todo)).data
  }
  /**
   * TODOを削除する
   * @param id ID
   */
  public async delete(id: string): Promise<void> {
    return (await axios.delete<void, AxiosResponse<void>, never>(`/bff-api/v1/todo/${id}`)).data
  }
}
