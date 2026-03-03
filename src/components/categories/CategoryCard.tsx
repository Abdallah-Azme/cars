
interface CategoryCardProps {
  title: string;
  image: string;
}

export default function CategoryCard({
  title,
  image,
}: CategoryCardProps) {
  return (
    <div className="flex flex-col gap-2 items-center group cursor-pointer">
      <div className="relative size-50 overflow-hidden border-2 border-background rounded-full flex items-center justify-center group-hover:border-red-600 transition-colors duration-500">
        <img
          src={image}
          alt={title}
          className="w-36 object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>
        <h3 className="text-lg font-semibold text-white group-hover:text-red-600 transition-colors duration-500">
          {title}
        </h3>
    </div>
  );
}
