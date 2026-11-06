"use client";

import { StatusScreen } from "@/components/status-screen";
import { Button } from "@/components/ui/button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <StatusScreen
      label="LIBRARY / UNAVAILABLE"
      title="Let’s try that again."
      action={<Button onClick={reset}>Try again</Button>}
    >
      <p>
        We couldn’t read the library. Check that <code>category/</code> exists
        and your <code>item.json</code> files contain valid JSON.
      </p>
    </StatusScreen>
  );
}
