/**
 * ページの情報を保持するクラス
 */
export class Page<T> {
  constructor(
    //TODO: Pageableを持たせるように修正するか検討
    /**
     * 現在のページ数
     */
    public pageNumber: number,
    /**
     * ページの表示内容（検索結果）
     */
    public content: T[],
    /**
     * 総件数
     */
    public totalElements: number,
  ) {}
}

/**
 * ページネーションの情報を保持するクラス
 */
export class Pageable {
  constructor(
    /**
     * ページサイズ（1ページ当たりの表示件数）
     */
    public pageSize: number,
    /**
     * 現在のページ数
     */
    public pageNumber: number,
    /**
     * 現在ページ数の基づくオフセット（検索結果を返却する際の開始位置）
     */
    public offset: number,
  ) {}
}
