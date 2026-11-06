import type { ComponentProps } from "react";
import { LaunchUrlTester as Component } from "./component";
import "./styles.css";

export function LaunchUrlTester(props: ComponentProps<typeof Component>) {
  return (
    <div className="ra-scope">
      <Component {...props} />
    </div>
  );
}
