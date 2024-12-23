import { useEffect, useState } from "react";
import {MyBanner} from "../../components";
import { Fajusek } from "../../interfaces";
import { EkstrakurikulerService } from "../../services";
import { Spinner } from "flowbite-react";

export const Ekskul = () => {

  const [data, setData] = useState<Fajusek[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(()=>{
    loadData()

    async function loadData() {
      setIsLoading(true)
      try {
        const response = await EkstrakurikulerService().all()
        setData(response.data)
      } catch (error) {
        console.error(error)      
      }
      setIsLoading(false)
    }
  }, [])

  return (
    <>
        <MyBanner title="Ekstrakurikuler" currentPage="Ekstrakurikuler" beforePages={[{title: "Beranda", href: "/"}]} />

        <div className="container py-10 gap-10 flex flex-col ">
          {isLoading ? (
            <div className="m-auto">
              <Spinner size="lg"/>
            </div>
          ) : (
            data.map(ekskul=>(
              <div className="flex flex-col gap-3">
                <h2 className="text-lg font-medium">{ekskul.name}</h2>
                <p>{ekskul.description}</p>
                {ekskul.media.map(media=><img  src={media.url} alt={ekskul.name}/>)}
              </div>
            ))
          )}
        </div>
    </>
  );
};
