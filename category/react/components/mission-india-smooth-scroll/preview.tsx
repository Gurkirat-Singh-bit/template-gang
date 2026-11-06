import { SmoothScroll } from "./index";
import { ImportedPreview } from "./showcase";

export default function Preview() {
  return (
    <ImportedPreview layout="section" integrationDemo={false}>
      <>
        <SmoothScroll />
        <div className="mi-scope p-8">
          <h2 className="mb-6 text-3xl">Smooth scroll</h2>
          <a href="#scroll-target" className="underline">
            Scroll to the next section ↓
          </a>
          <div className="min-h-[110vh] py-16">
            Scroll this preview to try the Lenis behavior.
          </div>
          <section id="scroll-target" className="min-h-[70vh] py-16 text-3xl">
            You reached the next section.
          </section>
        </div>
      </>
    </ImportedPreview>
  );
}
