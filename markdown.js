// Load the markdown parser library
async function loadMarkdown() {
    // Fetch the Markdown content from the hello.md file
    const response = await fetch('hello.md');
    const markdown = await response.text();
  
    // Use marked.js (imported via CDN) to parse the markdown content into HTML
    const htmlContent = marked.parse(markdown);
  
    // Render the HTML inside the #markdown-content div
    document.getElementById('markdown-content').innerHTML = htmlContent;
  }
  
  // Run the function after DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    loadMarkdown().catch((error) =>
      console.error('Error loading Markdown content:', error)
    );
  });