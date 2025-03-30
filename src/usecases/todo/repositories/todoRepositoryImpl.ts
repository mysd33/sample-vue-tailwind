import type { Todo } from '@/usecases/todo/models/todo'
import type { TodoRepository } from '@/usecases/todo/repositories/todoRepository'
import axios from 'axios'

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
    //TODO:　ジェネリクスを使って型を指定する
    return (await axios.get(`/bff-api/v1/todo/${id}`)).data
  }

  /**
   * TODOリストを取得する
   * @returns TODOリスト
   */
  public async findAll(): Promise<Todo[]> {
    //TODO:　ジェネリクスを使って型を指定する
    return (await axios.get('/bff-api/v1/todo')).data
  }
  /**
   * TODOを作成する
   * @param todo TODO
   * @returns 作成したTODO
   */
  public async create(todo: Todo): Promise<Todo> {
    //TODO:　ジェネリクスを使って型を指定する
    return (await axios.post('/bff-api/v1/todo', todo)).data
  }
  /**
   * TODOを更新する
   * @param todo TODO
   */
  public async update(todo: Todo): Promise<void> {
    //TODO:　ジェネリクスを使って型を指定する
    return await axios.put(`/bff-api/v1/todo`, todo)
  }
  /**
   * TODOを削除する
   * @param id ID
   */
  public async delete(id: string): Promise<void> {
    //TODO:　ジェネリクスを使って型を指定する
    return await axios.delete(`/bff-api/v1/todo/${id}`)
  }
}
