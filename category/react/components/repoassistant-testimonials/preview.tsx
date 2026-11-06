import { Testimonials } from "./index";
import { ImportedPreview } from "./showcase";

export default function Preview() {
  return (
    <ImportedPreview layout="section" integrationDemo={false}>
      <Testimonials />
    </ImportedPreview>
  );
}
