import { ProjectIntakeButton } from "./index";
import { ImportedPreview } from "./showcase";

export default function Preview() {
  return (
    <ImportedPreview layout="control" integrationDemo={true}>
      <ProjectIntakeButton className="rounded-lg bg-neutral-900 px-5 py-3 text-white">
        Start a project
      </ProjectIntakeButton>
    </ImportedPreview>
  );
}
