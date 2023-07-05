import { useNavigate } from "react-router-dom";
import NewDocumentForm from "../UserDashboard/Documents/NewDocumentForm";

const NewDocument = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto flex h-screen max-w-6xl flex-col items-center justify-center ">
      {/* <div className="z-[100] max-w-4xl"> */}
      <NewDocumentForm
        visible={true}
        onClose={() => {
          console.log("Close form");

          navigate("/dash");
          //   navigate(doesAnyHistoryEntryExist? -1 : "/dash");
        }}
        fullScreen={true}
      />
    </div>
    // </div>
  );
};

export default NewDocument;
