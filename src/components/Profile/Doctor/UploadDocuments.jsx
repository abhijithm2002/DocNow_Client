import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import uploadImageToCloudinary from '../../../utils/uploadCloudinary';
import { documentsUpload, getUploadedDocuments } from '../../../services/Doctor/doctorService';
import {AiOutlineCheckCircle, AiOutlineExclamationCircle} from 'react-icons/ai';

export default function UploadDocuments() {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ documents: [] });
  const [documentsVerified, setDocumentsVerified] = useState(null);

  // Get the doctor's email from the Redux state
  const doctorEmail = useSelector((state) => state.doctor.doctor?.email);
  
  

  useEffect(() => {
    const fetchUploadedDocuments = async () => {
      try {
        const response = await getUploadedDocuments(doctorEmail);
        if (response.status === 200) {
          const { documents, documents_verified } = response.data.data; 
          setUploadedDocuments(documents);
          setDocumentsVerified(documents_verified); 
          setFormData((prevFormData) => ({
            ...prevFormData,
            documents,
            email: doctorEmail,
          }));
        } else {
          toast.error('Failed to upload documents');
        }
      } catch (error) {
        toast.error('An error occurred while fetching uploaded documents.');
        console.error(error);
      }
    };

    if (doctorEmail) {
      fetchUploadedDocuments(); // Invoke the function here
    }
  }, [doctorEmail]);
  const handleMultipleFileUpload = async (event) => {
    const files = event.target.files;

    if (uploadedDocuments.length + files.length > 3) {
      toast.error('You can only upload a maximum of 3 documents.');
      return;
    }

    setIsLoading(true); // Start loading
    const uploadedFiles = [];

    for (let i = 0; i < files.length; i++) {
      const data = await uploadImageToCloudinary(files[i]);
      if (data.url) {
        uploadedFiles.push(data.url);
      } else {
        toast.error(`Failed to upload document ${i + 1}`);
      }
    }

    setUploadedDocuments([...uploadedDocuments, ...uploadedFiles]);
    setFormData((prevFormData) => ({
      ...prevFormData,
      documents: [...prevFormData.documents, ...uploadedFiles],
      email: doctorEmail, // Include email in formData
    }));
    setIsLoading(false); // Stop loading
  };

  const handleDeleteDocument = (index) => {
    const updatedDocuments = uploadedDocuments.filter((_, i) => i !== index);
    setUploadedDocuments(updatedDocuments);
    setFormData((prevFormData) => ({
      ...prevFormData,
      documents: updatedDocuments,
      email: doctorEmail,
    }));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleMultipleFileUpload({ target: { files } });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await documentsUpload(formData);
      if (response.status === 200) {
        toast.success('Documents uploaded successfully!');
        setIsOpen(false);
      } else {
        toast.error('Failed to upload documents');
      }
    } catch (error) {
      toast.error('An error occurred while uploading documents');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-sm font-medium text-primary-foreground border border-input rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Upload Documents
      </button>
      <Toaster position="top-center" />
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit}>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Upload Documents</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-muted-foreground hover:text-destructive focus:outline-none"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>

              <div
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-muted rounded-md p-8 transition-colors hover:border-primary"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
              >
                <UploadIcon className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Drag and drop your documents here or click to upload</p>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    multiple
                    name="documents"
                    onChange={handleMultipleFileUpload}
                    className="hidden"
                    accept=".jpg, .png"
                  />
                  <span className="text-primary underline">Browse Files</span>
                </label>
              </div>


              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {uploadedDocuments.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt="Uploaded Document"
                      className="aspect-square w-full rounded-md object-cover"
                    />
                    <button
                      onClick={() => handleDeleteDocument(index)}
                      className="absolute top-2 right-2 bg-white bg-opacity-80 text-muted-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <XIcon className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </button>
                  </div>
                ))}
              </div>
             

              <div className="flex mt-5 w-[400px]  h-[15px] items-center space-x-2 p-4 border rounded-lg shadow-md">
                {documentsVerified ? (
                  <div className="flex items-center text-green-600">
                    <AiOutlineCheckCircle className="w-6 h-6 mr-2" />
                    <span className="text-lg font-semibold">Documents are verified</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <AiOutlineExclamationCircle className="w-6 h-6 mr-2" />
                    <span className="text-lg font-semibold">Documents are not verified</span>
                  </div>
                )}
              </div>



              <div className="flex items-center mt-4">
                <button
                  type="submit"
                  className="w-full max-w-[150px] bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

// Reusable icons
function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
