import { BioLink } from '@/config/siteConfig';

/**
 * Renders bio text with embedded links
 * @param bioText - The bio text containing [linkText] patterns
 * @param links - Array of BioLink objects defining the links
 * @returns Array of string and JSX elements for rendering
 */
export function renderBioWithLinks(
  bioText: string, 
  links?: BioLink[]
): (string | React.JSX.Element)[] {
  if (!links || links.length === 0) {
    return [bioText];
  }

  let result: (string | React.JSX.Element)[] = [bioText];

  links.forEach((link: BioLink, index: number) => {
    const linkPattern = `[${link.text}]`;
    
    result = result.flatMap((part) => {
      if (typeof part === 'string' && part.includes(linkPattern)) {
        const parts = part.split(linkPattern);
        const newParts: (string | React.JSX.Element)[] = [];
        
        parts.forEach((textPart: string, partIndex: number) => {
          if (partIndex > 0) {
            newParts.push(
              <a
                key={`${index}-${partIndex}`}
                href={link.url}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
              >
                {link.text}
              </a>
            );
          }
          if (textPart) {
            newParts.push(textPart);
          }
        });
        
        return newParts;
      }
      return [part];
    });
  });

  return result;
}
