// ─── Namaste AI — Season 01: Foundations ────────────────────────────────────
// Single source of truth for Season 1 notes, concepts, and learning projects.
//
// Rules:
//   - Notes reflect Vighnesh's own conceptual understanding.
//   - Clearly identified [Placeholder] markers for uncompleted topics.
//   - No fabricated milestones or numerical claims.
// ────────────────────────────────────────────────────────────────────────────

const season1 = {
  id: 'season-1',
  slug: 'season-1',
  seasonNumber: '01',
  romanNumber: 'I',
  title: 'Foundations of AI & LLMs',
  subtitle: 'Language models, tokenization, embeddings & transformer mechanics',
  status: 'Completed',
  attribution: 'Learning source: Namaste AI',
  accentColor: '#ff5b1f', // Editorial Orange (matches reference Card 1)
  description:
    'A deep-dive into foundational AI concepts — understanding how modern large language models process text, construct vector representations, and compute attention, rather than treating them as black-box APIs.',
  keyConcepts: [
    'Tokens & Byte-Pair Encoding (BPE)',
    'High-Dimensional Vector Embeddings',
    'Self-Attention & Transformer Core',
    'System Prompting & Temperature Control',
    'Deterministic Output Formatting (JSON Mode)',
  ],
  notes: [
    {
      id: 's1-n1',
      slug: 'how-llms-work-and-tokenization',
      number: '01',
      episode: 'Ep. 01',
      title: 'How LLMs Work & Tokenization',
      topic: 'LLM Foundations',
      readingTime: '4 min read',
      shortDescription:
        'Understanding text tokenization via BPE, subword splits, context windows, and why LLMs think in tokens rather than characters.',
      concepts: ['Tokenization', 'Byte-Pair Encoding (BPE)', 'Context Window Limits'],
      whatILearned:
        'Language models do not read characters or words directly. Text is converted into discrete numerical tokens using algorithms like Byte-Pair Encoding (BPE). Understanding tokenization explains edge cases such as why LLMs occasionally struggle with spelling reverse words or simple arithmetic.',
      myUnderstanding:
        'Tokens are the fundamental currency of LLMs. A single word can be one token or split into multiple subwords. Token counts dictate latency, cost, and context window limits. Prompt optimization is therefore primarily about high information density per token.',
      examples:
        'For example, the word "apple" is a single token, whereas rare or composite words like "antigravity" might be partitioned into subword fragments. Tokenization nuances also explain why models can output whitespace anomalies if prefix tokens are misaligned.',
      keyTakeaways: [
        'Tokens are integers representing subword sequences in a fixed vocabulary.',
        'Tokenization choices directly impact memory, compute cost, and model reasoning boundaries.',
        'Always calculate token density when designing API prompt budgets.',
      ],
    },
    {
      id: 's1-n2',
      slug: 'attention-and-transformer-architecture',
      number: '02',
      episode: 'Ep. 02',
      title: 'Attention Mechanism & Transformer Core',
      topic: 'Architecture',
      readingTime: '5 min read',
      shortDescription:
        'Deconstructing the "Attention Is All You Need" paradigm: Query, Key, and Value vectors and multi-head self-attention.',
      concepts: ['Self-Attention', 'Query/Key/Value (QKV)', 'Positional Encodings', 'Multi-Head Attention'],
      whatILearned:
        'Self-attention allows every token in an input sequence to dynamically weigh its relevance against every other token simultaneously, eliminating the sequential bottleneck of older recurrent architectures (RNNs).',
      myUnderstanding:
        'Each token projects into three vectors: Query (what I am seeking), Key (what I contain), and Value (my actual representation). The dot product of Q and K divided by the square root of dimension produces attention weights, which scale the Values.',
      examples:
        'In the sentence "The bank was situated by the river bank", self-attention allows the second "bank" token to attend strongly to "river", giving it a different contextual representation than a financial institution.',
      keyTakeaways: [
        'Attention solves the long-range dependency problem by operating in parallel.',
        'Multi-head attention allows the model to attend to different types of relationships (syntactic, semantic, temporal) concurrently.',
        'Positional encodings restore sequential awareness lost during parallel processing.',
      ],
    },
    {
      id: 's1-n3',
      slug: 'prompt-engineering-and-system-prompts',
      number: '03',
      episode: 'Ep. 03',
      title: 'System Prompts & Structured Outputs',
      topic: 'LLM Application Design',
      readingTime: '4 min read',
      shortDescription:
        'Techniques for steering LLM reasoning with few-shot examples, system role priming, and schema-constrained JSON outputs.',
      concepts: ['System Prompt Priming', 'Few-Shot Reasoning', 'JSON Schema Enforcement', 'Hallucination Guardrails'],
      whatILearned:
        'Effective prompt engineering is not about conversational persuasion, but about reducing entropy and constraining the model probability distribution toward deterministic formats.',
      myUnderstanding:
        'Using clear delimiter tags (XML/Markdown), distinct persona constraints, few-shot demonstration pairs, and schema validation guarantees consistent API responses suitable for backend integration.',
      examples:
        'In Interview AI, asking Gemini to return a raw score yields unpredictable text formatting. Supplying a rigid JSON schema with fields `score`, `clarity`, and `rubricFeedback` forces strict payload adherence.',
      keyTakeaways: [
        'System instructions set the boundary conditions for the generation probability tree.',
        'Providing negative constraints ("Do not output markdown codeblocks") alongside explicit positive examples reduces deviation.',
        'Structured outputs bridge non-deterministic LLMs with deterministic software backends.',
      ],
    },
    {
      id: 's1-n4',
      slug: 'placeholder-season-1-note',
      number: '04',
      episode: 'Ep. 04 [Placeholder]',
      title: '[Replace with actual Season 1 note: Vector Embeddings & Similarity]',
      topic: 'Embeddings [Placeholder]',
      readingTime: '3 min read',
      shortDescription:
        '[Placeholder note: Documenting high-dimensional embeddings, cosine similarity, and vector indexing fundamentals.]',
      concepts: ['Embeddings', 'Cosine Similarity', 'Vector Indexing [Placeholder]'],
      whatILearned:
        '[Placeholder: Replace with actual notes on vector embeddings and distance metrics learned during Namaste AI.]',
      myUnderstanding:
        '[Placeholder: Personal explanation of how textual meaning maps into geometric vector space.]',
      examples:
        '[Placeholder: Practical code snippet calculating cosine similarity between question and candidate answer.]',
      keyTakeaways: [
        '[Placeholder takeaway: Geometric representations of semantic meaning]',
        '[Placeholder takeaway: Metric selection (Cosine vs Euclidean distance)]',
      ],
    },
  ],
  projects: [
    {
      id: 'p-interview-evaluator',
      title: 'Interview Evaluator Script',
      concept: 'Structured Prompt Chains & Evaluator Rubrics',
      technologies: ['Node.js', 'Express', 'Gemini API'],
      description:
        'A prototype CLI & API experiment testing deterministic score extraction and rubric feedback using prompt chains with Google Gemini.',
      github: 'https://github.com/vighnesh204',
      live: '#',
      learning:
        'Practiced enforcing JSON schemas on LLM outputs and handling API rate limits during automated prompt evaluations.',
    },
  ],
};

export default season1;
