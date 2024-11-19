import React, { useState } from "react";
import "./App.css";
import OurEditor from "./ui/OurEditor";
import FormPreview from "./ui/FormPreview";

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

function App() {
  const [newError, setError] = useState<string[] | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);

  console.log("formData", formData);

  return (
    <div className=" flex max-lg:flex-col lg:flex-row bg-black h-[100vh]">
      <div className="w-full lg:w-1/2 bg-black">
        <OurEditor setError={setError} setFormData={setFormData} />
      </div>
      <div className="w-full lg:w-1/2 bg-black mt-4 lg:mt-0">
        <FormPreview newError={newError} formData={formData} />
      </div>
    </div>
  );
}

export default App;
