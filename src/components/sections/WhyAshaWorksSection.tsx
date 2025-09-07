export const WhyAshaWorksSection = () => {
  return (
    <section className="min-h-screen flex items-center bg-cream-base">
      <div className="w-full px-4 lg:px-8">
        
        {/* Rounded Yellow Container */}
        <div className="rounded-3xl p-8 lg:p-16" style={{ backgroundColor: 'hsl(var(--bold-yellow))' }}>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Text Content */}
            <div>
              <h2 className="section-headline leading-none mb-8" style={{ 
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                color: 'hsl(var(--deep-black))'
              }}>
                Why Asha
              </h2>
              
              <div className="space-y-6 text-xl lg:text-2xl font-helvetica font-medium" style={{ color: 'hsl(var(--deep-black))' }}>
                <p className="font-bold">Guided questions that help</p>
                <p className="font-bold">Reality checks that prepare</p>
                <p className="font-bold">Professional output that works</p>
              </div>
            </div>

            {/* Illustration */}
            <div className="flex items-center justify-center">
              <img 
                src="/lovable-uploads/283ff4e2-3b9b-4a55-b7dc-c5a2a74139fd.png"
                alt="Creative pregnant woman painting - representing personalized birth planning"
                className="w-full h-auto max-w-md lg:max-w-lg"
              />
            </div>
            
          </div>
        </div>
        
      </div>
    </section>
  );
};