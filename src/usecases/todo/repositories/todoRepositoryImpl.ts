import { HttpClient } from '@/framework/http-client'
import type { Todo } from '@/usecases/todo/models/todo'
import type { TodoRepository } from '@/usecases/todo/repositories/todoRepository'

/**
 * Todoリストを管理するRepositoryの実装クラス
 */
export class TodoRepositoryImpl implements TodoRepository {
  private readonly httpClient = new HttpClient(
    {
      baseURL: import.meta.env.VITE_API_BASE_URL, // APIのベースURLを指定
      timeout: parseInt(import.meta.env.VITE_HTTP_CLIENT_TIMEOUT, 10) || 0, // タイムアウト時間(ms)を指定 デフォルト（0）は無制限
    },
    undefined,
    import.meta.env.VITE_RETRYABLE_STATUS_CODES, // リトライ対象のステータスコードのリスト
  )

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
