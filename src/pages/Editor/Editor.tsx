import useDataPrivate from "../../hooks/useDataPrivate";

import { useParams } from "react-router-dom";
import { Doc } from "../../@types/doc";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import SideMenu from "./SideMenu";
import AnimatedPage from "../../components/animations/AnimatedPage";
import Loader from "../../components/animations/Loader";
import TextEditor from "./TextEditor/TextEditor";
import { useState } from "react";

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

        <div className="grid h-min w-full grid-cols-1 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden py-5 pl-16 pr-2 sm:pl-20 sm:pr-6 md:h-screen md:pr-4">
          <div className="pb-4">
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
