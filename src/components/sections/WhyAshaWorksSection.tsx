export const WhyAshaWorksSection = () => {
  return (
    <section className="min-h-screen flex items-center" style={{ backgroundColor: 'hsl(var(--bold-yellow))' }}>
      <div className="w-full">
        <div className="grid lg:grid-cols-2 min-h-screen">
          
          {/* Left: Bold Text Block */}
          <div className="flex items-center justify-center p-16">
            <div className="max-w-xl">
              <h2 className="section-headline leading-none mb-8" style={{ 
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                color: 'hsl(var(--deep-black))'
              }}>
                Why Asha Actually Works
              </h2>
              
              <div className="space-y-8 text-2xl font-helvetica font-medium" style={{ color: 'hsl(var(--deep-black))' }}>
                <p className="font-bold">Guided questions that help</p>
                <p className="font-bold">Reality checks that prepare</p>
                <p className="font-bold">Professional output that works</p>
              </div>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="flex items-center justify-center p-16" style={{ backgroundColor: 'hsl(var(--cream-base))' }}>
            <img 
              src="/lovable-uploads/283ff4e2-3b9b-4a55-b7dc-c5a2a74139fd.png"
              alt="Creative pregnant woman painting - representing personalized birth planning"
              className="w-full h-auto max-w-lg"
            />
          </div>
          
        </div>
      </div>
    </section>
  );
};