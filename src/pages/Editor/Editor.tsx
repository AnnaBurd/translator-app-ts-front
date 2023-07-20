import useDataPrivate from "../../hooks/useDataPrivate";

import { useParams } from "react-router-dom";
import { Doc } from "../../@types/doc";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import SideMenu from "./SideMenu/SideMenu";
import AnimatedPage from "../../components/animations/AnimatedPage";
import Loader from "../../components/animations/Loader";
import TextEditor from "./TextEditor/TextEditor";
import { useState } from "react";
import DocxHandler from "./DocxHandler";

export default function Editor() {
  // Load the document data
  const { docId } = useParams();
  const [document, isLoading, error] = useDataPrivate<Doc>(`docs/${docId}`);
  console.log("Editor component render:", document, isLoading, error);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>🔥 Could not load document: {error}</div>;
  }

  return (
    <>
      <AnimatedPage>
        <SideMenu></SideMenu>

        <div className="grid h-min w-full grid-cols-1 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden px-6 pb-10 pt-[1.15rem] md:h-screen md:px-4 2xl:px-16 ">
          <DocxHandler />
          <div className="pb-4 pl-10 md:pl-12 2xl:pl-0">
            <Breadcrumbs
              title={document?.title}
              lang={document?.lang}
              translationLang={document?.translationLang}
              // isDocumentMenuOpen={isDocumentMenuOpen}
            ></Breadcrumbs>
          </div>
          <TextEditor document={document} />
        </div>
      </AnimatedPage>
    </>
  );
}
