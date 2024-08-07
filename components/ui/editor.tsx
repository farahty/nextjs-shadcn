"use client";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import { FC, useCallback, useEffect, useId, useMemo, useState } from "react";
import { useTheme } from "next-themes";
import { Loader2 } from "lucide-react";
import * as Badge from "./badge";
import * as Button from "./button";
import * as Card from "./card";
import * as DropdownMenu from "./dropdown-menu";
import * as Input from "./input";
import * as Label from "./label";
import * as Popover from "./popover";
// import * as Form from "./form";
import * as Select from "./select";
import * as Tabs from "./tabs";
import * as Toggle from "./toggle";
import * as Tooltip from "./tooltip";

export interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  valueType?: "json" | "html" | "md";
  defaultValue?: string;
}

export const Editor: FC<EditorProps> = ({
  onChange,
  value,
  defaultValue,
  valueType = "json",
  ...props
}) => {
  const id = useId();
  const { theme, systemTheme } = useTheme();

  const [initialContent, setInitialContent] = useState<
    PartialBlock[] | undefined | "loading"
  >("loading");

  useEffect(() => {
    loadFromStorage().then((content) => {
      setInitialContent(content);
    });
  }, []);

  // Creates a new editor instance.
  // We use useMemo + createBlockNoteEditor instead of useCreateBlockNote so we
  // can delay the creation of the editor until the initial content is loaded.
  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({ initialContent });
  }, [initialContent]);

  const handleChange = useCallback(async () => {
    if (!editor) return;

    if (valueType === "md") {
      const txt = await editor.blocksToMarkdownLossy();
      onChange(txt);
    } else if (valueType === "html") {
      const txt = await editor.blocksToHTMLLossy();
      onChange(txt);
    } else {
      onChange(JSON.stringify(editor?.document));
    }

    saveToStorage(editor.document);
  }, [editor, onChange, valueType]);

  if (editor === undefined) {
    return (
      <div className="w-full flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <BlockNoteView
      theme={
        theme === "dark" ? "dark" : theme === "light" ? "light" : systemTheme
      }
      id={id}
      editor={editor}
      onBlur={handleChange}
      shadCNComponents={{
        Badge,
        Button,
        Card,
        DropdownMenu,
        //Form,
        Input,
        Label,
        Popover,
        Select,
        Tabs,
        Toggle,
        Tooltip,
      }}
      {...props}
    />
  );
};

async function saveToStorage(jsonBlocks: Block[]) {
  // Save contents to local storage. You might want to debounce this or replace
  // with a call to your API / database.
  localStorage.setItem("editorContent", JSON.stringify(jsonBlocks));
}

async function loadFromStorage() {
  // Gets the previously stored editor contents.
  const storageString = localStorage.getItem("editorContent");
  return storageString
    ? (JSON.parse(storageString) as PartialBlock[])
    : undefined;
}

export default Editor;
