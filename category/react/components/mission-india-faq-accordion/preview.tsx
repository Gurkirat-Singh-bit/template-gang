import { FaqAccordion } from "./index";
import { ImportedPreview } from "./showcase";

export default function Preview() {
  return (
    <ImportedPreview layout="contained" integrationDemo={false}>
      <FaqAccordion
        items={[
          {
            question: "How does this component work?",
            answer:
              "Click a question to reveal its answer. Pass your own items array to reuse this accordion.",
          },
          {
            question: "Can I customize the content?",
            answer:
              "Yes. Replace the sample questions and answers with your own content.",
          },
          {
            question: "Does it support the keyboard?",
            answer: "Yes. Tab to a question and press Enter or Space.",
          },
        ]}
      />
    </ImportedPreview>
  );
}
