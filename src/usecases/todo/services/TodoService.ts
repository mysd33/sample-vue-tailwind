import type { Todo } from '../models/todo'
import { TodoRepository } from '../repositories/TodoRepository'

/**
 * TODOリスト機能を提供するサービス
 */
export class TodoService {
  constructor(private todoRepository: TodoRepository) {}

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
