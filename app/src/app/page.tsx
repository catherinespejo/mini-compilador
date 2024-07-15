'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useMemo, useState } from "react";
import utf8 from 'utf8';
import parser from '../../../parser';
import generator from '../../../generator';

interface BoxProps {
  fileName?: string;
  children: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ fileName = "file1.sp", children }) => {
  return (
    <div className={styles.description}>
      <h1>{fileName}</h1>
      <div>
       {children}
      </div>
    </div>
  );
};

export default function Home() {
  const [code, setCode] = useState<string>("")
  const [result, setResult] = useState<string>("")
  const [interCode, setInterCode] = useState<string>("")

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
  }

  const parseCode = useMemo(() => {
    return () => {
      console.log(code.toString());
      setResult(JSON.stringify(parser(code), null, 4))
    }
  }, [code])

  const getIntermediateCode = () => {
      setInterCode(generator(parser(code)))
  };

  return (
    <main className={styles.main}>
      <h1>Compiler for Space language</h1>
      <div className={styles.flex}>
        <Box fileName="code.sp">
          <textarea onChange={handleChange} value={code}></textarea>
        </Box>
        <div className={styles.button}>
          <button onClick={(e) => {
            parseCode()
            getIntermediateCode()
          }}>Compile</button>
        </div>
        </div>
        <Box fileName="intermediateCode.js">
          <pre id="json">{interCode}</pre>
        </Box>
        <Box fileName="result.ast">
          <pre id="json">{result}</pre>
        </Box>
       
    </main>
  );
}
