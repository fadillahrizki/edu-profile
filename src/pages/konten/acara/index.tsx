import {Header, MyFooter, MyBanner} from "../../../components";
import {News} from "../../../features/konten/acara";

export const Acara = () => {
  return (
    <>
      <Header />
      <MyBanner title="Acara" currentPage="Acara" beforePages={[{title: "Beranda", href: "/"}]} />

      <div className="container py-10 gap-10 flex flex-col min-h-[40vh]">
        <News />
      </div>

      <MyFooter />
    </>
  );
};
