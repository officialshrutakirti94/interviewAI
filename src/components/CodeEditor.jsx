import { Editor } from '@monaco-editor/react';
import React, { useRef, useState } from 'react';
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from '../constants';
import { Play } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CodeEditor = () => {
  const editorRef = useRef();
  const [sourceCode, setSourceCode] = useState(CODE_SNIPPETS["java"]);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const API = axios.create({
    baseURL: "https://emkc.org/api/v2/piston",
  });

  const executeCode = async () => {
    try {
      setLoading(true);
      const res = await API.post("/execute", {
        language: "java",
        version: LANGUAGE_VERSIONS["java"],
        files: [
          {
            content: sourceCode,
          },
        ],
      });

      const result = res.data.run;
      if (result.stderr) {
        setOutput(result.stderr);
        toast.error("Compilation failed");
      } else {
        setOutput(result.stdout || "No output");
        toast.success("Successful compilation");
      }

    } catch (error) {
      console.error(error);
      toast.error("Error compiling code");
    } finally {
      setLoading(false);
    }
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
    setSourceCode(editor.getValue());
  };

  return (
    <>
      <h3>Practice Your Coding Skills here</h3>
      <Editor
        options={{
          minimap: { enabled: false },
        }}
        height="45vh"
        theme="vs-dark"
        language="java"
        defaultValue={CODE_SNIPPETS["java"]}
        onMount={onMount}
        onChange={(value) => setSourceCode(value)}
      />
      <button
        onClick={executeCode}
        style={{
          backgroundColor: '#4F46E5',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          marginTop: '1rem',
          boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',
        }}
      >
        <Play />
      </button>
      <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#1E1E1E',
          color: 'white',
          borderRadius: '8px',
          fontFamily: 'monospace',
          minHeight: '150px',
        }}
      >
        <h4>Output:</h4>
        {loading ? <p>Loading your output...</p> : <pre>{output}</pre>}
      </div>
    </>
  );
};

export default CodeEditor;
