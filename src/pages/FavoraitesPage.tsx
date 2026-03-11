import EmailSubscription from "@/components/shared/EmailBox";
import PageHeader from "@/components/shared/PageHeader";

const FavoraitesPage = () => {
  return (
    <>
      <PageHeader title="Favorites" />
      <div className="container py-20 flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className=" flex flex-col gap-2 ">
            <h2 className="text-4xl md:text-5xl font-bold text-red-600">
              Your favorites
            </h2>
            <p className=" text-gray-400">
              Here are the machines you've added to your favorites.
            </p>
          </div>
        </div>
        {/* <ProductsGrid isFavorite /> */}
        
      </div>
      <EmailSubscription/>
    </>
  );
};

export default FavoraitesPage;
