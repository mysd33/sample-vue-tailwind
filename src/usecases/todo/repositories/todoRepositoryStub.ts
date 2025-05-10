import { useTodoDummyStore } from '@/usecases/todo/stores/todoStore'
import type { Todo } from '@/usecases/todo/models/todo'
import { generateUUID } from '@/usecases/common/utils/idUtils'

const sleepTime = 300

/**
 * Todoリストを管理するRepositoryのStubクラス
 */
export class TodoRepositoryStub {
  // Piniaで保持するダミーのストアを利用
  private readonly todoDummyStore = useTodoDummyStore()

  private static instance: TodoRepositoryStub
  private constructor() {}
  /**
   * Todoリストを管理するRepositoryのStubクラスのインスタンスを取得する
   * @returns Todoリストを管理するRepositoryのStubクラスのインスタンス
   **/
  public static getInstance(): TodoRepositoryStub {
    if (!TodoRepositoryStub.instance) {
      TodoRepositoryStub.instance = new TodoRepositoryStub()
    }
    return TodoRepositoryStub.instance
  }

  /**
   * IDを指定してTodoを取得する
   * @param id ID
   * @returns Todo
   */
  public async findOne(id: string): Promise<Todo | null> {
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
    // サーバ処理を疑似するため待機
    await new Promise((resolve) => setTimeout(resolve, sleepTime))
    this.todoDummyStore.update(todo)
  }

  /**
   * TODOを削除する
   * @param id ID
   */
  public async delete(id: string): Promise<void> {
    // サーバ処理を疑似するため待機
    await new Promise((resolve) => setTimeout(resolve, sleepTime))

    this.todoDummyStore.remove(id)
  }
}
