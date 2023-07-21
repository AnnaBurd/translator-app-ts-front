import { useNavigate } from "react-router-dom";
import UploadDocumentForm from "../UserDashboard/Documents/UploadDocumentForm";
import { useState } from "react";

type UploadDocumentModalProps = {
  onModalClose?: () => void;
};

const UploadDocumentModal: React.FC<UploadDocumentModalProps> = ({
  onModalClose,
}) => {
  const navigate = useNavigate();

  const [isFormVisible, setIsFormVisible] = useState(true);

  const handleModalClose = () => {
    // If close logic is provided, call it
    if (onModalClose) {
      setIsFormVisible(false);
      onModalClose();
    }

    // Otherwise, navigate to user dashboard by default
    if (!onModalClose) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="fixed left-0 top-0 z-50 mx-8 flex h-screen w-screen flex-col items-center justify-center sm:mx-0">
      <div className="flex w-4/5 max-w-6xl items-center justify-center md:w-3/5">
        <UploadDocumentForm
          visible={isFormVisible}
          onClose={handleModalClose}
          fullScreen={true}
        />
      </div>
    </div>
  );
};

export default UploadDocumentModal;
