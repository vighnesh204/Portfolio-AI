// ─── contact.js ─────────────────────────────────────────────────────────────
// Single source of truth for Vighnesh's verified contact information.
//
// Rules per AGENTS.md & Factual Integrity:
//  — Never invent emails, handles, or phone numbers.
//  — Only populate fields when real, approved URLs/addresses are confirmed.
//  — Components MUST conditionally render based on these fields.
// ─────────────────────────────────────────────────────────────────────────────

export const CONTACT_INFO = {
  name: 'Vighnesh Borhade',
  location: 'Pune, India',
  availability: 'Available for Opportunities',
  github: 'https://github.com/vighnesh204',
  linkedin: "https://linkedin.com/in/vighneshborhade", // [Pending: Add verified LinkedIn profile URL]
  email: "borhadevighnesh05@gmail.com",    // [Pending: Add verified contact email address]
};

export default CONTACT_INFO;
