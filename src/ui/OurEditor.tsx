import React, { useState, useEffect } from "react";
import {Editor} from '@monaco-editor/react';

type EditorProps = {
  setError: React.Dispatch<React.SetStateAction<string[] | null>>;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const OurEditor: React.FC<EditorProps> = ({ setError, setFormData }) => {
  const [theme, setTheme] = useState<"vs-light" | "vs-dark" | "hc-black">(
    "vs-light"
  );
  const [editorValue, setEditorValue] = useState<string>("");
  const [jsonData, setJsonData] = useState<any>(null);

  const setDarkTheme = () => {
    setTheme((prev) => (prev === "vs-dark" ? "hc-black" : "vs-dark"));
  };

  const setLightTheme = () => {
    setTheme("vs-light");
  };

  const handleChange = (value: string | undefined) => {
    if (!value) return;

    try {
      const parsed = JSON.parse(value);
      setFormData(parsed);
      setError(null);
    } catch (error) {
      setError((prev) =>
        prev ? [...prev, (error as Error).message] : [(error as Error).message]
      );
    }
  };

  useEffect(() => {
    handleChange(editorValue);
  }, [editorValue]);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          console.log("Data fetched successfully:", data);
          setJsonData(data);
        } else {
          console.error("Expected JSON, but received:", contentType);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    FetchData();
  }, []);

  const handleLoadJsonToEditor = () => {
    if (jsonData) {
      setEditorValue(JSON.stringify(jsonData, null, 2));
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 h-[100vh] max-md:h-[110vh]    shadow-lg space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Editor</h1>
        <div className="space-x-4 flex flex-wrap max-md:flex-col max-md:space-x-0 max-md:space-y-2">
          <button
            onClick={setDarkTheme}
            type="button"
            className={`px-4 py-2 rounded max-md:text-xs max-md:px-1 max-md:py-1 max-md:ml-2 ${
              theme === "vs-dark" || theme === "hc-black"
                ? "bg-gray-700"
                : "bg-blue-600"
            } hover:bg-blue-500 transition text-sm`}
          >
            {theme === "vs-dark" ? "High Contrast" : "Dark Theme"}
          </button>

          {theme !== "vs-light" && (
            <button
              onClick={setLightTheme}
              type="button"
              className="px-4 py-2 rounded text-sm max-md:text-xs max-md:p-2 max-md:ml-2 max-md:px-1 max-md:py-1   bg-gray-500 hover:bg-gray-400 transition"
            >
              Light Theme
            </button>
          )}

          <button
            onClick={handleLoadJsonToEditor}
            className="px-4 py-2 mt-2 text-sm max-md:text-xs max-md:p-2   max-md:px-1 max-md:py-1 max-md:ml-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Load JSON to Editor
          </button>
        </div>
      </div>

      <h4>Paste your JSON here</h4>
      <div className="border border-gray-700 rounded-lg overflow-hidden scrollbar-hidden ">
      <Editor
  height="78vh"
  theme={theme}
  language="json"  // or "json" if you want to edit JSON
  value={editorValue}
  onChange={(value) => {
    if (value) {
      setEditorValue(value);
    }
  }}
  options={{
    selectOnLineNumbers: true,
    automaticLayout: true,
  }}
/>
      </div>
    </div>
  );
};

export default OurEditor;
