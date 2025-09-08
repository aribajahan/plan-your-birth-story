import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { FooterSection } from "@/components/sections/FooterSection";
import { SectionContainer } from "@/components/ui/section-container";
import { ResourceCard } from "@/components/ui/resource-card";
import { colors, typography } from "@/styles/design-tokens";
import { useAppMode } from "@/hooks/useAppMode";
import { 
  BookOpen, 
  Users, 
  Heart, 
  Phone, 
  Shield, 
  Lightbulb,
  UserCheck,
  GraduationCap,
  Stethoscope,
  MessageCircle,
  AlertTriangle,
  Headphones
} from "lucide-react";

const Resources = () => {
  const { goToChat } = useAppMode();

  return (
    <div className="min-h-screen overflow-hidden relative">
      <Header onGetStarted={goToChat} />
      
      {/* Hero Section - Cream Background */}
      <SectionContainer backgroundColor={colors.creamBase} condesa={true}>
        <div className="text-center">
          <h1 
            className={`${typography.heading.sizes.xl} font-bold leading-none mb-6`}
            style={{ fontFamily: typography.heading.fontFamily }}
          >
            Resources for Your Journey
          </h1>
          <p 
            className={`${typography.body.sizes.lg} max-w-2xl mx-auto`}
            style={{ 
              fontFamily: typography.body.fontFamily,
              color: colors.deepBlack 
            }}
          >
            Trusted information and support for every step
          </p>
        </div>
      </SectionContainer>

      {/* Educational Resources - Yellow Background */}
      <SectionContainer backgroundColor={colors.boldYellow} condesa={true}>
        <div className="text-center mb-16">
          <h2 
            className={`${typography.heading.sizes.lg} font-bold leading-none mb-4`}
            style={{ fontFamily: typography.heading.fontFamily }}
          >
            Learn What You Need to Know
          </h2>
        </div>
        
        <div className="space-y-12">
          <div>
            <h3 
              className={`${typography.heading.sizes.sm} font-bold mb-8 text-center`}
              style={{ 
                fontFamily: typography.heading.fontFamily,
                color: colors.deepBlack
              }}
            >
              Evidence-Based Information
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResourceCard
                title="Evidence Based Birth"
                description="Research made accessible with clear, evidence-based guidance for informed decision making"
                href="https://evidencebasedbirth.com"
                icon={<BookOpen className="w-5 h-5 text-primary" />}
              />
              <ResourceCard
                title="ACOG Patient Resources"
                description="Official guidance from the American College of Obstetricians and Gynecologists, simplified for patients"
                href="https://www.acog.org/womens-health"
                icon={<Shield className="w-5 h-5 text-primary" />}
              />
              <ResourceCard
                title="Childbirth Connection"
                description="Research on maternity care quality and evidence-based practices"
                href="https://www.nationalpartnership.org/our-work/health/maternity/"
                icon={<Heart className="w-5 h-5 text-primary" />}
              />
            </div>
          </div>
          
          <div>
            <h3 
              className={`${typography.heading.sizes.sm} font-bold mb-8 text-center`}
              style={{ 
                fontFamily: typography.heading.fontFamily,
                color: colors.deepBlack
              }}
            >
              Understanding Your Options
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ResourceCard
                title="Pain Management"
                description="Choices explained simply - from natural techniques to medical interventions"
                icon={<Lightbulb className="w-5 h-5 text-primary" />}
              />
              <ResourceCard
                title="Birth Settings"
                description="Hospital vs. birth center vs. home birth - what works for you"
                icon={<Heart className="w-5 h-5 text-primary" />}
              />
              <ResourceCard
                title="Common Interventions"
                description="When they're used and what to expect during labor and delivery"
                icon={<Stethoscope className="w-5 h-5 text-primary" />}
              />
              <ResourceCard
                title="Your Rights"
                description="Understanding your rights and choices during labor and delivery"
                icon={<Shield className="w-5 h-5 text-primary" />}
              />
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Professional Support - Blue Background */}
      <SectionContainer backgroundColor={colors.richBlue} condesa={true}>
        <div className="text-center mb-16">
          <h2 
            className={`${typography.heading.sizes.lg} font-bold leading-none mb-4 text-white`}
            style={{ fontFamily: typography.heading.fontFamily }}
          >
            Find Your People
          </h2>
        </div>
        
        <div className="space-y-12">
          <div>
            <h3 
              className={`${typography.heading.sizes.sm} font-bold mb-8 text-white text-center`}
              style={{ fontFamily: typography.heading.fontFamily }}
            >
              Doulas & Birth Support
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResourceCard
                title="DONA International"
                description="Find certified doulas in your area with comprehensive directory and certification standards"
                href="https://www.dona.org/what-is-a-doula/find-a-doula/"
                icon={<UserCheck className="w-5 h-5 text-white" />}
                variant="default"
                className="bg-white/10 backdrop-blur-sm border border-white/20"
                darkMode={true}
              />
              <ResourceCard
                title="Interview Questions"
                description="Essential questions to ask when interviewing potential doulas for your birth team"
                icon={<MessageCircle className="w-5 h-5 text-white" />}
                variant="default"
                className="bg-white/10 backdrop-blur-sm border border-white/20"
                darkMode={true}
              />
              <ResourceCard
                title="Doula Roles"
                description="Understanding what doulas do and don't do to set proper expectations"
                icon={<Heart className="w-5 h-5 text-white" />}
                variant="default"
                className="bg-white/10 backdrop-blur-sm border border-white/20"
                darkMode={true}
              />
            </div>
          </div>
          
          <div>
            <h3 
              className={`${typography.heading.sizes.sm} font-bold mb-8 text-white text-center`}
              style={{ fontFamily: typography.heading.fontFamily }}
            >
              Childbirth Education
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResourceCard
                title="Lamaze Classes"
                description="Evidence-based preparation focusing on natural birth and informed decision making"
                href="https://www.lamaze.org/FindAClass"
                icon={<GraduationCap className="w-5 h-5 text-white" />}
                variant="default"
                className="bg-white/10 backdrop-blur-sm border border-white/20"
                darkMode={true}
              />
              <ResourceCard
                title="Bradley Method"
                description="Natural childbirth focus with partner-coached breathing and relaxation techniques"
                href="https://www.bradleybirth.com/Directory.aspx"
                icon={<Users className="w-5 h-5 text-white" />}
                variant="default"
                className="bg-white/10 backdrop-blur-sm border border-white/20"
                darkMode={true}
              />
              <ResourceCard
                title="Class Options"
                description="Hospital classes vs. independent instructors - what's best for your learning style"
                icon={<BookOpen className="w-5 h-5 text-white" />}
                variant="default"
                className="bg-white/10 backdrop-blur-sm border border-white/20"
                darkMode={true}
              />
            </div>
          </div>
          
          <div>
            <h3 
              className={`${typography.heading.sizes.sm} font-bold mb-8 text-white text-center`}
              style={{ fontFamily: typography.heading.fontFamily }}
            >
              Healthcare Providers
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ResourceCard
                title="Find a Midwife"
                description="Directory of certified nurse-midwives and their practice locations"
                href="https://www.midwife.org/find-a-midwife"
                icon={<Stethoscope className="w-5 h-5 text-white" />}
                variant="default"
                className="bg-white/10 backdrop-blur-sm border border-white/20"
                darkMode={true}
              />
              <ResourceCard
                title="Provider Questions"
                description="Important questions to ask when choosing your healthcare provider"
                icon={<MessageCircle className="w-5 h-5 text-white" />}
                variant="default"
                className="bg-white/10 backdrop-blur-sm border border-white/20"
                darkMode={true}
              />
              <ResourceCard
                title="Switching Providers"
                description="When and how to consider changing healthcare providers during pregnancy"
                icon={<AlertTriangle className="w-5 h-5 text-white" />}
                variant="default"
                className="bg-white/10 backdrop-blur-sm border border-white/20"
                darkMode={true}
              />
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Mental Health & Crisis Support - Black Background */}
      <SectionContainer backgroundColor={colors.deepBlack} condesa={true}>
        <div className="text-center mb-16">
          <h2 
            className={`${typography.heading.sizes.lg} font-bold leading-none mb-4 text-white`}
            style={{ fontFamily: typography.heading.fontFamily }}
          >
            You're Not Alone
          </h2>
        </div>
        
        <div className="space-y-12">
          <div>
            <h3 
              className={`${typography.heading.sizes.sm} font-bold mb-8 text-white text-center`}
              style={{ fontFamily: typography.heading.fontFamily }}
            >
              Immediate Crisis Support
            </h3>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <ResourceCard
                title="Crisis Text Line"
                description="Text HOME to 741741 for immediate support from trained crisis counselors"
                icon={<Phone className="w-5 h-5 text-white" />}
                variant="emergency"
              />
              <ResourceCard
                title="Suicide Prevention Lifeline"
                description="Call 988 for 24/7 mental health crisis support and suicide prevention"
                icon={<Headphones className="w-5 h-5 text-white" />}
                variant="emergency"
              />
              <ResourceCard
                title="Maternal Mental Health"
                description="Call 1-833-TLC-MAMA for perinatal mental health support and resources"
                icon={<Heart className="w-5 h-5 text-white" />}
                variant="emergency"
              />
            </div>
          </div>
          
          <div className="space-y-12">
            <div>
              <h3 
                className={`${typography.heading.sizes.sm} font-bold mb-8 text-white text-center`}
                style={{ fontFamily: typography.heading.fontFamily }}
              >
                Mental Health Resources
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ResourceCard
                  title="Postpartum Support International"
                  description="Find perinatal mental health specialists in your area"
                  href="https://www.postpartum.net/get-help/"
                  icon={<Users className="w-5 h-5 text-white" />}
                  variant="default"
                  className="bg-white/10 backdrop-blur-sm border border-white/20"
                  darkMode={true}
                />
                <ResourceCard
                  title="Maternal Mental Health NOW"
                  description="Resources and advocacy for maternal mental health support"
                  href="https://maternalmentalhealthnow.org/resources/"
                  icon={<Shield className="w-5 h-5 text-white" />}
                  variant="default"
                  className="bg-white/10 backdrop-blur-sm border border-white/20"
                  darkMode={true}
                />
                <ResourceCard
                  title="When to Seek Help"
                  description="Understanding when professional mental health support is needed"
                  icon={<AlertTriangle className="w-5 h-5 text-white" />}
                  variant="default"
                  className="bg-white/10 backdrop-blur-sm border border-white/20"
                  darkMode={true}
                />
              </div>
            </div>
            
            <div>
              <h3 
                className={`${typography.heading.sizes.sm} font-bold mb-8 text-white text-center`}
                style={{ fontFamily: typography.heading.fontFamily }}
              >
                Birth Trauma & Community Support
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ResourceCard
                  title="Birth Trauma Association"
                  description="Processing difficult birth experiences with specialized support"
                  href="https://www.birthtraumaassociation.org.uk/"
                  icon={<Heart className="w-5 h-5 text-white" />}
                  variant="default"
                  className="bg-white/10 backdrop-blur-sm border border-white/20"
                  darkMode={true}
                />
                <ResourceCard
                  title="Solace for Mothers"
                  description="Peer support network for mothers dealing with birth trauma"
                  href="https://solaceformothers.org/"
                  icon={<Users className="w-5 h-5 text-white" />}
                  variant="default"
                  className="bg-white/10 backdrop-blur-sm border border-white/20"
                  darkMode={true}
                />
                <ResourceCard
                  title="Family Equality Council"
                  description="LGBTQ+ family resources and community support"
                  href="https://www.familyequality.org/resources/"
                  icon={<Shield className="w-5 h-5 text-white" />}
                  variant="default"
                  className="bg-white/10 backdrop-blur-sm border border-white/20"
                  darkMode={true}
                />
                <ResourceCard
                  title="Community Groups"
                  description="Local new parent groups and supportive online communities"
                  icon={<MessageCircle className="w-5 h-5 text-white" />}
                  variant="default"
                  className="bg-white/10 backdrop-blur-sm border border-white/20"
                  darkMode={true}
                />
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Final CTA - Coral Background */}
      <SectionContainer backgroundColor={colors.vibrantCoral} condesa={true}>
        <div className="text-center">
          <h2 
            className={`${typography.heading.sizes.xl} font-bold leading-none mb-8 text-white`}
            style={{ fontFamily: typography.heading.fontFamily }}
          >
            Ready to Put It All Together?
          </h2>
          <p 
            className={`${typography.body.sizes.lg} mb-12 text-white/90 max-w-2xl mx-auto`}
            style={{ fontFamily: typography.body.fontFamily }}
          >
            Information is helpful. A plan you feel good about is better.
          </p>
          <Button
            onClick={goToChat}
            className="rounded-full px-12 py-6 font-bold transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: colors.creamBase,
              color: colors.deepBlack,
              fontFamily: typography.body.fontFamily,
              fontSize: typography.body.sizes.lg
            }}
          >
            Create My Birth Plan
          </Button>
        </div>
      </SectionContainer>

      <FooterSection />
    </div>
  );
};

export default Resources;