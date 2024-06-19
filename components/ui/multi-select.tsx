"use client";

import * as React from "react";
import { Loader2, X } from "lucide-react";
import { useDebounceCallback } from "usehooks-ts";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { inputVariants } from "./input";

export interface Item {
  id: string;
  name?: string | null;
  title?: string | null;
  label?: string | null;
}

export type MultiSelectProps<T> = {
  items: T[];
  selected: T[];
  onSelect: (items: T[]) => void;
  onSearch?: (search: string) => void;
  loading?: boolean;
  placeholder?: string;
  getLabel?: (item: T) => string;
};

export function MultiSelect<T extends Item = Item>({
  items,
  onSearch = (e) => {},
  loading,
  placeholder,
  selected,
  getLabel,
  onSelect,
}: MultiSelectProps<T>) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);

  const [inputValue, setInputValue] = React.useState("");

  const debounced = useDebounceCallback(onSearch, 500);

  const handleInputChange = React.useCallback(
    (search: string) => {
      setInputValue(search);
      debounced(search);
    },
    [debounced]
  );

  const handleUnselect = React.useCallback(
    (item: T) => {
      const newSelection = selected.filter((s) => s.id !== item.id);

      onSelect(newSelection);
    },
    [selected, onSelect]
  );

  const handleInputClick = React.useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setOpen(true);

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            const newSelected = [...selected];
            newSelected.pop();
            onSelect(newSelected);
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [selected, onSelect]
  );

  const selectables = React.useMemo(
    () => items.filter((item) => !selected.some((i) => i.id === item.id)),
    [items, selected]
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div
        className={inputVariants({
          className: "group min-h-10 h-auto relative hover:cursor-text",
        })}
        onClick={handleInputClick}
      >
        <div className="flex flex-wrap gap-1">
          {selected.map((item) => {
            return (
              <Badge key={item.id} variant="secondary">
                {getLabel ? getLabel(item) : getLabelInternal(item)}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(item);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(item)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={handleInputChange}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder ?? "Select item..."}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
        {loading && (
          <Loader2 className="animate-spin h-5 w-5 absolute right-1" />
        )}
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open && selectables.length > 0 ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((item) => {
                  return (
                    <CommandItem
                      key={item.id}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        onSelect([...selected, item]);
                      }}
                      className={"cursor-pointer"}
                    >
                      {getLabel ? getLabel(item) : getLabelInternal(item)}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
}

function getLabelInternal(item: Item): string {
  if (item.label) {
    return item.label;
  } else if (item.title) {
    return item.title;
  } else if (item.name) {
    return item.name;
  }

  return item.id;
}

export default MultiSelect;
