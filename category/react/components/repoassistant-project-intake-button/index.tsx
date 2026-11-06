import type { ComponentProps } from "react";
import { ProjectIntakeButton as Component } from "./component";
import "./styles.css";

export function ProjectIntakeButton(props: ComponentProps<typeof Component>) {
  return (
    <div className="ra-scope">
      <Component {...props} />
    </div>
  );
}
