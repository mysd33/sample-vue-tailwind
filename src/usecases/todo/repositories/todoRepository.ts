import { useHttpClient } from '@/usecases/common/http-client'
import type { Todo } from '@/usecases/todo/models/todo'

/**
 * Todoリストを管理するRepositoryの実装クラス
 */
export class TodoRepository {
  private static instance: TodoRepository
  private readonly httpClient = useHttpClient()
  private constructor() {}
  /**
   * TodoRepositoryのインスタンスを取得する
   * @returns TodoRepositoryのインスタンス
   */
  public static getInstance(): TodoRepository {
    if (!TodoRepository.instance) {
      TodoRepository.instance = new TodoRepository()
    }
    return TodoRepository.instance
  }

  /**
   * IDを指定してTODOを取得する
   * @param id ID
   * @returns TODO
   */
  public async findOne(id: string): Promise<Todo | null> {
    return (await this.httpClient.get<Todo>(`/bff-api/v1/todo/${id}`)).data
  }

  /**
   * TODOリストを取得する
   * @returns TODOリスト
   */
  public async findAll(): Promise<Todo[]> {
    return (await this.httpClient.get<Todo[]>('/bff-api/v1/todo')).data
  }
  /**
   * TODOを作成する
   * @param todo TODO
   * @returns 作成したTODO
   */
  public async create(todo: Todo): Promise<Todo> {
    return (await this.httpClient.post<Todo, Todo>('/bff-api/v1/todo', todo)).data
  }
  /**
   * TODOを更新する
   * @param todo TODO
   */
  public async update(todo: Todo): Promise<void> {
    return (await this.httpClient.put<Todo, void>(`/bff-api/v1/todo`, todo)).data
  }
  /**
   * TODOを削除する
   * @param id ID
   */
  public async delete(id: string): Promise<void> {
    return (await this.httpClient.delete<void>(`/bff-api/v1/todo/${id}`)).data
  }
}
