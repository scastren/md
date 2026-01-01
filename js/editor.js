// ===== editor.js =====

// 1️⃣ Markdown-it configuration
const md = window.markdownit({
  html: false,        // estää raw HTML:n (turvallisuus)
  linkify: true,
  typographer: true
});

// 2️⃣ DOM-elementit
const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const saveBtn = document.getElementById("saveBtn");

// 3️⃣ LocalStorage-avain
const STORAGE_KEY = "md-editor-content";

// 4️⃣ Default English Markdown tutorial text
const DEFAULT_TEXT = `# Markdown Editor Tutorial

Welcome to the **Markdown Editor**. This file demonstrates most of the basic Markdown features.

---

## Headings

# H1
## H2
### H3
#### H4

---

## Emphasis

*Italic* or _italic_  
**Bold** or __bold__  
~~Strikethrough~~

---

## Lists

- Unordered list item 1
- Unordered list item 2
  - Nested item
* Another unordered

1. Ordered list item 1
2. Ordered list item 2
   1. Nested ordered

---

## Blockquotes

> This is a blockquote.  
> It can span multiple lines.

---

## Code

Inline code: \`console.log("Hello World");\`

Multiline code block:

\`\`\`js
function greet(name) {
  console.log("Hello " + name);
}
greet("Student");
\`\`\`

Shell example:

\`\`\`bash
$ ls -la
$ echo "Hello World"
\`\`\`

---

## Links and Images

[OpenAI](https://openai.com)  

![Example image](https://github.com/scastren/md/blob/main/blue.png)

---

## Horizontal Rule

---

## Tables

| Name       | Role        | Age |
|------------|------------|-----|
| Alice      | Developer  | 30  |
| Bob        | Designer   | 28  |

---

## Footnotes

This is a sentence with a footnote.[^1]

[^1]: This is the footnote text.

---

## Nested Elements

- List with **bold text**
- Another list with \`inline code\`
- > Blockquote with *italic text*

---

## Tips

- Markdown is simple to read and write.
- Preview updates live.
- Save your work with the **Save (.md)** button.
`;

// 5️⃣ Load content from localStorage or default
const savedContent = localStorage.getItem(STORAGE_KEY);
editor.value = savedContent || DEFAULT_TEXT;

// 6️⃣ Render function with debounce
let timer = null;
function render() {
  preview.innerHTML = md.render(editor.value);
  localStorage.setItem(STORAGE_KEY, editor.value); // autosave
}

editor.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(render, 150); // 150ms debounce
});

// 7️⃣ Initial render
render();

// 8️⃣ Save button logic (.md file download)
saveBtn.addEventListener("click", () => {
  const content = editor.value;
  const blob = new Blob([content], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "markdown_tutorial.md"; // default file name
  a.click();

  URL.revokeObjectURL(url);
});
