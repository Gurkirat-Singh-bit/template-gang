import { InterestForm } from "./index";
import { ImportedPreview } from "./showcase";

export default function Preview() {
  return (
    <ImportedPreview layout="contained" integrationDemo={true}>
      <InterestForm open />
    </ImportedPreview>
  );
}
