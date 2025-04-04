import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage, Berita, Acara, VisiMisi, Tentang, Jurusan, Ekskul, Fasilitas, Galeri, DetailBerita, StudyTracer } from "./pages";
import { DetailAcara } from "./pages/konten/acara/[id]";
import { useEffect, useState } from "react";
import SchoolService from "./services/school";
import Favicon from "react-favicon";
import { School } from "./interfaces";
import { Header, MyFooter } from "./components";

function App() {

  const [schoolConfig, setSchoolConfig] = useState<School>()
  const [isLoading, setIsLoading] = useState(true) 


  useEffect(()=>{

    loadData()

    async function loadData() {
      setIsLoading(true)

      try {
        const response = await SchoolService().get()

        setSchoolConfig(response.data)
        
        localStorage.setItem("school_config", JSON.stringify(response.data))
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

  }, [])

  return isLoading ? '' : (
    <>
      <Favicon url={schoolConfig?.logo?.url ?? ''} />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/informasi/visi-misi" element={<VisiMisi />} />
        <Route path="/informasi/fasilitas" element={<Fasilitas />} />
        <Route path="/informasi/galeri" element={<Galeri />} />
        <Route path="/konten/berita" element={<Berita />} />
        <Route path="/konten/berita/:id" element={<DetailBerita />} />
        <Route path="/konten/acara" element={<Acara />} />
        <Route path="/konten/acara/:id" element={<DetailAcara />} />
        <Route path="/ekstrakurikuler" element={<Ekskul />} />
        <Route path="/jurusan/:id" element={<Jurusan />} />
        <Route path="/tentang-sekolah" element={<Tentang />} />
        <Route path="/study-tracer" element={<StudyTracer />} />
      </Routes>
      <MyFooter />
    </>
  );
}

export default App;