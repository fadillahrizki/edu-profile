import { useEffect, useState } from 'react'
import { MyCard } from '../../../components'
import { ArticleService } from '../../../services'
import { Article } from '../../../interfaces'
import { Pagination, Spinner } from 'flowbite-react'
import { useSearchParams } from 'react-router-dom'

export const News = () => {

  const [data, setData] = useState<Article[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const [searchParams, setSearchParams] = useSearchParams()
  
  useEffect(()=>{
    if(!searchParams.get('page')) {
      setSearchParams({page:'1'})
    } else {
      
      loadData()

      async function loadData() {
        setIsLoading(true)
        try {
          const response = await ArticleService().all({page:parseInt(searchParams.get('page')!), type: 'Acara Umum'})
          setData(response.data)
          setTotalPages(response.last_page)
        } catch (error) {
          console.error(error)      
        }
        setIsLoading(false)
      }
    }
  }, [searchParams, setSearchParams])
  
  const onPageChange = (page:number) => {
    setSearchParams({page:page.toString()})
  }

  return isLoading ? (
    <div className="m-auto">
      <Spinner size="lg"/>
    </div>
  ) : (
    data.length > 0 ? (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map(article=><MyCard key={article.id} image={article.banner?.url || "https://flowbite-react.com/images/blog/image-1.jpg"} title={article.title} description={article.description} href={'/konten/berita/'+article.uuid} badge={article.category||''} date={article.createdAt}/>)}
      </div>
      
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination currentPage={parseInt(searchParams.get('page')!)} totalPages={totalPages} onPageChange={onPageChange} showIcons previousLabel="Sebelumnya" nextLabel="Selanjutnya"/>
      </div>
    </>
    ) : <img className='w-1/3 mx-auto' src='../empty-data.svg' />
  )
}