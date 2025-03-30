import type { Todo } from '@/usecases/todo/models/todo'
import type { TodoRepository } from '@/usecases/todo/repositories/todoRepository'

/**
 * TODOリスト機能を提供するServiceインタフェース
 */
export interface TodoService {
  /**
   * IDを指定してTODOを取得する
   * @param id ID
   * @returns TODO
   */
  findOne(id: string): Promise<Todo | null>
  /**
   * TODOリストを取得する
   * @returns TODOリスト
   */
  findAll(): Promise<Todo[]>
  /**
   * TODOを追加する
   * @param title タイトル
   */
  create(title: string): Promise<void>
  /**
   * TODOを完了する
   * @param id ID
   */
  finish(id: string): Promise<void>
  /**
   * TODOを削除する
   * @param id ID
   */
  delete(id: string): Promise<void>
}

/**
 * TODOリスト機能を提供するServiceクラス
 */
export class TodoServiceImpl implements TodoService {
  constructor(private todoRepository: TodoRepository) {}
  /**
   * IDを指定してTODOを取得する
   * @param id ID
   * @returns TODO
   */
  public async findOne(id: string): Promise<Todo | null> {
    return this.todoRepository.findOne(id)
  }

  /**
   * TODOリストを取得する
   * @returns TODOリスト
   */
  public async findAll(): Promise<Todo[]> {
    return this.todoRepository.findAll()
  }

  /**
   * TODOを追加する
   * @param title タイトル
   */
  public async create(title: string): Promise<void> {
    await this.todoRepository.create({
      title: title,
    })
  }

  /**
   * TODOを完了する
   * @param id ID
   */
  public async finish(id: string): Promise<void> {
    const todo = await this.todoRepository.findOne(id)
    if (!todo) {
      return
    }
    todo.finished = true
    await this.todoRepository.update(todo)
  }

  /**
   * TODOを削除する
   * @param id ID
   */
  public async delete(id: string): Promise<void> {
    await this.todoRepository.delete(id)
  }
}
