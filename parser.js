
// Escape Html sp characters 
function sanitize(str) {
  return String(str)
     .replace(/&/g, '&amp;')
     .replace(/</g, '&lt;')
     .replace(/>/g, '&gt;')
     .replace(/"/g, '&quot;')
     .replace(/'/g, '&#39;');
}

//Prevent javascript Urls
function sanitizeURL(url) {
  const trimmed = String(url).trim();

  if (/^javascript:/i.test(trimmed)) {
    return '#';
  }
  return trimmed;
}

// Parse inline markdown.
function parseInline(text) {
  let result = text;

// Protect inline code first 
result = result.replace(
  /`([^`]+)`/g,
    (_, code) =>
      `\x00CODE${btoa(unescape(encodeURIComponent(code)))}CODE\x00`
);

//Images 
result = result.replace(
   /!\[([^\]]*)\]\(([^)]+)\)/g,
    (_, alt, src) =>
      `<img src="${sanitizeURL(src)}" alt="${alt}">`
);

//Links 
result = result.replace(
  /\[([^\]]+)\]\(([^)]+)\)/g,
    (_, text, url) =>
      `<a href="${sanitizeURL(url)}">${text}</a>`
);

//Bold and italic
result = result.replace(
    /\*\*\*(.+?)\*\*\*/g,
    '<strong><em>$1</em></strong>'
  );

  result = result.replace(
    /___(.+?)___/g,
    '<strong><em>$1</em></strong>'
  );

  // Bold
  result = result.replace(
    /\*\*(.+?)\*\*/g,
    '<strong>$1</strong>'
  );

  result = result.replace(
    /__(.+?)__/g,
    '<strong>$1</strong>'
  );

  // Italic
  result = result.replace(
    /\*(.+?)\*/g,
    '<em>$1</em>'
  );

  result = result.replace(
    /_(.+?)_/g,
    '<em>$1</em>'
  );

  //Restore code spans 
    result = result.replace(
    /\x00CODE(.+?)CODE\x00/g,
    (_, encoded) =>
      `<code>${sanitize(
        decodeURIComponent(escape(atob(encoded)))
      )}</code>`
  );

  return result;
}

//Parse block level markdown 
function parseBlocks(md) {
  const tokens = [];
  const lines = md.split('\n');

  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    //code block
    if (/^```/.test(line)) {
      const lang = line.replace(/^```/, '').trim();
    
      const codeLines = [];
      i++;

      while (
        i < lines.length &&
        !/^```\s*$/.test(lines[i])
      ) {
        codeLines.push(lines[i]);
      }
      tokens.push({
        type: 'code_block',
        lang,
        content : sanitize(codeLines.join('\n'))
      });
      i++;
      continue;
  }

    // Heading 
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      tokens.push({
        type: 'heading',
        level: heading[1].length,
        content: parseInline(
          sanitize(heading[2])
        )
      });
      i++;
      continue;
    }

    //Blockquote
    if (/^>\s?/.test(line)) {
      const quoteLine = [];

      while (
        i < lines.length &&
        /^>\s?/.test(lines[i])
      ) {
        quoteLine.push(
          lines[i].replace(/^>\s?/, '')
        );
        i++;
      }

      tokens.push({
        type: 'blockquote',
        content: parseInline(
          sanitize(quoteLine.join('\n'))
        )
      });
      continue;
    }

    //Ul
    if (/^[*+-]\s+/.test(line)) {
      const item = [];

      while (
        i < lines.length &&
         /^[*+-]\s+/.test(lines[i])
      ) {
        items.push(
          parseInline(
            sanitize(
              lines[i].replace(/^[*+-]\s+/, '')
            )
          )
        );
        i++;
      }
      tokens.push({
        type: 'ul',
        items
      });
      continue;
    }

    //Ol
    if (/^\d+\.\s+/.test(line)) {
      const items = [];
      while(
        i < lines.length &&
        /^\d+\.\s+/.test(lines[i])
      ) {
        items.push(
          parseInline(
            sanitize(
              lines[i].replace(/^\d+\.\s+/, '')
            )
          )
        );
        i++;
      }
      tokens.push({
        type: 'ol',
        items
      });
      continue;
    }

    //Empty line
    if (/^\s*$/.test(line)) {
      i++;
      continue;
    }

    //Paragraph 
    const paragraph = [];
    while (
      i < lines.length &&
      !/^\s*$/.test(lines[i]) &&
      !/^```/.test(lines[i]) &&
      !/^#{1,6}\s/.test(lines[i]) &&
      !/^>\s?/.test(lines[i]) &&
      !/^[*+-]\s+/.test(lines[i]) &&
      !/^\d+\.\s+/.test(lines[i]) &&
      !/^(\*{3,}|-{3,}|_{3,})\s*$/.test(lines[i])
    ) {
      paragraph.push(lines[i]);
      i++;
    }
    tokens.push({
      type: 'paragraph',
      content: parseInline(
        sanitize(paragraph.join(' '))
      )
    });
 }
return tokens;
}

//Render Html
function renderToHTML(tokens) {
  return tokens
    .map(token => {
      switch (token.type) {
        case 'heading':
          return `<h${token.level}>${token.content}</h${token.level}>`;

        case 'code_block': {
          const langClass = token.lang
            ? ` class="language-${sanitize(token.lang)}"`
            : '';

          return `<pre><code${langClass}>${token.content}</code></pre>`;
        }

        case 'blockquote':
          return `<blockquote>${token.content}</blockquote>`;

        case 'ul':
          return `<ul>${token.items
            .map(item => `<li>${item}</li>`)
            .join('')}</ul>`;

        case 'ol':
          return `<ol>${token.items
            .map(item => `<li>${item}</li>`)
            .join('')}</ol>`;

        case 'hr':
          return '<hr>';

        case 'paragraph':
          return `<p>${token.content}</p>`;

        default:
          return '';
      }
    })
    .join('\n');
}

//Main export 
export function parseMarkdown(md) {
   if (!md || !md.trim()) {
    return '';
  }
  const tokens = parseBlocks(md);
  return renderToHTML(tokens);
}