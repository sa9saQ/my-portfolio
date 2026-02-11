import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/ui/navbar";
import { Footer } from "@/components/ui/footer";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { ProjectsPreview } from "@/components/sections/projects-preview";
import { SkillsSection } from "@/components/sections/skills";
import { ContactSection } from "@/components/sections/contact";
import { SectionRevealWrapper } from "@/components/ui/section-wrapper";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <SectionRevealWrapper>
        <AboutSection />
      </SectionRevealWrapper>
      <SectionRevealWrapper>
        <ProjectsPreview />
      </SectionRevealWrapper>
      <SectionRevealWrapper>
        <SkillsSection />
      </SectionRevealWrapper>
      <SectionRevealWrapper>
        <ContactSection />
      </SectionRevealWrapper>
      <Footer />
    </main>
  );
}
