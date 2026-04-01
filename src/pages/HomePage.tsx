import CategorySection from "@/components/categories/CategorySection"
import Hero from "@/components/home/HeroSection"
import AboutSection from "@/components/home/AboutSection"
import { ProductSection } from "@/components/products/ProductsSection"
import EmailSubscription from "@/components/shared/EmailBox"


const HomePage = () => {
  return (
    <main>
      <Hero />
      <AboutSection />
      <CategorySection/>
      <ProductSection />
      <EmailSubscription />
      
    </main>
  )
}

export default HomePage