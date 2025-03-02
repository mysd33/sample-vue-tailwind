/**
 * ページの情報を保持するクラス
 */
export class Page<T> {
  constructor(
    public content: T[],
    public totalElements: number,
  ) {}
}

/**
 * ページネーションの情報を保持するクラス
 */
export class Pageable {
  constructor(
    public pageSize: number,
    public offset: number,
  ) {}
}
