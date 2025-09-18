import { siteConfig, recentUpdates } from '@/config/siteConfig';
import { renderBioWithLinks } from '@/utils/renderBio';

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden flex flex-col justify-center items-center p-2">
      <main className="flex flex-col items-center justify-center max-w-[400px]">
        {/* Intro Section */}
        <header className="text-center mb-2">
          <h1 className="name">
            {siteConfig.name}
          </h1>
          <p className="text-left p-2 text-spacing-4">
            {renderBioWithLinks(siteConfig.bio.text, siteConfig.bio.links)}
          </p>
        </header>

        {/* Contact Section */}
        <section className="text-center mb-2 w-full">
          <div className="title">Contact</div>
          <div className="flex justify-between">
            {siteConfig.contactDisplay.map((contactItem, index) => (
              <p key={`${contactItem.type}-${index}`} className="text-left p-2">
                <a 
                  href={contactItem.url}
                  aria-label={`${siteConfig.name} ${contactItem.label}`}
                  target={contactItem.external ? "_blank" : undefined}
                  rel={contactItem.external ? "noopener noreferrer" : undefined}
                >
                  {contactItem.value}
                </a>
              </p>
            ))}
          </div>
        </section>

        <section className="text-center w-full">
          <h4 className="flex">Updates</h4>

            <ul>
              {recentUpdates.map((update) => (
              <li key={update.date}><p>
                <span>{update.date}</span> {': '}
                <a href={update.url} target="_blank" rel="noopener noreferrer">{update.title}</a>
              </p></li>
            ))}
            </ul>


        </section>
      </main>

      {/* Footer Section */}
      <footer className="text-center p-2 border-t-2 border-black">
        <p className="text-left ">
          © 2025 {siteConfig.name}
        </p> 


        <p className="flex align-top">

           <a href="https://bio.enk.icu/blog" target="_blank" rel="noopener noreferrer">Blog</a>

        </p>
        
        
        <p className="flex align-top">
          <a href="https://bio.enk.icu" target="_blank" rel="noopener noreferrer">Previous Web</a>
        </p>

      </footer>
    </div>
  );
}
