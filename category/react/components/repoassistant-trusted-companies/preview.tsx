import { TrustedCompanies } from "./index";
import { ImportedPreview } from "./showcase";

export default function Preview() {
  return (
    <ImportedPreview layout="section" integrationDemo={false}>
      <TrustedCompanies />
    </ImportedPreview>
  );
}
