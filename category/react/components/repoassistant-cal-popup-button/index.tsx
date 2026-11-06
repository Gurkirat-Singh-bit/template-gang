import type { ComponentProps } from "react";
import { CalPopupButton as Component } from "./component";
import "./styles.css";

export function CalPopupButton(props: ComponentProps<typeof Component>) {
  return (
    <div className="ra-scope">
      <Component {...props} />
    </div>
  );
}
