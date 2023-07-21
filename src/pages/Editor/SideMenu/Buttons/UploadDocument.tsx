import MenuButton from "./MenuButton";

type UploadDocumentButtonProps = { onUploadDocument: () => Promise<void> };

const UploadDocument: React.FC<UploadDocumentButtonProps> = ({
  onUploadDocument,
}) => {
  return (
    <MenuButton
      iconPath={
        "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      }
      onClick={onUploadDocument}
    >
      Upload document (docx)
    </MenuButton>
  );
};

export default UploadDocument;
