import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import Container from 'react-bootstrap/Container';

const CONVERT_API_SECRET = 'secret_zMJwase2OPfU5q8b';

// Convert base64 to Blob
const base64ToBlob = (base64, mimeType) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
        const slice = byteCharacters.slice(offset, offset + 512);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, { type: mimeType });
};

const WordToPDFViewer = forwardRef(({ onFileSelect }, ref) => {
    const fileInputRef = useRef(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('');

    const zoomPluginInstance = zoomPlugin();
    const { ZoomInButton, ZoomOutButton } = zoomPluginInstance;

    useImperativeHandle(ref, () => ({
        openFileDialog: () => {
            fileInputRef.current?.click();
        }
    }));

    const handleUpload = async (event) => {
        const file = event.target.files[0];

        if (file && file.name.endsWith('.docx')) {
            setFileName(file.name);
            setLoading(true);

            // ✅ Trigger parent callback (App.js)
            if (typeof onFileSelect === 'function') {
                console.log('📤 WordToPDFViewer: Triggering onFileSelect from App.js');
                onFileSelect(); // This runs handleStartsProgress from App
            }

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch(`https://v2.convertapi.com/convert/docx/to/pdf?Secret=${CONVERT_API_SECRET}`, {
                    method: 'POST',
                    body: formData,
                });

                const data = await response.json();
                console.log("ConvertAPI Response:", data);

                if (data?.Files?.[0]?.FileData) {
                    const base64 = data.Files[0].FileData;
                    const blob = base64ToBlob(base64, 'application/pdf');
                    const fileUrl = URL.createObjectURL(blob);
                    setPdfUrl(fileUrl);
                } else {
                    alert('Failed to convert the document.');
                }
            } catch (error) {
                console.error('Error converting document:', error);
                alert('Error during conversion.');
            } finally {
                setLoading(false);
            }
        } else {
            alert('Please upload a valid .docx file');
        }
    };

    return (
        <Container className="mt-1" style={{ display: '', backgroundColor: '' }}>
            <div>
                {/* Hidden file input */}
                <input
                    type="file"
                    accept=".docx"
                    ref={fileInputRef}
                    onChange={handleUpload}
                    style={{ display: 'none' }}
                />

                {/* Hidden trigger button if needed */}
                <div style={{ display: 'none', alignItems: 'center', gap: '15px', marginTop: '-60px' }}>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        Gen-AI Knowledge Article Ingestion
                    </button>
                    {fileName && <span style={{ fontWeight: 500 }}>{fileName}</span>}
                </div>

                {loading && <p></p>}

                {pdfUrl && (
                    <div style={{ marginTop: '0px', background: '#f4f4f4', height: '370px', maxWidth: '700px', border: '1px solid #ccc' }}>
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
                            <Viewer fileUrl={pdfUrl} plugins={[zoomPluginInstance]} />
                        </Worker>
                    </div>
                )}
            </div>
        </Container>
    );
});

export default WordToPDFViewer;
