import { StatusScreen } from "@/components/status-screen";

export default function NotFound() {
  return (
    <StatusScreen
      label="404 / RESOURCE NOT FOUND"
      title="This resource isn’t here."
    >
      <p>
        It may have moved or been removed from your folders. Head back to the
        library to find what you need.
      </p>
    </StatusScreen>
  );
}
