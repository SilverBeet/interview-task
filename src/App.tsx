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
    if (title === "") setTitle(item.title)
  }

  return <div className={`flex w-1/2 m-2 rounded-lg bg-green-400 overflow-hidden col-span-${item.width}`}>
    <img className="h-24" src={item.imageUrl} />
    {!editingTitle
      ? <h1 onClick={() => setEditingTitle(true)} className="self-start m-2">{title}</h1>
      : <textarea value={title} onBlur={onDone} onChange={(e) => setTitle(e.currentTarget.value)} className="self-start m-2" />}
  </div>
}

export default App;
