import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Sub = {
  name: string;
  imageUrl: string;
};

type Cat = {
  name: string;
  imageUrl: string;
  subcategories: Sub[];
};

export function CategoriesPageSimple() {
  // UI data (static)
  const data: Cat[] = [
    {
      name: "Category A",
      imageUrl: "/hero.jpg",
      subcategories: [
        { name: "Sub A1", imageUrl: "/hero.jpg" },
        { name: "Sub A2", imageUrl: "/hero.jpg" },
        { name: "Sub A3", imageUrl: "/hero.jpg" },
        { name: "Sub A4", imageUrl: "/hero.jpg" },
      ],
    },
    {
      name: "Category B",
      imageUrl: "/hero.jpg",
      subcategories: [
        { name: "Sub B1", imageUrl: "/hero.jpg" },
        { name: "Sub B2", imageUrl: "/hero.jpg" },
        { name: "Sub B3", imageUrl: "/hero.jpg" },
      ],
    },
    {
      name: "Category C",
      imageUrl: "/hero.jpg",
      subcategories: [
        { name: "Sub C1", imageUrl: "/hero.jpg" },
        { name: "Sub C2", imageUrl: "/hero.jpg" },
        { name: "Sub C3", imageUrl: "/hero.jpg" },
        { name: "Sub C4", imageUrl: "/hero.jpg" },
        { name: "Sub C5", imageUrl: "/hero.jpg" },
      ],
    },
  ];

  return (
    <div className="space-y-6 container my-12">
      {/* Header */}
      <div className=" flex flex-col gap-2 ">
        <h2 className="text-4xl md:text-5xl font-bold text-red-600">
          Equipment Categories
        </h2>
        <p className=" text-gray-400">
          Browse our wide range of heavy machinery solutions.
        </p>
      </div>

      {/* Categories list */}
      <div className="space-y-5">
        {data.map((cat) => (
          <Card key={cat.name} className="overflow-hidden">
            <CardHeader className="p-4 pb-3">
              <div className="flex items-center gap-3">
                {/* Category image */}
                <div className=" size-16 overflow-hidden rounded-md border">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Category name */}
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h2 className="text-xl font-semibold text-red-600">
                      {cat.name}
                    </h2>
                    <Badge variant="secondary" className="font-normal">
                      {cat.subcategories.length} sub
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Simple category description goes here.
                  </p>
                </div>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="p-4">
              {/* Subcategories grid */}
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cat.subcategories.map((sub) => (
                  <div
                    key={sub.name}
                    className="flex items-center gap-3 rounded-lg border p-3 hover:bg-muted/30 transition-colors"
                  >
                    <div className=" size-14 overflow-hidden rounded-md border bg-muted">
                      <img
                        src={sub.imageUrl}
                        alt={sub.name}
                        className="object-cover w-full h-full"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="truncate text-red-600 font-medium">
                        {sub.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        View items
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
