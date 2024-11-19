import React, { useState, useEffect } from 'react';
import MonacoEditor from 'react-monaco-editor';

type EditorProps = {
  setError: React.Dispatch<React.SetStateAction<string[] | null>>;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
};

const Editor: React.FC<EditorProps> = ({ setError, setFormData }) => {
  const [theme, setTheme] = useState<'vs-light' | 'vs-dark' | 'hc-black'>('vs-light');
  const [editorValue, setEditorValue] = useState<string>('');
  const [jsonData, setJsonData] = useState<any>(null); // To store the fetched JSON data

  const setDarkTheme = () => {
    setTheme((prev) => (prev === 'vs-dark' ? 'hc-black' : 'vs-dark'));
  };

  const setLightTheme = () => {
    setTheme('vs-light');
  };

  const handleChange = (value: string | undefined) => {
    if (!value) return;

    try {
      const parsed = JSON.parse(value);
      setFormData(parsed);
      setError(null);
    } catch (error) {
      setError((prev) => (prev ? [...prev, (error as Error).message] : [(error as Error).message]));
    }
  };

  useEffect(() => {
    handleChange(editorValue);
  }, [editorValue]);

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await fetch('/data.json'); // Adjust the path as needed
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Check if the content is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          console.log('Data fetched successfully:', data);
          setJsonData(data); // Store the fetched JSON data
        } else {
          console.error('Expected JSON, but received:', contentType);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    FetchData();
  }, []);

  const handleLoadJsonToEditor = () => {
    if (jsonData) {
      setEditorValue(JSON.stringify(jsonData, null, 2)); // Set the fetched JSON in the editor
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 h-[100vh] max-md:h-[110vh]    shadow-lg space-y-6">
      {/* Theme Switcher */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Editor</h1>
        <div className="space-x-4 flex flex-wrap max-md:flex-col max-md:space-x-0 max-md:space-y-2">
  {/* Dark/High Contrast Button */}
  <button
    onClick={setDarkTheme}
    type="button"
    className={`px-4 py-2 rounded max-md:text-xs max-md:px-0 max-md:py-0 max-md:ml-2 ${
      theme === 'vs-dark' || theme === 'hc-black' ? 'bg-gray-700' : 'bg-blue-600'
    } hover:bg-blue-500 transition text-sm`}
  >
    {theme === 'vs-dark' ? 'High Contrast' : 'Dark Theme'}
  </button>

  {/* Light Theme Button */}
  {theme !== 'vs-light' && (
    <button
      onClick={setLightTheme}
      type="button"
      className="px-4 py-2 rounded text-sm max-md:text-xs max-md:p-2 max-md:ml-2 bg-gray-500 hover:bg-gray-400 transition"
    >
      Light Theme
    </button>
  )}

  {/* Load JSON to Editor Button */}
  <button
    onClick={handleLoadJsonToEditor}
    className="px-4 py-2 mt-2 text-sm max-md:text-xs max-md:p-2 max-md:ml-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
  >
    Load JSON to Editor
  </button>
</div>

      </div>

      {/* Monaco Editor */}
        <h4>Paste your JSON here</h4>
      <div className="border border-gray-700 rounded-lg overflow-hidden scrollbar-hidden ">
        <MonacoEditor
          height="78vh"
          theme={theme}
          language="javascript"
          value={editorValue}
          onChange={setEditorValue}
          options={{
            selectOnLineNumbers: true,
            automaticLayout: true,
          }}
        />
      </div>

      {/* Button to Load JSON into the Editor */}
     
      {/* Error Messages */}
    </div>
  );
};

export default Editor;
