import FeaturedCourses from "./component/FeaturedCourses";
import Footer from "./component/Footer";
import HeroSection from "./component/HeroSection";
import Instructors from "./component/Instructors";
import TestimonialCards from "./component/TestimonialCards";
import UpcomingWebinar from "./component/UpcomingWebinar";
import WhyChooseUs from "./component/WhyChooseUs";

export default function Home() {
  return (
    <main className=" h-[120vh] bg-black/80 antialiased ">
      <HeroSection />
      <FeaturedCourses/>
      <WhyChooseUs/>
      <TestimonialCards/>
      <UpcomingWebinar/>
      <Instructors/>
      <Footer/>
    </main>
  );
}
