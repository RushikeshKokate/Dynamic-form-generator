import React, { useState } from 'react';
import { Button, Backdrop, CircularProgress, Typography } from '@mui/material';
import DataPreview from './DataPreview';

type Field = {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
  validation?: { pattern: string; message: string };
};

type FormData = {
  formTitle: string;
  formDescription: string;
  fields: Field[];
};

type FormPreviewProps = {
  newError: string[] | null;
  formData: FormData | null;
};

const FormPreview: React.FC<FormPreviewProps> = ({ newError, formData }) => {
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setBackdropOpen(true);

    
    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('Response has been submitted successfully!');  
    }, 1000);
  };

  return (
    <div className="bg-gray-900 p-6 shadow-lg md:h-[100vh] md:overflow-y-scroll md:scrollbar-w-0">
     
      {newError && newError.length > 0 ? (
        <ul>
          <h4 className="text-red-500 mt-2">ERRORS</h4>
          {newError.map((error, index) => (
            <li key={index} className="mt-4 text-red-500">
              {index + 1}: {error}
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-white">
          {formData ? (
            <div>
              <h2 className="text-2xl font-bold mb-4">{formData.formTitle}</h2>
              <p className="mb-6">{formData.formDescription}</p>
              <form onSubmit={handlePreview} className="space-y-6">
                {formData.fields.map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="block mb-2 font-medium">
                      {field.label} {field.required && <span className="text-red-500">*</span>}
                    </label>
                   
                    {field.type === 'text' || field.type === 'email' || field.type === 'textarea' ? (
                      React.createElement(field.type === 'textarea' ? 'textarea' : 'input', {
                        id: field.id,
                        type: field.type === 'textarea' ? undefined : field.type,
                        placeholder: field.placeholder,
                        required: field.required,
                        className:
                          'w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500',
                        value: formValues[field.id] || '',
                        onChange: handleChange,
                      })
                    ) : field.type === 'select' ? (
                      <select
                        id={field.id}
                        required={field.required}
                        className="w-full p-3 border border-gray-700 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
                        value={formValues[field.id] || ''}
                        onChange={handleChange}
                      >
                        <option value="">Select an option</option>
                        {field.options?.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    ) : field.type === 'radio' ? (
                      field.options?.map((option) => (
                        <label key={option.value} className="block">
                          <input
                            type="radio"
                            id={field.id}
                            name={field.id}
                            value={option.value}
                            required={field.required}
                            className="mr-2"
                            onChange={handleChange}
                          />
                          {option.label}
                        </label>
                      ))
                    ) : null}
                  </div>
                ))}
                
                <button
                  type="submit"
                  className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                >
                  Submit
                </button>
              </form>

               
              <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={backdropOpen}
                onClick={() => setBackdropOpen(false)}
              >
                {loading ? (
                  <CircularProgress color="inherit" />
                ) : (
                  <div className="p-4 bg-white rounded-lg">
                    <DataPreview
                      formValues={{
                        comments: formValues.comments,
                        companySize: formValues.companySize,
                        email: formValues.email,
                        industry: formValues.industry,
                        name: formValues.name,
                        timeline: formValues.timeline,
                      }}
                      setBackdropOpen={setBackdropOpen}
                    />
                  </div>
                )}
              </Backdrop>
            </div>
          ) : (
            <p>No form data available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FormPreview;
