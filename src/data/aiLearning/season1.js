// ─── Namaste AI — Season 01: Foundations of AI & LLMs ──────────────────────
// Source of truth for Season 1 notes, concepts, and learning projects.
//
// Note schema:
//   id, slug, number, episode, title, topic, readingTime, shortDescription,
//   question, simpleExplanation (array of paragraphs), myUnderstanding,
//   concepts (array of string labels), flow (array of step strings or null),
//   example, keyTakeaways (array of strings)
//
// Rules:
//   - All notes reflect Vighnesh's personal understanding, in his own words.
//   - No fabricated episode numbers, milestones, or invented learnings.
//   - If a field is null or empty array, the component does not render it.
// ────────────────────────────────────────────────────────────────────────────

const season1 = {
  id: 'season-1',
  slug: 'season-1',
  seasonNumber: '01',
  romanNumber: 'I',
  title: 'Foundations of AI & LLMs',
  subtitle: 'Understanding how language models actually work beneath the abstraction.',
  status: 'Completed',
  attribution: 'Namaste AI',
  accentColor: '#ff5b1f',
  description:
    'Before you can build with AI, you need to understand what is happening under the hood. This season covers how modern language models process text, why they sometimes fail, and how to communicate with them precisely — moving from treating LLMs as black boxes to understanding them as systems with specific mechanics.',
  keyConcepts: [
    'Tokens & Byte-Pair Encoding',
    'High-Dimensional Embeddings',
    'Self-Attention & Transformer Architecture',
    'System Prompts & Context Windows',
    'Structured Output Techniques',
  ],
  notes: [
    {
      id: 's1-n1',
      slug: 'how-llms-work-and-tokenization',
      number: '01',
      episode: 'Ep. 01',
      title: 'How LLMs Work & Tokenization',
      topic: 'LLM Foundations',
      readingTime: '5 min read',
      shortDescription:
        'How human text becomes numbers a neural network can actually work with — and why that process explains a lot of surprising model behavior.',
      question:
        'LLMs receive human language, but neural networks can only work with numbers. How does our text become something the model can actually process?',
      simpleExplanation: [
        'Before a language model can do anything useful, it has to convert your text into a format it can work with. This process is called tokenization, and it\'s the very first step every time you send a prompt.',
        'A tokenizer breaks your input into chunks called tokens. A token isn\'t always a full word — it might be a word, a part of a word, a punctuation mark, or even a space. These chunks are then mapped to numbers from a fixed vocabulary, and those numbers are what actually flow into the model.',
        'The specific algorithm most modern LLMs use is called Byte-Pair Encoding (BPE). It starts with individual characters and repeatedly merges the most frequent pairs until it builds up a useful vocabulary of subwords. Common words like "the" or "is" get their own single token. Rarer or longer words get split into recognizable pieces.',
      ],
      myUnderstanding:
        'I think of a token as the smallest unit of meaning the model operates on — not characters, not words exactly, but these learned subword chunks. What clicked for me is that the model never sees your sentence as a sentence. It sees a sequence of integers. Every word, space, punctuation mark — it\'s all just a number in a list. That\'s both humbling and clarifying. It explains why models can sometimes struggle with letter counting ("how many r\'s in strawberry?") or simple string reversals — they\'re not reading characters, they\'re processing token IDs.',
      concepts: ['Tokenization', 'Byte-Pair Encoding (BPE)', 'Context Window', 'Vocabulary'],
      flow: [
        'User writes text',
        'Tokenizer splits text into subword chunks',
        'Each chunk maps to a token ID (a number)',
        'Token IDs become embeddings (vectors)',
        'Embeddings flow through the model',
        'Model predicts the next token ID',
        'Token ID is decoded back to text',
      ],
      example:
        'The word "apple" is usually a single token. But "antigravity" might be split into ["anti", "gravity"] — two tokens. This matters practically: a 1000-word prompt is not 1000 tokens. Typical English prose runs about 1.3–1.5 tokens per word. Context windows are measured in tokens, not words, so understanding this changes how you think about prompt length.',
      keyTakeaways: [
        'LLMs don\'t read characters or words — they process tokens, which are number-mapped subword chunks.',
        'Tokenization is handled before the model ever runs. A different tokenizer means a completely different way of seeing the same input.',
        'Token count directly affects context window usage, latency, and API cost.',
        'Some surprising model failures (letter counting, string reversal) happen at the tokenization level, not the reasoning level.',
      ],
    },
    {
      id: 's1-n2',
      slug: 'attention-and-transformer-architecture',
      number: '02',
      episode: 'Ep. 02',
      title: 'Attention Mechanism & Transformer Architecture',
      topic: 'Architecture',
      readingTime: '6 min read',
      shortDescription:
        'Why the attention mechanism was a breakthrough — and how transformers let every token consider its relationship with every other token simultaneously.',
      question:
        'Earlier models had to process language word by word, in order. They\'d often forget context from the beginning of a long sentence by the time they reached the end. How did attention solve this?',
      simpleExplanation: [
        'The attention mechanism lets the model look at all the tokens in the input at the same time and figure out which ones matter most for each position. Instead of reading left-to-right sequentially, every token can "attend" to every other token in a single pass.',
        'The core mechanism works through three vectors: Query, Key, and Value. For each token, the model learns to ask a question (Query), what it contains (Key), and what information it contributes (Value). The attention weight between two tokens is determined by how well the Query of one matches the Key of the other. High match = high attention weight = that token\'s Value contributes more.',
        'Multi-head attention runs this process multiple times in parallel with different learned weight matrices. Each "head" can learn to pay attention to different kinds of relationships — one head might focus on grammatical roles, another on semantic similarity, another on positional proximity.',
        'A transformer is essentially a stack of these attention layers plus feed-forward networks, repeated many times. Each layer refines the token representations before passing them forward.',
      ],
      myUnderstanding:
        'The mental model that helped me was thinking of it as a voting system. When the model is processing the word "bank" in "the bank near the river," every other token in the sentence casts a weighted vote for what "bank" should mean. "River" votes strongly that this is a geographical bank, not a financial one. The attention weights determine how much each vote counts. The model doesn\'t need separate rules for disambiguation — it learns these relationships from patterns in training data.',
      concepts: ['Self-Attention', 'Query / Key / Value', 'Multi-Head Attention', 'Positional Encoding', 'Transformer Block'],
      flow: [
        'Token IDs come in',
        'Embeddings: each token ID → a vector',
        'Positional encoding added (so the model knows token order)',
        'Self-attention: each token attends to all others',
        'Feed-forward network refines each token',
        'Repeat through N transformer layers',
        'Final layer predicts next token probabilities',
      ],
      example:
        'In the sentence "The bank was on the river bank", self-attention allows the second "bank" to attend heavily to "river" rather than the financial institution meaning. This disambiguation happens without any explicit rules — it emerges from learned attention weights.',
      keyTakeaways: [
        'Self-attention processes all tokens in parallel, solving the sequential memory problem of older RNN architectures.',
        'Q/K/V is the mathematical way the model figures out which tokens are relevant to each other.',
        'Multi-head attention lets the model learn multiple types of relationships simultaneously.',
        'Positional encodings are added because attention itself has no inherent sense of token order.',
        'A transformer is many stacked attention + feed-forward blocks, each refining the representation.',
      ],
    },
    {
      id: 's1-n3',
      slug: 'system-prompts-and-structured-outputs',
      number: '03',
      episode: 'Ep. 03',
      title: 'System Prompts & Structured Outputs',
      topic: 'LLM Application Design',
      readingTime: '4 min read',
      shortDescription:
        'LLMs produce free-form text by default. When building software, you need predictable, structured responses — and here\'s how to get them.',
      question:
        'LLMs naturally generate flowing prose. But when you\'re building a real application, you need structured data — not a paragraph. How do you get an LLM to return something your code can actually use?',
      simpleExplanation: [
        'By default, a language model returns whatever text comes naturally from its next-token prediction. That\'s fine for conversation, but it\'s a problem in software. If you\'re building an interview evaluator and you ask "rate this answer," you might get "This answer is fairly good, perhaps a 7 or 8 out of 10, with some room for improvement..." — and now you have to parse that string, which breaks constantly.',
        'System prompts solve part of this. The system role is essentially the model\'s persistent context — a set of instructions it follows throughout the entire conversation. By placing strict constraints in the system prompt ("You always respond in JSON. Your response will have exactly these fields..."), you shift the model\'s output distribution toward more predictable formats.',
        'The more powerful approach is schema-constrained generation — available through JSON Mode or structured output settings in APIs like Gemini and OpenAI. When you provide a JSON schema, the model\'s output is guided to match it token by token. This significantly improves consistency, though it doesn\'t eliminate all edge cases.',
      ],
      myUnderstanding:
        'My mental model is that you\'re not asking the model to format its answer differently — you\'re narrowing the space of possible outputs it can generate. Free-form generation has a huge space of valid next tokens at every step. A JSON schema collapses that space at each position: if you\'re mid-way through generating an object, only certain tokens are valid completions. The model isn\'t being "told" to behave — the generation process itself is constrained.',
      concepts: ['System Prompt', 'JSON Mode', 'Schema-Constrained Generation', 'Hallucination Guardrails', 'Few-Shot Examples'],
      flow: null,
      example:
        'In Interview AI, asking "Rate this answer" in free text returned unpredictable formats every time. After adding a system prompt defining a strict JSON schema — `{ "score": number, "clarity": string, "strengths": string[], "improvements": string[] }` — responses became reliably parseable. When schema mode was also enabled in the API call, consistency improved further. The tradeoff: the schema adds token overhead and constraints must be designed carefully.',
      keyTakeaways: [
        'System prompts set persistent instructions that shape every response in a conversation or request.',
        'Few-shot examples in the prompt show the model exactly what output format you expect.',
        'Schema-constrained generation (JSON Mode) is more reliable than prompt instructions alone for structured data.',
        'These approaches improve consistency — they don\'t guarantee it. Always validate and handle malformed responses.',
      ],
    },
  ],
  projects: [
    {
      id: 'p-interview-evaluator',
      title: 'Interview Evaluator Prototype',
      concept: 'Structured Prompt Chains & Evaluator Rubrics',
      technologies: ['Node.js', 'Express', 'Gemini API'],
      description:
        'A prototype testing deterministic score extraction using schema-enforced prompts with Google Gemini. Built while learning how to get reliable structured data from a generative model.',
      github: 'https://github.com/vighnesh204',
      live: null,
      learning:
        'Learned that prompt constraints alone are not enough — schema mode at the API level is essential for reliable structured output. Also practiced handling rate limits and partial/malformed responses gracefully.',
    },
  ],
};

export default season1;
