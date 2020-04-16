import { DocumentTitleProps } from "./DocumentTitle.types";

const DocumentTitle = ({ append, title }: DocumentTitleProps) => {
  const currentTitle = document.title;

  document.title = append ? currentTitle + title : title;

  return null;
};

export default DocumentTitle;
