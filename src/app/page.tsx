'use client';

import React, { useState, useRef } from 'react';

export default function Home() {
  const [code, setCode] = useState(`function greet(name) {
  console.log("Hello, " + name)
  return "Welcome"
}

greet("World")`);
  
  const [output, setOutput] = useState('');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [helpQuery, setHelpQuery] = useState('');
  const [helpResponse, setHelpResponse] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isFixing, setIsFixing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoFixCode = (inputCode: string): string => {
    let fixed = inputCode;
    fixed = fixed.replace(/([^;\s{}\n])\s*\n/g, '$1;\n');
    const lines = fixed.split('\n');
    let indentLevel = 0;
    const fixedLines = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('}')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }
      const indented = '  '.repeat(indentLevel) + trimmed;
      if (trimmed.endsWith('{')) {
        indentLevel++;
      }
      return indented;
    });
    fixed = fixedLines.join('\n');
    fixed = fixed.replace(/  +/g, ' ');
    fixed = fixed.replace(/(\w)\{/g, '$1 {');
    fixed = fixed.replace(/\(\s+/g, '(');
    fixed = fixed.replace(/\s+\)/g, ')');
    return fixed;
  };

  const runCode = () => {
    setIsRunning(true);
    setOutput('');
    const logs: string[] = [];
    
    const originalLog = console.log;
    console.log = (...args: any[]) => {
      logs.push(args.join(' '));
    };
    
    setTimeout(() => {
      try {
        eval(code);
        setOutput(logs.join('\n') || '✓ Code executed successfully (no output)');
      } catch (error: any) {
        setOutput(`❌ Error: ${error.message}`);
      } finally {
        console.log = originalLog;
        setIsRunning(false);
      }
    }, 300);
  };

  const handleAutoFix = () => {
    setIsFixing(true);
    setTimeout(() => {
      setCode(autoFixCode(code));
      setIsFixing(false);
    }, 400);
  };

  const getHelpResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    const helpDatabase: { [key: string]: string } = {
      'semicolon': 'Semicolons (;) are used to end JavaScript statements. While optional in many cases, they help prevent errors. Example: let x = 5;',
      'function': 'Functions are blocks of reusable code. Syntax: function name(parameters) { /* code */ }. Call them using name(arguments).',
      'variable': 'Variables store data. Use "let" for changeable values, "const" for constants, and avoid "var". Example: let name = "John";',
      'console': 'console.log() prints output to the console. Example: console.log("Hello World");',
      'error': 'Common errors include: syntax errors (typos), reference errors (undefined variables), and type errors (wrong data types). Check the console output.',
      'loop': 'Loops repeat code. For loop: for(let i=0; i<5; i++) { }. While loop: while(condition) { }',
      'if': 'If statements execute code conditionally. Syntax: if (condition) { /* code */ } else { /* alternative */ }',
      'array': 'Arrays store multiple values. Create: let arr = [1,2,3]. Access: arr[0]. Methods: push, pop, map, filter.',
      'object': 'Objects store key-value pairs. Create: let obj = {name: "John", age: 30}. Access: obj.name or obj["name"].',
      'string': 'Strings are text. Use quotes: "hello" or \'hello\'. Concatenate with +. Template literals: `Hello ${name}`',
      'run': 'Click the "Run Code" button (▶) to execute your code. The output will appear in the console below.',
      'fix': 'Click the "Auto-Fix" button (🔧) to automatically fix common issues like missing semicolons, indentation, and spacing.',
      'indent': 'Proper indentation makes code readable. Use 2 or 4 spaces per level. The auto-fix button can help format your code.',
    };
    
    for (const [keyword, response] of Object.entries(helpDatabase)) {
      if (lowerQuery.includes(keyword)) {
        return response;
      }
    }
    return 'I can help with: functions, variables, loops, arrays, objects, strings, console.log, errors, semicolons, indentation, and more. Try asking about a specific topic!';
  };

  const handleHelpSubmit = () => {
    if (helpQuery.trim()) {
      const response = getHelpResponse(helpQuery);
      setHelpResponse(response);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Header */}
      <header className="relative bg-slate-900/80 backdrop-blur-xl border-b border-purple-500/20 shadow-lg">
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-purple-500 to-blue-500 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Code Editor Pro
              </h1>
              <p className="text-xs text-gray-400">Write, Fix, and Learn</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={runCode}
              disabled={isRunning}
              className="group relative flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 px-5 py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10">▶</span>
              <span className="relative z-10 font-semibold">Run Code</span>
            </button>
            
            <button
              onClick={handleAutoFix}
              disabled={isFixing}
              className="group relative flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 px-5 py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10">🔧</span>
              <span className="relative z-10 font-semibold">Auto-Fix</span>
            </button>
            
            <button
              onClick={() => setIsHelpOpen(true)}
              className="group relative flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-5 py-2.5 rounded-lg transition-all duration-300 shadow-lg hover:shadow-purple-500/50 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10">❓</span>
              <span className="relative z-10 font-semibold">Help</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative flex-1 flex flex-col overflow-hidden">
        {/* Code Editor Section */}
        <div className="flex-1 p-6">
          <div className="h-full bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-purple-500/20 shadow-2xl overflow-hidden">
            <div className="bg-slate-800/80 px-4 py-2 border-b border-purple-500/20 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-gray-400 ml-2">script.js</span>
              <span className="ml-auto text-purple-400">✨</span>
            </div>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-[calc(100%-40px)] bg-transparent text-white font-mono text-sm p-6 focus:outline-none resize-none"
              spellCheck={false}
              style={{
                lineHeight: '1.6',
                tabSize: 2
              }}
            />
          </div>
        </div>

        {/* Console Output */}
        <div className="h-52 px-6 pb-6">
          <div className="h-full bg-slate-950/80 backdrop-blur-xl rounded-2xl border border-purple-500/20 shadow-2xl overflow-hidden">
            <div className="bg-slate-900/80 px-4 py-2 border-b border-purple-500/20 flex items-center gap-2">
              <span className="text-green-400">▶</span>
              <span className="text-xs font-semibold text-gray-300">CONSOLE OUTPUT</span>
              <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
            </div>
            <div className="h-[calc(100%-40px)] p-4 overflow-auto">
              <pre className="text-sm font-mono text-green-400 whitespace-pre-wrap">
                {output || (
                  <span className="text-gray-500 italic">
                    No output yet. Click "Run Code" to execute your program... ⚡
                  </span>
                )}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Help Panel */}
      {isHelpOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-300">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl w-full max-w-2xl mx-4 max-h-[85vh] flex flex-col shadow-2xl border border-purple-500/30">
            {/* Help Header */}
            <div className="relative flex justify-between items-center p-6 border-b border-purple-500/20">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
                  <span className="text-2xl">❓</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Help Assistant</h2>
                  <p className="text-xs text-gray-400">Ask me anything about coding!</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsHelpOpen(false);
                  setHelpQuery('');
                  setHelpResponse('');
                }}
                className="text-gray-400 hover:text-white hover:bg-white/10 p-2 rounded-lg transition-all duration-200"
              >
                ✕
              </button>
            </div>

            {/* Help Content */}
            <div className="flex-1 p-6 overflow-auto">
              {helpResponse ? (
                <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/40 backdrop-blur-xl p-6 rounded-xl border border-purple-500/20">
                  <div className="flex items-center gap-2 text-sm text-purple-300 mb-3">
                    <span>✨</span>
                    <span className="font-semibold">Response:</span>
                  </div>
                  <p className="text-white leading-relaxed">{helpResponse}</p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full mb-4">
                    <span className="text-5xl">❓</span>
                  </div>
                  <p className="text-gray-400 text-lg">Ask a question to get started!</p>
                  <p className="text-gray-500 text-sm mt-2">Try: "How do functions work?" or "What are variables?"</p>
                </div>
              )}
            </div>

            {/* Help Input */}
            <div className="p-6 border-t border-purple-500/20 bg-slate-900/50">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={helpQuery}
                  onChange={(e) => setHelpQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleHelpSubmit()}
                  placeholder="Type your question here..."
                  className="flex-1 bg-slate-800/80 text-white px-4 py-3 rounded-xl border border-purple-500/30 focus:outline-none focus:border-purple-500 transition-all duration-200 placeholder-gray-500"
                />
                <button
                  onClick={handleHelpSubmit}
                  className="group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-purple-500/50 font-semibold"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-200">➤</span>
                  Ask
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}