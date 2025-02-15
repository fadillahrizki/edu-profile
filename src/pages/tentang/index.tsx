import { useState } from "react";
import {MyBanner} from "../../components";
import { School } from "../../interfaces";

import parse from 'html-react-parser'

export const Tentang = () => {

  const [schoolConfig] = useState<School>(JSON.parse(localStorage.getItem("school_config")!))

  return (
    <>
      <MyBanner title="Tentang Sekolah" currentPage="Tentang Sekolah" beforePages={[{title: "Beranda", href: "/"}]} />

      <div className="container py-10 gap-10 flex flex-col ">
        <p className="text-pretty text-lg text-gray-900 text-justify my-auto html-content">{parse(schoolConfig.about)}</p>
      </div>
    </>
  );
};
