import { ProjectsSection } from "@/components/sections/projects";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}
