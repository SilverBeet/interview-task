
export interface IArticleResponse {
  type: "Row";
  columns: IArticle[];
}

export interface IArticle {
  type: "Article";
  width: number;
  url: string;
  title: string;
  imageUrl: string;
}

export const getArticles = () => {
  return fetch("https://storage.googleapis.com/aller-structure-task/test_data.json").then(res => res.json())
}