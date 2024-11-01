import React, { useState } from "react";
import axios from "axios";
import PDFViewer from "../PDFViewer.js";

export default function Home() {
  const [file, setFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState("");
  const [parsedData, setParsedData] = useState([]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("pdf", file);

    const response = await axios.post("http://localhost:5000/upload", formData);
    setPdfUrl(response.data.filePath);
    parsePDF(response.data.filePath);
  };

  const parsePDF = async (url) => {
    const pdfjsLib = await import("pdfjs-dist/build/pdf");
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;

    const loadingTask = pdfjsLib.getDocument(url);
    const pdf = await loadingTask.promise;

    const textContent = [];
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const textItems = content.items.map((item) => item.str);
      textContent.push(textItems);
    }

    // 신구조문 배열로 변환하는 로직 추가
    const formattedData = formatTextContent(textContent);
    setParsedData(formattedData);
  };

  const formatTextContent = (textContent) => {
    // 신구조문 배열로 변환하는 로직을 작성하세요.
    // 예시: [['구조문1', '구조문2'], ['구조문3', '구조문4']]
    return textContent; // 현재는 단순히 원본 텍스트를 반환합니다.
  };

  return (
    <div>
      <h1>PDF Viewer</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>
      {pdfUrl && (
        <div>
          <PDFViewer pdfUrl={`http://localhost:5000/${pdfUrl}`} />
          <h2>Parsed Data</h2>
          <pre>{JSON.stringify(parsedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
