import { CalPopupButton } from "./index";
import { ImportedPreview } from "./showcase";

export default function Preview() {
  return (
    <ImportedPreview layout="control" integrationDemo={true}>
      <CalPopupButton className="rounded-lg bg-neutral-900 px-5 py-3 text-white">
        Book a call
      </CalPopupButton>
    </ImportedPreview>
  );
}
