import React from "react";

export default function SubmitButton({
  text = "",
  className = "",
  style = {},
}: {
  text?: string;
  className?: string;
  style?: any;
}) {
  return (
    <button
      type="submit"
      className={
        "text-white bg-LightGreen hover:bg-TealGreen dark:bg-LightGreen dark:hover:bg-TealGreenDark py-1 px-8 rounded-[6px] " +
        className
      }
      style={{ ...style }}
    >
      {text}
    </button>
  );
}
