import { VpsCostCalculator } from "./index";
import { ImportedPreview } from "./showcase";

export default function Preview() {
  return (
    <ImportedPreview layout="contained" integrationDemo={false}>
      <VpsCostCalculator />
    </ImportedPreview>
  );
}
