import {MyBanner} from "../../../components";
import {News} from "../../../features/konten/berita";

export const Berita = () => {
  return (
    <>
      <MyBanner title="Berita" currentPage="Berita" beforePages={[{title: "Beranda", href: "/"}]} />

      <div className="container py-10 gap-10 flex flex-col ">
        <News />
      </div>
    </>
  );
};
