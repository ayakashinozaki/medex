import { useState } from 'react';

export default function UploadPage() {
    const [image, setImage] = useState(null);
    const [report, setReport] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append("file", document.getElementById("fileInput").files[0]);

        const response = await fetch("/api/generate-report", {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        setReport(data.report);
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h1>Upload Medical File</h1>
            <input type="file" id="fileInput" onChange={handleFileChange} />
            {image && <img src={image} alt="Preview" width="200px" />}
            <button onClick={handleUpload}>Generate Report</button>
            {report && <p><strong>AI Report:</strong> {report}</p>}
        </div>
    );
}
