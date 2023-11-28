import { Accessor, Component, For } from "solid-js";

const ProgressDots: Component<{ count: number; active: number }> = (props) => {
  return (
    <div class="absolute w-full h-10 top-0 left-0 flex gap-4 items-center justify-center ">
      <For each={Array(props.count).fill(0)}>
        {(_, index) => (
          <div
            class={`w-2 h-2 bg-primary opacity-80 transition rounded-full ${
              props.active === index() ? "bg-white opacity-100 " : ""
            }`}
          />
        )}
      </For>
    </div>
  );
};

export default ProgressDots;