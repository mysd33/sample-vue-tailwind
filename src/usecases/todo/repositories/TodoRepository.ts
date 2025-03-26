import { useTodoDummyStore } from '@/usecases/todo/stores/todoStore'
import type { Todo } from '@/usecases/todo/models/Todo'
import { generateUUID } from '@/usecases/common/utils/idUtils'

const sleepTime = 300

/**
 * Todoリストを管理するRepositoryインタフェース
 */
export interface TodoRepository {
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
   * TODOを作成する
   * @param todo TODO
   * @returns 作成したTODO
   */
  create(todo: Todo): Promise<Todo>
  /**
   * TODOを更新する
   * @param todo TODO
   */
  update(todo: Todo): Promise<void>
  /**
   * TODOを削除する
   * @param id ID
   */
  delete(id: string): Promise<void>
}

/**
 * Todoリストを管理するRepositoryクラス
 */
export class TodoRepositoryImpl implements TodoRepository {
  private todoDummyStore = useTodoDummyStore()

  public async findOne(id: string): Promise<Todo | null> {
    // TODO: サーバ側のTODOリスト取得処理を呼び出す

    // サーバ処理を疑似するため待機
    await new Promise((resolve) => setTimeout(resolve, sleepTime))

    const todo = this.todoDummyStore.todos.find((todo) => todo.id === id)
    return todo ? todo : null
  }

  /**
   * Todoリストを取得する
   * @returns Todoリスト
   */
  public async findAll(): Promise<Todo[]> {
    // TODO: サーバ側のTODOリスト取得処理を呼び出す

    // サーバ処理を疑似するため待機
    await new Promise((resolve) => setTimeout(resolve, sleepTime))

    // スタブ実装として、piniaのローカルストレージのストアにあるTodoリストを返す
    return this.todoDummyStore.todos
  }

  /**
   * Todoを作成する
   * @param todo Todo
   */
  public async create(todo: Todo): Promise<Todo> {
    // TODO: サーバ側のTODO作成処理を呼び出す

    // サーバ処理を疑似するため待機
    await new Promise((resolve) => setTimeout(resolve, sleepTime))
    // 本来サーバ登録時に設定される値をクライアントでダミー値を設定
    todo.id = generateUUID()
    todo.finished = false
    todo.createAt = new Date()

    // スタブ実装として、piniaのローカルストレージのストアにTodoを追加
    this.todoDummyStore.add(todo)
    return todo
  }

  /**
   * TODOを更新する
   * @param todo Todo
   */
  public async update(todo: Todo): Promise<void> {
    // TODO: サーバ側のTODO作成処理を呼び出す

    // サーバ処理を疑似するため待機
    await new Promise((resolve) => setTimeout(resolve, sleepTime))
    this.todoDummyStore.update(todo)
  }

  /**
   * TODOを削除する
   * @param id ID
   */
  public async delete(id: string): Promise<void> {
    // TODO: サーバ側のTODO作成処理を呼び出す
    // サーバ処理を疑似するため待機
    await new Promise((resolve) => setTimeout(resolve, sleepTime))

    this.todoDummyStore.remove(id)
  }
}
