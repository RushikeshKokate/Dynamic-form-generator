import { Button, Typography } from "@mui/material";
import React from "react";

type Props = {
  formValues: {
    comments: string;
    timeline: string;
    companySize: string;
    email: string;
    industry: string;
    name: string;
  };
  setBackdropOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DataPreview: React.FC<Props> = ({ formValues, setBackdropOpen }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted formValues:", formValues);
    alert("Form submitted successfully!");
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg text-black">
        <Typography variant="h6" className="font-bold mb-4">
          Preview Details
        </Typography>
        <div className="space-y-2">
          <Typography>Name: {formValues.name}</Typography>
          <Typography>Email: {formValues.email}</Typography>
          <Typography>Industry: {formValues.industry}</Typography>
          <Typography>Company Size: {formValues.companySize}</Typography>
          <Typography>Timeline: {formValues.timeline}</Typography>
          <Typography>Comments: {formValues.comments}</Typography>
        </div>
        <div className="mt-4 space-x-2">
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => setBackdropOpen(false)}
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};

export default DataPreview;
