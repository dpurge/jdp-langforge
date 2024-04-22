import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import TextEditor from "../islands/TextEditor.tsx";

export default function Home() {
  const count = useSignal(3);
  return (
    <div>
      <h1>Welcome to Fresh</h1>
      <Counter count={count} />
      <TextEditor ime="epo/phrase" />
    </div>
  );
}
