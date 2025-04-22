import { Editor } from '@monaco-editor/react'
import React, { useRef, useState } from 'react'
import { CODE_SNIPPETS, LANGUAGE_VERSIONS } from '../constants';
import { Play } from 'lucide-react';
import axios from 'axios';


const CodeEditor = () => {
    const editorRef=useRef();
    const [sourceCode,setsourcecode]=useState(CODE_SNIPPETS["java"])
    const[output,setoutput]=useState('')

    const API = axios.create({
        baseURL: "https://emkc.org/api/v2/piston",
      });

    const executeCode=async()=>{
        const res=await API.post("/execute",
            {
                language:"java",
                version: LANGUAGE_VERSIONS["java"],
                files: [
                  {
                    content: sourceCode,
                  },
                ],
              });

        setoutput(res.data.run.stdout)
    }

    const onMount = (editor) => {
        editorRef.current = editor;
        editor.focus();
        console.log(editorRef.current.getValue())
        setsourcecode(editor.getValue())
      };
    
  return (
    <>
      <h3>Practice Your Coding Skills here</h3>
      <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="45vh"
            theme="vs-dark"
            language="java"
             defaultValue={CODE_SNIPPETS["java"]}
            onMount={onMount}

            // value={value}
            onChange={(value) => setsourcecode(value)}
          />
          <button onClick={executeCode} style={{backgroundColor: '#4F46E5', // Indigo-600
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                marginTop:'1rem',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.2)',}}>
            <Play/>
          </button>
          <div
        style={{
          marginTop: '20px',
          padding: '20px',
          backgroundColor: '#1E1E1E', // Dark background for output
          color: 'white',
          borderRadius: '8px',
          fontFamily: 'monospace',
          minHeight: '150px',
        }}
      >
        <h4>Output:</h4>
        <p>{output}</p>
        
      </div>
    </> 
  )
}

export default CodeEditor
