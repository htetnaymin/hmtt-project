import { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import challenges from '../data/challenges'
import { UserContext } from '../context/UserContext'

// Monospace deep equality helper for testing arrays/objects
const deepEqual = (a, b) => {
  if (a === b) return true;
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    if (Array.isArray(a) !== Array.isArray(b)) return false;
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!deepEqual(a[key], b[key])) return false;
    }
    return true;
  }
  return false;
};

function Challenge() {
  const { id } = useParams();
  const { progress, markComplete } = useContext(UserContext);

  const challenge = challenges.find(c => c.id === parseInt(id));
  const isSolved = progress.challenges.includes(challenge?.id);

  // States for Playground
  const [code, setCode] = useState('');
  const [consoleOutput, setConsoleOutput] = useState('');
  const [testResults, setTestResults] = useState([]);
  const [allPassed, setAllPassed] = useState(false);

  // Load code template or saved session when challenge changes
  useEffect(() => {
    if (challenge) {
      document.title = `${challenge.title} | Code Challenge`
      const savedCode = localStorage.getItem(`challenge_code_${challenge.id}`);
      setCode(savedCode || challenge.template || '');
      setConsoleOutput('Console: Write your code and click "Run Tests" to execute.');
      setTestResults([]);
      setAllPassed(false);
    }
    return () => {
      document.title = 'HMTT Learn';
    };
  }, [challenge]);

  if (!challenge) {
    return (
      <div>
        <Navbar />
        <div className="tutorial-page" style={{ textAlign: 'center', marginTop: '50px' }}>
          <h1>Challenge Not Found</h1>
          <Link to="/challenges"><button style={{ marginTop: '20px' }}>Back to Challenges</button></Link>
        </div>
        <Footer />
      </div>
    )
  }

  // Handle Tab key press for indentation inside code editor
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      const newCode = code.substring(0, selectionStart) + '  ' + code.substring(selectionEnd);
      setCode(newCode);
      // Reset cursor position
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = selectionStart + 2;
      }, 0);
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your code to the starter template?")) {
      setCode(challenge.template || '');
      localStorage.removeItem(`challenge_code_${challenge.id}`);
      setConsoleOutput('Console: Code reset to template.');
      setTestResults([]);
      setAllPassed(false);
    }
  };

  const handleRunTests = () => {
    // Save work in localStorage
    localStorage.setItem(`challenge_code_${challenge.id}`, code);
    
    setConsoleOutput('Evaluating tests...');
    
    try {
      let userFunction;
      let userClass;

      // Sandbox evaluate code using dynamic compilation
      if (challenge.functionName === 'LRUCache') {
        const compiled = new Function(`${code}\nreturn LRUCache;`)();
        userClass = compiled;
        if (typeof userClass !== 'function') {
          throw new Error('Class LRUCache could not be evaluated. Make sure it is defined correctly.');
        }
      } else {
        const compiled = new Function(`${code}\nreturn ${challenge.functionName};`)();
        userFunction = compiled;
        if (typeof userFunction !== 'function') {
          throw new Error(`Function ${challenge.functionName} could not be evaluated. Make sure it is defined correctly.`);
        }
      }

      const results = [];
      let passedCount = 0;

      for (let i = 0; i < challenge.tests.length; i++) {
        const test = challenge.tests[i];
        try {
          let got;
          if (challenge.functionName === 'LRUCache') {
            // LRU Cache execution runner
            const commands = test.input[0];
            const args = test.input[1];
            const executionOutput = [];

            let cache = null;
            for (let j = 0; j < commands.length; j++) {
              const cmd = commands[j];
              const arg = args[j];

              if (cmd === 'LRUCache') {
                cache = new userClass(...arg);
                executionOutput.push(null);
              } else if (cmd === 'put') {
                cache.put(...arg);
                executionOutput.push(null);
              } else if (cmd === 'get') {
                executionOutput.push(cache.get(...arg));
              }
            }
            got = executionOutput;
          } else {
            // Regular function execution
            // Deep clone input to protect against mutation during execution
            const clonedInput = JSON.parse(JSON.stringify(test.input));
            got = userFunction(...clonedInput);
          }

          const passed = deepEqual(got, test.expected);
          results.push({
            index: i,
            label: test.label,
            passed,
            got,
            expected: test.expected
          });

          if (passed) passedCount++;
        } catch (testErr) {
          results.push({
            index: i,
            label: test.label,
            passed: false,
            error: testErr.message,
            expected: test.expected
          });
        }
      }

      setTestResults(results);
      const isSuccess = passedCount === challenge.tests.length;
      setAllPassed(isSuccess);

      if (isSuccess) {
        setConsoleOutput(`Success: All ${challenge.tests.length} tests passed! 🎉\nFeel free to click "Mark as Solved" to save your progress.`);
      } else {
        setConsoleOutput(`Failed: ${challenge.tests.length - passedCount} out of ${challenge.tests.length} tests failed.\nCheck the checklist on the left side for details.`);
      }

    } catch (compileErr) {
      setConsoleOutput(`Compilation/Runtime Error:\n${compileErr.message}`);
      setTestResults(challenge.tests.map((t, idx) => ({
        index: idx,
        label: t.label,
        passed: false,
        error: compileErr.message,
        expected: t.expected
      })));
      setAllPassed(false);
    }
  };

  return (
    <div className="sandbox-page-wrapper">
      <Navbar />
      
      <main className="challenge-sandbox-container">
        
        {/* Left Side: Instructions & Test Cases */}
        <section className="challenge-desc-pane">
          <div className="pane-header">
            <Link to="/challenges" className="challenge-back-link">
              ← Back to Challenges
            </Link>
            <h1 className="sandbox-title">{challenge.title}</h1>
            <span className={`difficulty ${challenge.difficulty.toLowerCase()}`}>
              {challenge.difficulty}
            </span>
          </div>

          <hr className="pane-divider" />

          <div className="challenge-instructions">
            <h2>Description</h2>
            <p className="instruction-text">{challenge.description}</p>
          </div>

          <div className="test-suite-container">
            <h2>Test Cases</h2>
            <div className="test-list">
              {testResults.length === 0 ? (
                challenge.tests.map((test, index) => (
                  <div key={index} className="test-case-item pending">
                    <span className="test-status-indicator">⚪</span>
                    <span className="test-label">{test.label}</span>
                  </div>
                ))
              ) : (
                testResults.map((result) => (
                  <div key={result.index} className={`test-case-item ${result.passed ? 'passed' : 'failed'}`}>
                    <span className="test-status-indicator">
                      {result.passed ? '🟢' : '🔴'}
                    </span>
                    <div className="test-result-details">
                      <span className="test-label">{result.label}</span>
                      {!result.passed && (
                        <div className="test-error-log">
                          {result.error ? (
                            <span className="error-text">Error: {result.error}</span>
                          ) : (
                            <>
                              <span className="diff-got">Returned: <code>{JSON.stringify(result.got)}</code></span>
                              <span className="diff-expected">Expected: <code>{JSON.stringify(result.expected)}</code></span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="solution-actions-bar">
            <button 
              className="primary-button mark-solved-btn" 
              onClick={() => markComplete('challenges', challenge.id, challenge.title)}
              disabled={!allPassed || isSolved}
              style={{ opacity: (allPassed && !isSolved) ? 1 : 0.6 }}
            >
              {isSolved ? '✓ Solved' : 'Mark as Solved'}
            </button>
          </div>
        </section>

        {/* Right Side: Code Editor & Console */}
        <section className="challenge-editor-pane">
          <div className="editor-controls-header">
            <span className="editor-tab-label">JavaScript (ES6)</span>
            <div className="editor-actions">
              <button className="editor-control-btn reset-btn" onClick={handleReset}>
                Reset
              </button>
              <button className="editor-control-btn run-btn" onClick={handleRunTests}>
                Run Tests
              </button>
            </div>
          </div>

          <div className="editor-textarea-wrapper">
            <textarea
              className="editor-textarea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck="false"
              placeholder="// Write your code here"
            />
          </div>

          <div className="console-panel">
            <div className="console-header">Terminal Console Output</div>
            <pre className="console-output">{consoleOutput}</pre>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}

export default Challenge