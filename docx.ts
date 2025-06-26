import { asBlob } from "html-docx-js-typescript";
import { saveAs } from "file-saver";

const tailwindToInline: Record<string, string> = {
  "text-xl": "font-size: 1.25rem;",
  "text-center": "text-align: center;",
  "font-bold": "font-weight: 700;",
  "mt-4": "margin-top: 1rem;",
  "mb-4": "margin-bottom: 1rem;",
  "p-2": "padding: 0.5rem;",
  "ml-2": "margin-left: 0.5rem;",
  "p-page": "padding: 1rem;",
  "m-page": "margin: 1rem;",
  "w-a4": "width: 793.7px;",
  "h-a4": "height: 1122.5px;",
  "w-[1000px]": "width: 1000px;",
  "w-[50%]": "width: 50%;",
  "h-[100vh]": "height: 100vh;",
  "max-w-page": "max-width: 793.7px;",
  "max-h-page": "max-height: 1122.5px;",
  flex: "display: flex;",
  "flex-col": "flex-direction: column;",
  "items-center": "align-items: center;",
  "justify-start": "justify-content: flex-start;",
  "justify-center": "justify-content: center;",
  "bg-gray-200": "background-color: #e5e7eb;",
  border: "border: 1px solid #000;",
  "border-collapse": "border-collapse: collapse;",
  "mx-auto": "margin-left: auto; margin-right: auto;",
  "text-white": "color: #ffffff;",
  "text-green-500": "color: #10b981;",
  "text-blue-500": "color: #3b82f6;",
  rounded: "border-radius: 0.25rem;",
  "border-spacing-0": "border-spacing: 0;",
  "border-1": "border-width: 1px;",
  "border-solid": "border-style: solid;",
  "border-black": "border-color: #000;",
};

const convertClassesToInline = (htmlContent: string): string => {
  return htmlContent.replace(/class="([^"]*)"/g, (match, classNames) => {
    const styles = classNames
      .split(" ")
      .map((cls: string) => tailwindToInline[cls] || "")
      .join(" ");
    return `style="${styles}"`;
  });
};

const getBase64Image = (
  imgUrl: string,
  width: number,
  height: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imgUrl;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0, width, height);
      const dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };
    img.onerror = (error) => reject(error);
  });
};

export const generateDocx = async (
  elementId: string,
  filename: string
): Promise<void> => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Element not found");
    return;
  }

  const base64Image = await getBase64Image("/assets/your_image.png", 120, 120);

  let htmlContent = element.innerHTML;
  htmlContent = htmlContent.replace(
    `<img src="/assets/your_image.png" alt="Your alt" width="100" height="100">`,
    `<div style="text-align: center;">
        <img src="${base64Image}" alt="Your alt" />
      </div>`
  );

  htmlContent = convertClassesToInline(htmlContent);

  const preHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/1999/xhtml'>
        <head><meta charset='utf-8'><title>Export HTML To Doc</title></head>
        <body>`;
  const postHtml = "</body></html>";
  const html = preHtml + htmlContent + postHtml;

  try {
    const options = {
      orientation: "portrait" as const,
      margins: { top: 100, bottom: 100, left: 100, right: 100 },
    };

    const docxBlob = await asBlob(html, options);
    saveAs(docxBlob as Blob, filename ? `${filename}.docx` : "document.docx");
  } catch (error) {
    console.error("Error generating DOCX file:", error);
  }
};
