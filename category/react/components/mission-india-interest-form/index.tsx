import type { ComponentProps } from "react";
import { InterestForm as Component } from "./component";
import "./styles.css";

export function InterestForm(props: ComponentProps<typeof Component>) {
  return (
    <div className="mi-scope">
      <Component {...props} />
    </div>
  );
}
