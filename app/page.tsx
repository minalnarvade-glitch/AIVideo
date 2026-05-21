import Image from "next/image";
import Hero from "./_components/Hero";
import Header from "./_components/Header";
export default function Home() {
  return (
    <div className="md:px-16 lg:px-24 xl:px-36">
      {/**header */}
          <Header/>
      {/**Hero */}
      <Hero/>
    </div>
  );
}
