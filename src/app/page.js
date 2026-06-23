import Banner from "@/components/homePage/Banner";
import FeaturedLawyers from "@/components/homePage/FeaturedLawyers";
import LegalCategories from "@/components/homePage/LegalCategories";
import { featuredLawyers } from "@/lib/fetchData";
import Image from "next/image";

export default async function Home() {
  const lawyers = await featuredLawyers();
  return (
  <div>
      <Banner/>
      <FeaturedLawyers lawyers={lawyers}/>
      <LegalCategories/>
      
   </div>
  );
}
