// components/products/product-filters-ui.tsx
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash } from "lucide-react";

function SectionTitle({
  title,
  showAll = true,
}: {
  title: string;
  showAll?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <h4 className="text-sm font-semibold">{title}</h4>
      </div>

      {showAll && (
        <label className="flex items-center gap-2 text-xs text-muted-foreground">
          <Checkbox defaultChecked />
          <span>ALL</span>
        </label>
      )}
    </div>
  );
}

function ChecklistBox({
  items,
  height = "auto",
}: {
  items: string[];
  height?: number | string;
}) {
  return (
    <div className="rounded-md border bg-background">
      <ScrollArea style={{ height }} className="p-3">
        <div className="space-y-2">
          {items.map((c) => (
            <div key={c} className="flex items-center gap-2">
              <Checkbox id={c} />
              <Label htmlFor={c} className="text-sm font-normal">
                {c}
              </Label>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function RangeSelect() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Unselected" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="any">Unselected</SelectItem>
          <SelectItem value="1">Option 1</SelectItem>
          <SelectItem value="2">Option 2</SelectItem>
          <SelectItem value="3">Option 3</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Unselected" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectItem value="any">Unselected</SelectItem>
          <SelectItem value="1">Option 1</SelectItem>
          <SelectItem value="2">Option 2</SelectItem>
          <SelectItem value="3">Option 3</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function ProductFilters() {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-red-600">Filters</h3>
        <Button variant="destructive" size="sm" className="gap-2">
          <Trash className="h-4 w-4" />
          Reset
        </Button>
      </div>

      <Separator />

      {/* ====== Layout like the image ====== */}
      <div className=" flex flex-col gap-6">
        {/* Column 1 */}
        <div className="space-y-6">
          <div className="space-y-3">
            <SectionTitle title="Category" />
            <ChecklistBox items={["EXCAVATOR", "MINI EXCAVATOR"]} />
          </div>

          <div className="space-y-3">
            <SectionTitle title="Model" />
            <ChecklistBox items={["Model 1", "Model 2", "Model 3", "Model 4"]}  />
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          <div className="space-y-3">
            <SectionTitle title="Make" />
            <ChecklistBox
              items={[
                "CAT",
                "DOOSAN",
                "HANIX",
                "HITACHI",
                "IHI",
                "KATO",
                "KOBELCO",
                "KOMATSU",
                "KUBOTA",
              ]}
              
            />
          </div>

          <div className="space-y-3">
            <SectionTitle title="Year" showAll={false} />
            <RangeSelect />
          </div>

          <div className="space-y-3">
            <SectionTitle title="Hour" showAll={false} />
            <RangeSelect />
          </div>

          <div className="space-y-3">
            <SectionTitle title="Evaluation Points" showAll={false} />
            <RangeSelect />
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-6">
          <div className="space-y-3">
            <SectionTitle title="Size" />
            <ChecklistBox
              items={[
                "MINIMINI",
                "MINI",
                "SMALL",
                "MEDIUM",
                "LARGE",
                "X-LARGE",
                "XX-LARGE",
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}