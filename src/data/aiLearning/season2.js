// ─── Namaste AI — Season 02: Building with AI — Software Engineering for the AI Era ──
// Source of truth for Season 2 notes, concepts, and learning projects.
//
// Season 02 focus: Using AI as an engineering partner across the full
// software development lifecycle — from ideation to shipping.
//
// Rules:
//   - Season 02 is NOT about how LLMs work internally (that was Season 01).
//   - Season 02 is about how a developer USES AI while building software.
//   - Do NOT add RAG, ReAct, chunking, or agent architecture here.
//     Those belong to later seasons in the official curriculum.
//   - Only expose notes with genuine documented personal learning.
//   - After real notes, the UI shows a "Coming Soon" editorial block.
// ────────────────────────────────────────────────────────────────────────────

const season2 = {
  id: 'season-2',
  slug: 'season-2',
  seasonNumber: '02',
  romanNumber: 'II',
  title: 'AI-Native Software Engineering',
  subtitle: 'Using AI as a development partner across the full engineering lifecycle.',
  status: 'In Progress',
  attribution: 'Namaste AI',
  accentColor: '#3fc9b9',
  description:
    'Season 01 was about understanding how AI works. Season 02 is about using it. This season focuses on integrating AI into the actual process of building software — using it to think through requirements, explore design options, write and review code, find bugs, and ship faster. The goal is to work with AI the way a senior developer would work with a junior: give clear context, evaluate the output critically, and own the final decision.',
  keyConcepts: [
    'AI-Assisted Ideation & Requirement Breakdown',
    'Prompting for Code Generation & Explanation',
    'AI-Powered Code Review & Refactoring',
    'Debugging with AI Assistance',
    'Zero-Shot & Few-Shot Prompting in Practice',
    'Testing Strategies with AI Help',
  ],
  notes: [
    {
      id: 's2-n1',
      slug: 'using-ai-as-a-dev-partner',
      number: '01',
      episode: 'Ep. 04',
      title: 'Using AI as a Development Partner',
      topic: 'AI-Assisted Engineering',
      readingTime: '5 min read',
      shortDescription:
        'How to actually use AI across the software development lifecycle — and what it means to evaluate its output rather than just accept it.',
      question:
        'AI tools can now write code, explain errors, and suggest architecture. But does using them make you a better developer, or a faster copy-paster? How do you use AI in a way that actually helps you grow?',
      simpleExplanation: [
        'AI tools are useful at almost every stage of building software — not just writing code. You can use them to think through requirements before writing a line, explore different architectural approaches, understand unfamiliar codebases, review your own work for issues you might have missed, and generate test cases.',
        'The key difference between using AI well and using it badly comes down to one thing: do you understand what it gave you? A developer who pastes AI output without reading it isn\'t just at risk of shipping bugs — they\'re also not learning. But a developer who uses AI to explore options they then evaluate and modify is compressing their thinking and going faster without losing ownership.',
        'The mental model I\'m building is: AI is a fast, tireless, knowledgeable collaborator that needs direction. It works best when you give it specific context, a clear task, and then treat its output as a first draft to review — not a final answer to accept.',
      ],
      myUnderstanding:
        'I think of it like pair programming with someone who types faster than me and never gets tired, but also doesn\'t know my specific project context unless I explain it. The better I get at giving context and asking precise questions, the more useful the output becomes. The AI doesn\'t replace the engineering judgment — it just lets me explore more options in less time.',
      concepts: ['Zero-Shot Prompting', 'Context Engineering', 'AI-Assisted Code Review', 'Iterative Prompting'],
      flow: [
        'Identify the problem or task clearly',
        'Give the AI specific context about your project/constraints',
        'Ask a focused question or request',
        'Review and critically evaluate the output',
        'Modify, combine, or reject — don\'t paste blindly',
        'Ask follow-up questions to go deeper',
        'Ship something you understand and own',
      ],
      example:
        'When I was building DevLens, I wasn\'t sure how to structure the streaming response from Gemini into the UI without causing layout jumps. I described the problem to an AI tool: "I\'m using the Gemini streaming API in a React app and the incremental text updates are causing the UI to re-render and jump. Here\'s my current code..." — it suggested using an accumulated state string rather than appending to an array, which stabilized the rendering. I understood why that worked, modified it slightly for my specific setup, and it solved the problem. That\'s the kind of use that actually teaches something.',
      keyTakeaways: [
        'AI assistance is most valuable when you treat its output as a first draft, not a final answer.',
        'The quality of AI output is directly proportional to the specificity of the context you provide.',
        'Using AI well is a skill — giving it clear task descriptions and evaluating output critically takes practice.',
        'The goal is to move faster without losing engineering ownership.',
      ],
    },
  ],
  // Notes in progress — more will be added as genuine learning is documented.
  comingSoon: true,
  comingSoonNote:
    'Season 02 is still in progress. New notes are added as I work through each concept and apply it to real projects.',
  projects: [
    {
      id: 'p-portfolio-assistant',
      title: 'Ask Vighnesh — AI Portfolio Assistant',
      concept: 'Grounded AI Integration in a Real Application',
      technologies: ['React', 'JavaScript', 'Gemini API', 'Vercel Serverless Functions'],
      description:
        'The AI assistant embedded in this portfolio. Built to answer questions about Vighnesh\'s work, skills, and projects using only verified portfolio data — with the context grounded server-side to prevent hallucination.',
      github: 'https://github.com/vighnesh204/Portfolio-AI',
      live: null,
      learning:
        'Building this taught me how to structure an AI feature that stays factually honest. The key was keeping context authoritative and server-only — the model never receives user-supplied context that could confuse it. I also learned to write system instructions that constrain the assistant\'s scope rather than just describing its persona.',
    },
  ],
};

export default season2;
