"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import CategoryCard from "./CategoryCard";

export default function CategorySection() {
  const categories =Array.from({length:10}).map((_,i)=>{
    return{
      title: `Category ${i+1}`,
      image: "/cat.png",
    }
  })
  


  return (
    <section className="bg-primary py-20">
      <div className="container">
        {/* Slider */}
        <Carousel opts={{ align: "start", loop: true }} className="w-full flex flex-col  gap-12">
          <div className="flex items-center justify-between md:flex-row flex-col gap-4"> 
            {/* Header */}
            <div className=" flex flex-col gap-2 ">
              <h2 className="text-4xl md:text-5xl font-bold text-red-600">
                Equipment Categories
              </h2>
              <p className=" text-gray-400">
                Browse our wide range of heavy machinery solutions.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CarouselPrevious className="bg-red-600 border-none text-white size-8! static translate-x-0 translate-y-0" />
              <CarouselNext className="bg-red-600 border-none text-white size-8! static translate-x-0 translate-y-0" />
            </div>
          </div>
          <CarouselContent>
            {categories.map((category, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 sm:basis-1/2 lg:basis-1/3 xl:basis-1/6"
              >
                <CategoryCard {...category} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
