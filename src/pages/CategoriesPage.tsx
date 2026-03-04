import { CategoriesPageSimple } from "@/components/categories/CategoriesPageSimple";
import EmailSubscription from "@/components/shared/EmailBox";
import PageHeader from "@/components/shared/PageHeader";

const CategoriesPage = () => {
  return (
    <>
      <PageHeader title="Categories" />
      <CategoriesPageSimple />
      <EmailSubscription />
    </>
  );
};

export default CategoriesPage;
