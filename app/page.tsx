import { Hero } from "@/components/scenes/Hero";
import { About } from "@/components/scenes/About";
import { Services } from "@/components/scenes/Services";
import { Process } from "@/components/scenes/Process";
import { Stack } from "@/components/scenes/Stack";
import { Work } from "@/components/scenes/Work";
import { Credentials } from "@/components/scenes/Credentials";
import { Experience } from "@/components/scenes/Experience";
import { Education } from "@/components/scenes/Education";
import { Contact } from "@/components/scenes/Contact";
import { Stage } from "@/components/fx/Stage";

export default function Home() {
  return (
    <Stage>
      <Hero />
      <About />
      <Services />
      <Process />
      <Stack />
      <Work />
      <Credentials />
      <Experience />
      <Education />
      <Contact />
    </Stage>
  );
}
