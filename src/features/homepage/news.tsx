import { useEffect, useState } from 'react'
import { Button, Spinner } from 'flowbite-react'
import { Link, useSearchParams } from 'react-router-dom'
import { MyCard } from '../../components'
import { ArticleService } from '../../services'
import { Article } from '../../interfaces'

export const News = () => {

  const [data, setData] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const [searchParams, setSearchParams] = useSearchParams()
  
  useEffect(()=>{

    loadData()

    async function loadData() {
      setIsLoading(true)
      try {
        const response = await ArticleService().all({page:1})
        setData(response.data)
      } catch (error) {
        console.error(error)      
      }
      setIsLoading(false)
    }
  }, [searchParams, setSearchParams])

  return isLoading ? (
    <div className="m-auto">
      <Spinner size="lg"/>
    </div>
  ) : (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map(article=><MyCard key={article.id} image={"https://flowbite-react.com/images/blog/image-1.jpg"} title={article.title} description={article.description} href={'/konten/berita/'+article.uuid} badge={article.type} date={article.createdAt}/>)}
      </div>
      
      <div className="flex overflow-x-auto sm:justify-center">
        <Link to="/konten/berita">
        <Button>
          Lihat Selengkapnya
        </Button>
        </Link>
      </div>
    </>
  )
}