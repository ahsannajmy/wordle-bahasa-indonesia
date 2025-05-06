import { decode } from "html-entities";

const decodedHTML = (htmlVal: string) => {
  return decode(htmlVal);
};

export default decodedHTML;
