import { useState } from 'react';
import './index.css';

function App() {
  const [proofStates, setProofStates] = useState({
    uiBuilt: false,
    logicWorking: false,
    testPassed: false,
    deployed: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setProofStates(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  return (
    <div className="app-container">
      {/* Top Bar */}
      <header className="top-bar">
        <div className="top-bar__left">
          <span className="project-name">KodNest Premium Build System</span>
        </div>
        <div className="top-bar__center">
          <span className="progress-indicator">Step 1 / 5</span>
        </div>
        <div className="top-bar__right">
          <span className="status-badge status-badge--in-progress">In Progress</span>
        </div>
      </header>

      <main className="main-content">
        {/* Context Header */}
        <section className="context-header">
          <div className="text-block">
            <h1 className="context-header__title">Initialize Design System</h1>
            <p className="context-header__subtext">Establish the core visual language, layout structure, and component behavior for the product.</p>
          </div>
        </section>

        <div className="workspace-layout">
          {/* Primary Workspace (70%) */}
          <section className="primary-workspace">
            <div className="card">
              <h2 className="card__title">Design System Tokens</h2>
              <div className="card__content text-block">
                <p>All core design choices are reflected in the UI tokens. See below for the layout implementation.</p>

                {/* Form / Inputs Example */}
                <div className="form-group">
                  <label htmlFor="config-name" className="form-label">Configuration Name</label>
                  <input type="text" id="config-name" className="form-input" placeholder="e.g. Core System" />
                </div>

                <div className="button-group">
                  <button className="btn btn--primary">Save Configuration</button>
                  <button className="btn btn--secondary">Reset Defaults</button>
                </div>
              </div>
            </div>

            {/* Empty / Error state placeholder examples */}
            <div className="card state-card">
              <div className="state--empty">
                <p>No external dependencies detected.</p>
                <button className="btn btn--secondary mt-16">Add Dependency</button>
              </div>
            </div>
          </section>

          {/* Secondary Panel (30%) */}
          <aside className="secondary-panel">
            <div className="panel-section">
              <h3 className="panel__heading">Step Guide</h3>
              <p className="panel__text">Define the typographic scale, color palette, and spacing units. The system relies on absolute predictability.</p>
            </div>

            <div className="panel-section prompt-box">
              <p className="prompt-box__label">System Prompt</p>
              <div className="prompt-box__content">System is initialized with generic styling rules.</div>
              <button className="btn btn--secondary btn--full mt-16">Copy Prompt</button>
            </div>

            <div className="panel-section action-stack">
              <button className="btn btn--secondary btn--full">Build in Lovable</button>
              <button className="btn btn--secondary btn--full">It Worked</button>
              <button className="btn btn--secondary btn--full">Error</button>
              <button className="btn btn--secondary btn--full">Add Screenshot</button>
            </div>
          </aside>
        </div>
      </main>

      {/* Proof Footer */}
      <footer className="proof-footer">
        <div className="checklist">
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="uiBuilt"
              checked={proofStates.uiBuilt}
              onChange={handleCheckboxChange}
              className="checkbox-input"
            />
            <span className="checkbox-label">UI Built</span>
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="logicWorking"
              checked={proofStates.logicWorking}
              onChange={handleCheckboxChange}
              className="checkbox-input"
            />
            <span className="checkbox-label">Logic Working</span>
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="testPassed"
              checked={proofStates.testPassed}
              onChange={handleCheckboxChange}
              className="checkbox-input"
            />
            <span className="checkbox-label">Test Passed</span>
          </label>
          <label className="checkbox-item">
            <input
              type="checkbox"
              name="deployed"
              checked={proofStates.deployed}
              onChange={handleCheckboxChange}
              className="checkbox-input"
            />
            <span className="checkbox-label">Deployed</span>
          </label>
        </div>
      </footer>
    </div>
  );
}

export default App;
