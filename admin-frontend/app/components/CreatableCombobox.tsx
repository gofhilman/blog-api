import { useEffect, useRef, useState } from "react";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
} from "./ui/combobox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Plus } from "lucide-react";

export default function CreatableCombobox({
  id,
  name,
  categoryNames,
  defaultCategories,
}: any) {
  const initialLabels: LabelItem[] = categoryNames.map((name: string) => ({
    id: name.replace(/\s+/g, "-"),
    value: name,
  }));
  const initialSelected = defaultCategories
    ? initialLabels.filter((label) => defaultCategories.includes(label.value))
    : [];

  const [labels, setLabels] = useState<LabelItem[]>(initialLabels);
  const [selected, setSelected] = useState<LabelItem[]>(initialSelected);
  const [query, setQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const createInputRef = useRef<HTMLInputElement | null>(null);
  const comboboxInputRef = useRef<HTMLInputElement | null>(null);
  const pendingQueryRef = useRef("");
  const highlightedItemRef = useRef<LabelItem | undefined>(undefined);

  useEffect(() => {
    const handleBlur = () => {
      if (document.activeElement?.tagName === "IFRAME") {
        setOpen(false);
      }
    };

    window.addEventListener("blur", handleBlur);
    return () => window.removeEventListener("blur", handleBlur);
  }, []);

  function handleInputKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter" || highlightedItemRef.current) {
      return;
    }

    event.preventDefault();

    const currentTrimmed = query.trim();
    if (currentTrimmed === "") {
      return;
    }

    const normalized = currentTrimmed.toLocaleLowerCase();
    const existing = labels.find(
      (label) => label.value.trim().toLocaleLowerCase() === normalized,
    );

    if (existing) {
      setSelected((prev) =>
        prev.some((item) => item.id === existing.id)
          ? prev
          : [...prev, existing],
      );
      setQuery("");
      return;
    }

    pendingQueryRef.current = currentTrimmed;
    setOpenDialog(true);
  }

  function handleCreate() {
    const input = createInputRef.current || comboboxInputRef.current;
    const value = input ? input.value.trim() : "";
    if (!value) {
      return;
    }

    const normalized = value.toLocaleLowerCase();
    const baseId = normalized.replace(/\s+/g, "-");
    const existing = labels.find(
      (l) => l.value.trim().toLocaleLowerCase() === normalized,
    );

    if (existing) {
      setSelected((prev) =>
        prev.some((i) => i.id === existing.id) ? prev : [...prev, existing],
      );
      setOpenDialog(false);
      setQuery("");
      return;
    }

    // Ensure we don't collide with an existing id (e.g., value "docs" vs. existing id "docs")
    const existingIds = new Set(labels.map((l) => l.id));
    let uniqueId = baseId;
    if (existingIds.has(uniqueId)) {
      let i = 2;
      while (existingIds.has(`${baseId}-${i}`)) {
        i += 1;
      }
      uniqueId = `${baseId}-${i}`;
    }

    const newItem: LabelItem = { id: uniqueId, value };

    if (!selected.find((item) => item.id === newItem.id)) {
      setLabels((prev) => [...prev, newItem]);
      setSelected((prev) => [...prev, newItem]);
    }

    setOpenDialog(false);
    setQuery("");
  }

  function handleCreateSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleCreate();
  }

  const trimmed = query.trim();
  const lowered = trimmed.toLocaleLowerCase();
  const exactExists = labels.some(
    (l) => l.value.trim().toLocaleLowerCase() === lowered,
  );
  // Show the creatable item alongside matches if there's no exact match
  const itemsForView: Array<LabelItem> =
    trimmed !== "" && !exactExists
      ? [
          ...labels,
          {
            creatable: trimmed,
            id: `create:${lowered}`,
            value: `Create "${trimmed}"`,
          },
        ]
      : labels;

  return (
    <>
      <Input
        type="hidden"
        name={name}
        value={selected.map((item) => item.value).join(", ")}
      />
      <Combobox
        items={itemsForView}
        multiple
        onValueChange={(next) => {
          const creatableSelection = next.find(
            (item) =>
              item.creatable &&
              !selected.some((current) => current.id === item.id),
          );

          if (creatableSelection && creatableSelection.creatable) {
            pendingQueryRef.current = creatableSelection.creatable;
            setOpenDialog(true);
            return;
          }
          const clean = next.filter((i) => !i.creatable);
          setSelected(clean);
          setQuery("");
        }}
        value={selected}
        inputValue={query}
        onInputValueChange={setQuery}
        onItemHighlighted={(item) => {
          highlightedItemRef.current = item;
        }}
        open={open}
        onOpenChange={setOpen}
      >
        <ComboboxChips ref={containerRef}>
          <ComboboxValue>
            {(value: LabelItem[]) => (
              <>
                {value.map((label) => (
                  <ComboboxChip key={label.id} aria-label={label.value}>
                    {label.value}
                  </ComboboxChip>
                ))}
                <ComboboxChipsInput
                  ref={comboboxInputRef}
                  id={id}
                  placeholder={value.length > 0 ? "" : "e.g. Software Engineering"}
                  onKeyDown={handleInputKeyDown}
                  className="text-base"
                />
              </>
            )}
          </ComboboxValue>
        </ComboboxChips>

        <ComboboxContent sideOffset={4} anchor={containerRef}>
          <ComboboxEmpty>No labels found.</ComboboxEmpty>
          <ComboboxList>
            {(item: LabelItem) =>
              item.creatable ? (
                <ComboboxItem key={item.id} value={item}>
                  <span>
                    <Plus />
                  </span>
                  <div>Create "{item.creatable}"</div>
                </ComboboxItem>
              ) : (
                <ComboboxItem key={item.id} value={item}>
                  <div>{item.value}</div>
                </ComboboxItem>
              )
            }
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new label</DialogTitle>
            <DialogDescription>Add a new label to select.</DialogDescription>
          </DialogHeader>
          <form id="create-label" onSubmit={handleCreateSubmit}>
            <Input
              ref={createInputRef}
              placeholder="Label name"
              defaultValue={pendingQueryRef.current}
            />
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" form="create-label">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

interface LabelItem {
  creatable?: string;
  id: string;
  value: string;
}
