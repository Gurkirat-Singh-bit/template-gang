import { LaunchUrlTester } from "./index";
import { ImportedPreview } from "./showcase";

export default function Preview() {
  return (
    <ImportedPreview layout="contained" integrationDemo={true}>
      <LaunchUrlTester />
    </ImportedPreview>
  );
}
