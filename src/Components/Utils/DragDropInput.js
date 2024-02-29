import React from 'react'
import { Form } from 'react-bootstrap'

export default function DragDropInput({ files, setFiles, idx }) {

    const handleDrop = (e, idx) => {
        e.preventDefault();
        const droppedFiles = Array.from(e.dataTransfer.files);

        const reader = new FileReader();
        reader.onload = function (loadEvent) {
            files[idx] = loadEvent.target.result
            setFiles([...files]);
        };
        reader.readAsDataURL(droppedFiles[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleFileInputChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
       
        const reader = new FileReader();
        reader.onload = function (loadEvent) {
            console.log(loadEvent.target.result)
            files[idx] = loadEvent.target.result
            setFiles([...files]);
        };
        reader.readAsDataURL(selectedFiles[0]);
    };


    return (
        <div className='mb-4'>
            <Form.Group className="mb-2 drop-area" onDrop={(e) => handleDrop(e, idx)} onDragOver={handleDragOver}>
                <Form.Label >Drag files here or click to upload</Form.Label>

                <Form.Control size="md" type="file" id='fileInput' onChange={handleFileInputChange} />
                <div className="file-list mt-2">
                    {files.map((file, index) => (
                        (index === idx) ? <img key={index} src={file} alt="Uploaded" style={{ width: '300px', marginTop: '20px' }} /> : null
                    ))}
                </div>
            </Form.Group>

        </div>
    )
}