// ─── Namaste AI — Season 02: Generative AI & Tool Calling ──────────────────
// Single source of truth for Season 2 notes, concepts, and learning projects.
//
// Rules:
//   - Clearly identified [Placeholder] markers for uncompleted topics.
//   - Status honestly identified as "Currently Learning".
//   - No fabricated milestones or numerical claims.
// ────────────────────────────────────────────────────────────────────────────

const season2 = {
  id: 'season-2',
  slug: 'season-2',
  seasonNumber: '02',
  romanNumber: 'II',
  title: 'Generative AI & Tool Calling',
  subtitle: 'Function calling, tool orchestration, ReAct loops & RAG systems',
  status: 'Currently Learning',
  attribution: 'Learning source: Namaste AI',
  accentColor: '#3fc9b9', // Editorial Teal (matches reference Card 2)
  description:
    'Exploring modern agentic paradigms — empowering language models with real-world tool execution, structured function calling, and contextual retrieval-augmented generation (RAG).',
  keyConcepts: [
    'Function Calling & Tool Declarations',
    'Retrieval-Augmented Generation (RAG)',
    'Chunking Strategies & Context Assembly',
    'Agentic ReAct Loops (Thought / Action / Observation)',
    '[Placeholder: Next Season 2 Concept]',
  ],
  notes: [
    {
      id: 's2-n1',
      slug: 'function-calling-and-tool-use',
      number: '01',
      episode: 'Ep. 05',
      title: 'Function Calling & Tool Execution',
      topic: 'Agentic Architectures',
      readingTime: '4 min read',
      shortDescription:
        'How LLMs generate structured function call arguments to interact with external databases, APIs, and client-side applications.',
      concepts: ['Function Calling', 'JSON Schema Validation', 'ReAct Pattern'],
      whatILearned:
        'The model does not execute external code itself; it emits structured arguments based on declared function schemas. The host environment executes the action and returns the output to the model.',
      myUnderstanding:
        'This decouples reasoning from execution. The model acts as an intelligent router and planner, while our Node.js or frontend runtime retains full security and control over actual side effects.',
      examples:
        'Declaring a `search_portfolio({ query })` tool gives the portfolio assistant the ability to find projects without hallucinating URLs.',
      keyTakeaways: [
        'Tools convert conversational models into actionable execution engines.',
        'Schema definitions must be concise with descriptive parameter descriptions.',
        'Host validation of returned arguments is strictly required before execution.',
      ],
    },
    {
      id: 's2-n2',
      slug: 'placeholder-season-2-note',
      number: '02',
      episode: 'Ep. 06 [Placeholder]',
      title: '[Replace with actual Season 2 note: RAG & Chunking Strategies]',
      topic: 'RAG [Placeholder]',
      readingTime: '3 min read',
      shortDescription:
        '[Placeholder note: Documenting chunking tradeoffs, retrieval relevance, and context window assembly.]',
      concepts: ['Chunking', 'Retrieval', 'RAG Guardrails [Placeholder]'],
      whatILearned:
        '[Placeholder: Replace with actual notes on Retrieval-Augmented Generation learned in Season 2.]',
      myUnderstanding:
        '[Placeholder: Personal explanation of why retrieval improves factual grounding.]',
      examples:
        '[Placeholder: Context assembly demonstration.]',
      keyTakeaways: [
        '[Placeholder takeaway 1: Chunk size tradeoffs between context and granularity]',
        '[Placeholder takeaway 2: Semantic vs Keyword search hybrid retrieval]',
      ],
    },
  ],
  projects: [
    {
      id: 'p-portfolio-assistant-prototype',
      title: 'Portfolio Context Router',
      concept: 'Tool Calling & Deterministic Action Routing',
      technologies: ['React', 'JavaScript', 'Gemini API'],
      description:
        'A prototype testing intent classification and tool dispatch for an in-portfolio conversational assistant.',
      github: 'https://github.com/vighnesh204/Portfolio-AI',
      live: '#',
      learning:
        'Gained hands-on experience designing robust tool definitions and managing conversational history states.',
    },
  ],
};

export default season2;
