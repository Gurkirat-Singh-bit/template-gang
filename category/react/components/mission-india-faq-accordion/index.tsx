import type { ComponentProps } from "react";
import { FaqAccordion as Component } from "./component";
import "./styles.css";

export function FaqAccordion(props: ComponentProps<typeof Component>) {
  return (
    <div className="mi-scope">
      <Component {...props} />
    </div>
  );
}
