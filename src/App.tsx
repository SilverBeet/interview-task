import { useQuery } from "@tanstack/react-query"
import { KeyboardEventHandler, useState } from "react"
import { getArticles, IArticle, IArticleResponse } from "./api/article"

function App() {
  const { data, error, isLoading } = useQuery<IArticleResponse[][], Error>(["articles"], getArticles)

  if (isLoading || !data) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>

  const [rowArticles] = data;

  return (
    <div className="pt-16">
      {rowArticles.map((it) => <ArticleRow item={it} />)}
    </div>
  )
}

const ArticleRow: React.FC<{
  item: IArticleResponse
}> = ({ item }) => {
  return <div className="flex justify-evenly">
    {item.columns.map((it) => <ArticleColumn item={it} />)}
  </div >
}


const ArticleColumn: React.FC<{ item: IArticle }> = ({ item }) => {
  const [editingTitle, setEditingTitle] = useState(false)
  const [title, setTitle] = useState(item.title)

  const onDone = () => {
    setEditingTitle(false)
    if (title === "") setTitle(item.title.trim())
  }

  return <div className={`w-1/2 m-2 rounded-lg bg-green-400 overflow-hidden col-span-${item.width}`}>
    <a className="flex flex-wrap">
      <img className="h-24" src={item.imageUrl} />
      {!editingTitle
        ? <h1 className="self-start m-2 text-overflow">{title}</h1>
        : <textarea autoFocus value={title} onChange={(e) => setTitle(e.currentTarget.value)} className="self-start m-2" />}
    </a>
    <button className="rounded-full bg-green-500 self-end px-4 m-2" onClick={() => editingTitle ? onDone() : setEditingTitle(true)}>
      {editingTitle ? "confirm" : "edit"}
    </button>
  </div>
}

export default App;
