import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  Tractor,
  Truck,
  Car,
  Bike,
  Wrench,
  Construction,
  Sprout,
  Bug,
  Scissors,
  Waves,
  Hammer,
  Package,
} from "lucide-react";

interface FilterItemProps {
  label: string;
  count?: number;
  isSelected: boolean;
  onSelect: (selected: boolean) => void;
  icon?: React.ReactNode;
}

const FilterItem = ({ label, isSelected, onSelect, icon }: FilterItemProps) => {
  return (
    <div
      onClick={() => onSelect(!isSelected)}
      className={cn(
        "group relative flex min-w-[150px] cursor-pointer flex-col items-center gap-4 rounded-2xl border-2 p-6 transition-all duration-300",
        isSelected
          ? "border-red-600 bg-red-50/50 shadow-md ring-2 ring-red-600/10"
          : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg hover:-translate-y-1",
      )}
    >
      <div
        className={cn(
          "flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 shadow-inner",
          isSelected
            ? "bg-red-600 text-white rotate-3"
            : "bg-gray-50 text-gray-400 group-hover:bg-red-50 group-hover:text-red-500",
        )}
      >
        {icon || <Package className="h-8 w-8" />}
      </div>

      <span
        className={cn(
          "text-center text-[11px] font-bold uppercase tracking-wider leading-tight",
          isSelected
            ? "text-red-700"
            : "text-gray-500 group-hover:text-gray-700",
        )}
      >
        {label}
      </span>

      <div className="absolute right-3 top-3">
        <Checkbox
          checked={isSelected}
          onCheckedChange={(checked) => onSelect(!!checked)}
          className={cn(
            "h-5 w-5 rounded-lg border-2 border-gray-200 transition-all duration-300",
            isSelected &&
              "border-red-600 bg-red-600 data-[state=checked]:bg-red-600 scale-110",
          )}
        />
      </div>
    </div>
  );
};

const iconMap: Record<string, React.ReactNode> = {
  TRACTOR: <Tractor className="h-6 w-6" />,
  "COMBINE HARVESTER": <Construction className="h-6 w-6" />,
  "RICE PLANTING MACHINE": <Sprout className="h-6 w-6" />,
  ATTACHMENT: <Wrench className="h-6 w-6" />,
  TRUCK: <Truck className="h-6 w-6" />,
  CAR: <Car className="h-6 w-6" />,
  MOTORCYCLE: <Bike className="h-6 w-6" />,
  EXCAVATOR: <Hammer className="h-6 w-6" />,
  "MACHINE LAWN MOWER": <Scissors className="h-6 w-6" />,
  "AGRICULTURAL CARRIER": <Truck className="h-6 w-6" />,
  "TILLER CULTIVATOR": <Waves className="h-6 w-6" />,
  "PEST CONTROL MACHINE SPRAYER": <Bug className="h-6 w-6" />,
  CHIPPER: <Scissors className="h-6 w-6" />,
  TRENCHER: <Construction className="h-6 w-6" />,
  "POWER SPRAYER": <Bug className="h-6 w-6" />,
  "AGRICULTURAL MACHINERY": <Tractor className="h-6 w-6" />,
  "CONSTRUCTION MACHINERY": <Construction className="h-6 w-6" />,
};

interface HorizontalFiltersProps {
  title: string;
  items: string[];
  selectedItems: string[];
  onToggle: (item: string, checked: boolean) => void;
  variant?: "scroll" | "grid";
}

export function HorizontalFilterRow({
  title,
  items,
  selectedItems,
  onToggle,
  variant = "scroll",
}: HorizontalFiltersProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="w-full space-y-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between px-1">
        <h3 className="text-sm font-bold uppercase tracking-widest text-gray-500">
          {title}
        </h3>
        {selectedItems.length > 0 && (
          <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full border border-red-100 uppercase">
            {selectedItems.length} Selected
          </span>
        )}
      </div>

      {variant === "grid" ? (
        <div className="flex flex-wrap gap-4 py-4">
          {items.map((item) => (
            <FilterItem
              key={item}
              label={item}
              isSelected={selectedItems.includes(item)}
              onSelect={(checked) => onToggle(item, checked)}
              icon={
                iconMap[item.toUpperCase()] || <Package className="h-6 w-6" />
              }
            />
          ))}
        </div>
      ) : (
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex gap-4 py-4">
            {items.map((item) => (
              <FilterItem
                key={item}
                label={item}
                isSelected={selectedItems.includes(item)}
                onSelect={(checked) => onToggle(item, checked)}
                icon={
                  iconMap[item.toUpperCase()] || <Package className="h-6 w-6" />
                }
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="h-2" />
        </ScrollArea>
      )}
    </div>
  );
}
