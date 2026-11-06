import { Integrations } from "./index";
import { ImportedPreview } from "./showcase";

export default function Preview() {
  return (
    <ImportedPreview layout="section" integrationDemo={false}>
      <Integrations />
    </ImportedPreview>
  );
}
