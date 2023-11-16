import useDataPrivate from "../../hooks/useDataPrivate";

import { Navigate, useParams } from "react-router-dom";
import { Doc } from "../../@types/doc";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import SideMenu from "./SideMenu/SideMenu";
import AnimatedPage from "../../components/animations/AnimatedPage";
import Loader from "../../components/Loaders/Loader";
import TextEditor from "./TextEditor/TextEditor";
import useUploadedDocument from "./DocxManager/useUploadedDocument";

export default function Editor() {
  // Load the document data from the database
  const { docId } = useParams();
  const [document, isLoading, error] = useDataPrivate<Doc>(`docs/${docId}`);

  // And, if the document was just uploaded by the user, get that document from the application context
  const uploadedDocument = useUploadedDocument(document?.slug);

  if (isLoading) return <Loader />;

  if (error)
    return (
      <Navigate
        to="/error?type=document-not-found"
        replace
        state={{ key: "redirected" }}
      />
    );

  return (
    <>
      <AnimatedPage>
        <div className="relative z-0 grid h-min w-full grid-cols-1 grid-rows-[auto_minmax(0,1fr)_auto] overflow-hidden px-6 pb-10 pt-[1.15rem] md:h-screen md:px-4 2xl:px-16">
          <div className="pb-4 pl-10 md:pl-12 2xl:pl-0">
            <Breadcrumbs
              title={document?.title}
              lang={document?.lang}
              translationLang={document?.translationLang}
            ></Breadcrumbs>
          </div>
          <TextEditor document={document} uploadedDocument={uploadedDocument} />
        </div>
        <SideMenu
          hasUploadedDocument={uploadedDocument !== null}
          documentSlug={document?.slug}
        ></SideMenu>
      </AnimatedPage>
    </>
  );
}
