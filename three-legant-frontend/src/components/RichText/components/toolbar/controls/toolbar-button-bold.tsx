import { useActive } from "@/components/RichText/hooks/use-active";
import { ToolbarComponent } from "@/components/RichText/ui/toolbar";
import { Editor } from "@tiptap/core";
import { Bold } from "lucide-react";
import React, { memo, useCallback } from "react";

interface ToolbarButtonBoldProps {
  editor: Editor;
}

const ToolbarButtonBold = ({ editor }: ToolbarButtonBoldProps) => {
  const isBoldActive = useActive(editor, "bold");
  const onBold = useCallback(
    () => editor.chain().focus().toggleBold().run(),
    [editor],
  );

  return (
    <ToolbarComponent.Button
      tooltip="Bold"
      tooltipShortcut={["Mod", "B"]}
      active={isBoldActive}
      onClick={onBold}
    >
      <Bold />
    </ToolbarComponent.Button>
  );
};

export default memo(ToolbarButtonBold, (prevProps, nextProps) => {
  return prevProps.editor === nextProps.editor;
});
