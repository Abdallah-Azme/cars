import { Card, CardContent } from "@/components/ui/card";

export default function StatsSection() {
  const stats = [
    { number: "15+", label: "Years of Experience" },
    { number: "250+", label: "Completed Projects" },
    { number: "120+", label: "Available Machines" },
    { number: "98%", label: "Client Satisfaction" },
  ];

  return (
    <section className=" py-20">
      <div className="container flex flex-col gap-10">
        {/* Header */}
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600">
            Our Performance in Numbers
          </h2>
          <p className=" text-gray-400 max-w-2xl mx-auto">
            Delivering strength, reliability, and excellence in every project.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className=" border bg-primary hover:border-red-600 transition-all duration-300 text-center"
            >
              <CardContent className="py-10">
                <h3 className="text-4xl md:text-5xl font-bold text-red-600">
                  {stat.number}
                </h3>
                <p className="mt-3 text-gray-300">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
