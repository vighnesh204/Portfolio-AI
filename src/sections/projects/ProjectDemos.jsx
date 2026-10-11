import { useState } from 'react';

// ─── 1. Interview AI Demo ────────────────────────────────────────────────────
// Realistic interactive mock interview evaluator simulation powered by Gemini API.
export function InterviewAiDemo() {
  const tracks = [
    {
      id: 'frontend',
      label: 'Frontend (React)',
      question: 'Explain React Reconciliation and how keys optimize the Virtual DOM diffing algorithm.',
      sampleAnswer:
        'Reconciliation compares two Virtual DOM trees. When a node changes, React inspects its element type. Keys give elements a stable identity across renders, allowing React to match children in O(n) time rather than O(n³) general tree diffing.',
      score: { clarity: 'High', accuracy: 'Strong', depth: 'Optimal' },
      feedback:
        'Strong conceptual clarity. Accurately explained the heuristic assumption where elements of different types generate different trees. Optimal time complexity mentioned.',
    },
    {
      id: 'backend',
      label: 'Backend (Node)',
      question: 'How does the Node.js Event Loop process asynchronous microtasks versus macrotasks?',
      sampleAnswer:
        'The Event Loop offloads async I/O via libuv. Microtasks (process.nextTick, Promise callbacks) drain completely after each phase and before executing macrotasks (setTimeout, setImmediate).',
      score: { clarity: 'High', accuracy: 'Strong', depth: 'Deep' },
      feedback:
        'Precise distinction between libuv phases and microtask queue flushing. Excellent grasp of asynchronous concurrency primitives.',
    },
    {
      id: 'architecture',
      label: 'Full Stack',
      question: 'Design an end-to-end authentication flow using HTTP-only cookies and JWTs in Express.',
      sampleAnswer:
        'Issue short-lived access tokens stored in memory/cookies with httpOnly and sameSite flags. Store refresh tokens securely in MongoDB with cryptographic hashing and rotation on renewal.',
      score: { clarity: 'Strong', accuracy: 'High', depth: 'Robust' },
      feedback:
        'Security-first reasoning. Correctly identified XSS mitigations with httpOnly cookies and replay protection via refresh token rotation.',
    },
  ];

  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluated, setEvaluated] = useState(false);

  const activeTrack = tracks[activeTrackIndex];

  const handleEvaluate = () => {
    if (evaluating) return;
    setEvaluating(true);
    setEvaluated(false);
    setTimeout(() => {
      setEvaluating(false);
      setEvaluated(true);
    }, 750);
  };

  const handleSelectTrack = (index) => {
    setActiveTrackIndex(index);
    setEvaluated(false);
    setEvaluating(false);
  };

  return (
    <div className="demo-box demo-box--interview">
      <div className="demo-header">
        <span className="demo-badge">
          <span className="demo-pulse" aria-hidden="true" />
          Live Preview · AI Evaluation Simulator
        </span>
        <span className="demo-meta">Gemini API Rubric</span>
      </div>

      {/* Track Selector Tabs */}
      <div className="demo-tabs" role="tablist" aria-label="Interview Tracks">
        {tracks.map((track, i) => (
          <button
            key={track.id}
            type="button"
            role="tab"
            aria-selected={activeTrackIndex === i}
            className={`demo-tab ${activeTrackIndex === i ? 'demo-tab--active' : ''}`}
            onClick={() => handleSelectTrack(i)}
            data-cursor="try"
          >
            {track.label}
          </button>
        ))}
      </div>

      {/* Active Question Box */}
      <div className="demo-prompt-card">
        <span className="demo-prompt-eyebrow">Technical Query</span>
        <p className="demo-prompt-text">{activeTrack.question}</p>
      </div>

      {/* Candidate Response Snippet */}
      <div className="demo-response-box">
        <div className="demo-response-header">
          <span className="demo-response-title">Candidate Response Snippet</span>
          <span className="demo-response-status">Live Transcript</span>
        </div>
        <p className="demo-response-content">{activeTrack.sampleAnswer}</p>
      </div>

      {/* Evaluation Action */}
      <div className="demo-actions">
        <button
          type="button"
          className="demo-btn demo-btn--primary"
          onClick={handleEvaluate}
          disabled={evaluating}
          data-cursor="try"
        >
          {evaluating ? (
            <>
              <span className="demo-spinner" aria-hidden="true" />
              Evaluating with Gemini API…
            </>
          ) : (
            <>
              Run Gemini Evaluation
              <span className="demo-btn-arrow" aria-hidden="true">
                →
              </span>
            </>
          )}
        </button>
      </div>

      {/* Evaluation Results Drawer */}
      {evaluated && (
        <div className="demo-eval-card" aria-live="polite">
          <div className="demo-eval-scores">
            <div className="demo-score-item">
              <span className="demo-score-label">Clarity</span>
              <span className="demo-score-value">{activeTrack.score.clarity}</span>
            </div>
            <div className="demo-score-item">
              <span className="demo-score-label">Accuracy</span>
              <span className="demo-score-value">{activeTrack.score.accuracy}</span>
            </div>
            <div className="demo-score-item">
              <span className="demo-score-label">Depth</span>
              <span className="demo-score-value">{activeTrack.score.depth}</span>
            </div>
          </div>
          <p className="demo-eval-feedback">
            <strong>Evaluator Rubric:</strong> {activeTrack.feedback}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── 2. DevFlow Demo ─────────────────────────────────────────────────────────
// Interactive optimistic sprint Kanban tracker with real-time lane transitions.
export function DevFlowDemo() {
  const initialTasks = [
    { id: 1, title: 'JWT Cookie Auth Flow', tag: 'Backend', priority: 'High', lane: 'todo' },
    { id: 2, title: 'Optimistic UI Mutation', tag: 'React', priority: 'Critical', lane: 'in-progress' },
    { id: 3, title: 'MongoDB Index Profiling', tag: 'Database', priority: 'Normal', lane: 'done' },
  ];

  const [tasks, setTasks] = useState(initialTasks);
  const [syncNotice, setSyncNotice] = useState('✓ Client state synchronized (0ms lag)');

  const lanes = [
    { id: 'todo', label: 'To Do', count: tasks.filter((t) => t.lane === 'todo').length },
    { id: 'in-progress', label: 'In Flight', count: tasks.filter((t) => t.lane === 'in-progress').length },
    { id: 'done', label: 'Shipped', count: tasks.filter((t) => t.lane === 'done').length },
  ];

  const advanceTask = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const nextLane =
          t.lane === 'todo' ? 'in-progress' : t.lane === 'in-progress' ? 'done' : 'todo';
        return { ...t, lane: nextLane };
      })
    );
    setSyncNotice('✓ Optimistic state updated · Synced to Express REST API');
  };

  return (
    <div className="demo-box demo-box--devflow">
      <div className="demo-header">
        <span className="demo-badge">
          <span className="demo-pulse" aria-hidden="true" />
          Live Preview · Optimistic Sprint Kanban
        </span>
        <span className="demo-meta">Click card to advance lane</span>
      </div>

      <div className="kanban-grid">
        {lanes.map((lane) => (
          <div key={lane.id} className="kanban-col">
            <div className="kanban-col-head">
              <span className="kanban-col-title">{lane.label}</span>
              <span className="kanban-col-count">{lane.count}</span>
            </div>

            <div className="kanban-col-body">
              {tasks
                .filter((t) => t.lane === lane.id)
                .map((task) => (
                  <button
                    key={task.id}
                    type="button"
                    className="kanban-card"
                    onClick={() => advanceTask(task.id)}
                    data-cursor="try"
                    title="Click to advance to next lane"
                  >
                    <div className="kanban-card-top">
                      <span className="kanban-card-tag">{task.tag}</span>
                      <span className={`kanban-card-priority kanban-card-priority--${task.priority.toLowerCase()}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="kanban-card-title">{task.title}</p>
                    <span className="kanban-card-cue">Advance →</span>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="demo-footer-status">
        <span className="demo-status-text">{syncNotice}</span>
        <button
          type="button"
          className="demo-reset-btn"
          onClick={() => {
            setTasks(initialTasks);
            setSyncNotice('✓ Reset to baseline sprint board state');
          }}
          data-cursor="try"
        >
          Reset Board
        </button>
      </div>
    </div>
  );
}

// ─── 3. Portfolio AI Demo ────────────────────────────────────────────────────
// Interactive system architecture benchmark & signature route panel transition inspector.
export function PortfolioAiDemo() {
  const [activePanelColor, setActivePanelColor] = useState('#b85c38');
  const [animating, setAnimating] = useState(false);

  const colors = [
    { name: 'Burnt Orange', hex: '#b85c38', desc: 'Primary signature' },
    { name: 'Warm Amber', hex: '#c8a96e', desc: 'Editorial warm' },
    { name: 'Deep Teal', hex: '#3fc9b9', desc: 'Dark grade balance' },
  ];

  const handleTriggerPanel = (hex) => {
    setActivePanelColor(hex);
    setAnimating(true);
    setTimeout(() => {
      setAnimating(false);
    }, 600);
  };

  return (
    <div className="demo-box demo-box--portfolio">
      <div className="demo-header">
        <span className="demo-badge">
          <span className="demo-pulse" aria-hidden="true" />
          Live Preview · Architecture & Transition Engine
        </span>
        <span className="demo-meta">React 19 + GSAP Core</span>
      </div>

      {/* Engineering Attributes Row */}
      <div className="perf-grid">
        <div className="perf-card">
          <span className="perf-num">0</span>
          <span className="perf-label">Heavy 3D Libs</span>
          <span className="perf-sub">Zero Three.js / Canvas</span>
        </div>
        <div className="perf-card">
          <span className="perf-num">DOM</span>
          <span className="perf-label">Native Motion</span>
          <span className="perf-sub">Hardware-accel transforms</span>
        </div>
        <div className="perf-card">
          <span className="perf-num">Pure</span>
          <span className="perf-label">Vite Pipeline</span>
          <span className="perf-sub">Standard React JS build</span>
        </div>
      </div>

      {/* Interactive Transition Panel Tester */}
      <div className="panel-tester">
        <div className="panel-tester-head">
          <span className="panel-tester-title">Signature Panel Transition Colorway</span>
          <span className="panel-tester-desc">Test the route transition wipe preview:</span>
        </div>

        <div className="panel-btn-row">
          {colors.map((c) => (
            <button
              key={c.hex}
              type="button"
              className={`panel-btn ${activePanelColor === c.hex ? 'panel-btn--active' : ''}`}
              onClick={() => handleTriggerPanel(c.hex)}
              data-cursor="try"
            >
              <span className="panel-color-swatch" style={{ background: c.hex }} aria-hidden="true" />
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        {/* Visual Simulated Transition Viewport */}
        <div className="panel-viewport">
          <div
            className={`panel-layer ${animating ? 'panel-layer--wiping' : ''}`}
            style={{ backgroundColor: activePanelColor }}
            aria-hidden="true"
          />
          <div className="panel-viewport-content">
            <span className="panel-viewport-brand">VIGHNESH PORTFOLIO</span>
            <span className="panel-viewport-sub">Full-height vertical color panel route change</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 4. AlgoForge Demo ───────────────────────────────────────────────────────
// Interactive pattern recognition cheatsheet & complexity analyzer for DSA journal.
export function AlgoForgeDemo() {
  const patterns = [
    {
      id: 'two-pointers',
      name: 'Two Pointers',
      complexity: 'O(N) Time · O(1) Space',
      useCases: 'Sorted arrays, pair sum search, palindrome validation, partitioning.',
      summary: 'Converging or fast/slow pointers remove nested iterations from O(N²) down to linear time.',
    },
    {
      id: 'sliding-window',
      name: 'Sliding Window',
      complexity: 'O(N) Time · O(K) Space',
      useCases: 'Substrings, subarray max sum, longest distinct character sequences.',
      summary: 'Maintains state across continuous intervals by expanding right and shrinking left bounds.',
    },
    {
      id: 'dp',
      name: 'Dynamic Programming',
      complexity: 'O(N·W) Time · O(W) Space',
      useCases: '0/1 Knapsack, coin change, longest common subsequence, optimal game theory.',
      summary: 'Decomposes complex problems into memoized overlapping subproblems with optimal substructure.',
    },
    {
      id: 'binary-search',
      name: 'Binary Search',
      complexity: 'O(log N) Time · O(1) Space',
      useCases: 'Monotonic ranges, search in rotated array, capacity allocation boundaries.',
      summary: 'Halves search space repeatedly by comparing target against mid values across monotonic domains.',
    },
  ];

  const [activePattern, setActivePattern] = useState(patterns[0]);

  return (
    <div className="demo-box demo-box--algoforge">
      <div className="demo-header">
        <span className="demo-badge">
          <span className="demo-pulse" aria-hidden="true" />
          Live Preview · Algorithmic Pattern Matrix
        </span>
        <span className="demo-meta">DSA Cheatsheet</span>
      </div>

      <div className="dsa-pattern-chips" role="tablist" aria-label="DSA Patterns">
        {patterns.map((p) => (
          <button
            key={p.id}
            type="button"
            role="tab"
            aria-selected={activePattern.id === p.id}
            className={`dsa-chip ${activePattern.id === p.id ? 'dsa-chip--active' : ''}`}
            onClick={() => setActivePattern(p)}
            data-cursor="try"
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="dsa-card" aria-live="polite">
        <div className="dsa-card-head">
          <h4 className="dsa-card-title">{activePattern.name}</h4>
          <span className="dsa-card-complexity">{activePattern.complexity}</span>
        </div>
        <p className="dsa-card-summary">{activePattern.summary}</p>
        <div className="dsa-card-cases">
          <span className="dsa-case-label">Ideal For:</span>
          <span className="dsa-case-text">{activePattern.useCases}</span>
        </div>
      </div>
    </div>
  );
}
