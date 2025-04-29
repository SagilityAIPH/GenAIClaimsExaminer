import { pdfjs } from 'react-pdf';
 
// pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
pdfjs.GlobalWorkerOptions.workerSrc = process.env.PUBLIC_URL + '/pdf.worker.min.js';