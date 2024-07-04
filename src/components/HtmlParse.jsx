// utils/htmlUtils.js

import HTMLReactParser from 'html-react-parser';
//import HTMLReactParser from 'html-react-parser/lib/index';

export const htmlToPlainText = (htmlContent) => {
  // Use HTMLReactParser or any preferred method to convert HTML to plain text
  return HTMLReactParser(htmlContent).toString();
};
