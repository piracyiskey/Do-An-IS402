import { ChevronLeft, ChevronRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import career from "../assets/career_.png"

function Career() {
  return(
    <div className="flex flex-grow flex-col items-center justify-center">
      <Navbar isTransparent={false} />
      <main className="w-screen pt-16">
        {/* Hero Section */}
        <div className="relative h-[90vh] max-w-7xl mx-auto overflow-hidden flex items-center justify-center mt-20 px-4 md:px-8">
          {/* Background Image */}
          <img 
            src={career}
            alt="Samsung Office" 
            className="w-full h-full object-cover object-center"
          />
          
          {/* Overlay with text */}
          <div className="absolute inset-0 bg-black bg-opacity-20 flex flex-col justify-center items-start px-16">
            <h1 className="text-white text-6xl md:text-7xl font-bold mb-4 leading-tight">
              The future is<br />never finished
            </h1>
            <p className="text-white text-xl md:text-2xl">
              Inspire the world and create the future at Samsung.
            </p>
          </div>
        </div>

        {/* Who We Are Section */}
        <section className="py-20 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 italic">Who we are</h2>
              <p className="text-base text-gray-600">
                We exist to create human-driven innovations that defy barriers to make a better world for all.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1: Life at Samsung */}
              <div className="bg-sky-50 rounded-3xl overflow-hidden flex flex-col h-full">
                <div className="p-6 text-center flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-4">Life at Samsung</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">
                    We are globally connected, future focused and always on the lookout for the next great idea. Join us on this exciting journey as we shape the future of technology and create a brighter tomorrow for generations to come.
                  </p>
                  <a href="#" className="inline-block text-sm text-blue-600 font-medium hover:underline">
                    Learn more
                  </a>
                </div>
                <div className="h-40">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop" 
                    alt="Life at Samsung" 
                    className="w-full h-full object-cover rounded-b-3xl"
                  />
                </div>
              </div>

              {/* Card 2: Benefits */}
              <div className="bg-sky-50 rounded-3xl overflow-hidden flex flex-col h-full">
                <div className="p-6 text-center flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-4">Benefits</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">
                    A company is its people and your health and wellness are at the core of our drive to innovate. Learn more about the top-rated benefits Samsung employees enjoy.
                  </p>
                  <a href="#" className="inline-block text-sm text-blue-600 font-medium hover:underline">
                    Learn more
                  </a>
                </div>
                <div className="h-40">
                  <img 
                    src="https://images.unsplash.com/photo-1506765515384-028b60a970df?w=800&auto=format&fit=crop" 
                    alt="Benefits" 
                    className="w-full h-full object-cover rounded-b-3xl"
                  />
                </div>
              </div>

              {/* Card 3: Internships */}
              <div className="bg-sky-50 rounded-3xl overflow-hidden flex flex-col h-full">
                <div className="p-6 text-center flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-4">Internships</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">
                    Our dynamic internships help you expand your expertise and experience through rich exposure to leadership, opportunities to make an impact and empowerment to bring new ideas to life.
                  </p>
                  <a href="#" className="inline-block text-sm text-blue-600 font-medium hover:underline">
                    Learn more
                  </a>
                </div>
                <div className="h-40">
                  <img 
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&auto=format&fit=crop" 
                    alt="Internships" 
                    className="w-full h-full object-cover rounded-b-3xl"
                  />
                </div>
              </div>

              {/* Card 4: Citizenship */}
              <div className="bg-sky-50 rounded-3xl overflow-hidden flex flex-col h-full">
                <div className="p-6 text-center flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-4">Citizenship</h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1">
                    In stewardship of our legacy, we give back at every opportunity to strengthen the communities where we live and work and make a better world for all.
                  </p>
                  <a href="#" className="inline-block text-sm text-blue-600 font-medium hover:underline">
                    Learn more
                  </a>
                </div>
                <div className="h-40">
                  <img 
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&auto=format&fit=crop" 
                    alt="Citizenship" 
                    className="w-full h-full object-cover rounded-b-3xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Teams Section */}
        <section className="py-20 px-4 md:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 italic">Our teams</h2>
              <p className="text-base text-gray-600">
                We're more than technology. Every role at Samsung presents a new opportunity to make a lasting, global impact.
              </p>
            </div>

            {/* Teams Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team 1: Marketing */}
              <div className="text-center">
                <div className="h-56 mb-6 rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop" 
                    alt="Marketing" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">Marketing</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our Marketing teams bring our technology to life in the marketplace, shaping our brand through strong storytelling in partnership with the best creative and strategy agencies in the world.
                </p>
              </div>

              {/* Team 2: Sales */}
              <div className="text-center">
                <div className="h-56 mb-6 rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop" 
                    alt="Sales" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">Sales</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  First to get their hands on our new devices, the Consumer, Enterprise and Retail Sales teams bring our innovations to the world by driving strong relationships with our customers and understanding how our technology empowers them.
                </p>
              </div>

              {/* Team 3: Corporate Support */}
              <div className="text-center">
                <div className="h-56 mb-6 rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop" 
                    alt="Corporate Support" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">Corporate support</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our Corporate Support teams provide expertise to ensure success across the company. These teams include Human Resources, Legal and Finance.
                </p>
              </div>

              {/* Team 4: Technology */}
              <div className="text-center">
                <div className="h-56 mb-6 rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop" 
                    alt="Technology" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">Technology</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our legacy is rooted in innovation, and our Networks and eCommerce teams drive that heritage forward by pioneering to impact the globe and introducing groundbreaking technology.
                </p>
              </div>

              {/* Team 5: Customer Solutions */}
              <div className="text-center">
                <div className="h-56 mb-6 rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop" 
                    alt="Customer Solutions" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">Customer solutions</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  The North Star for our Customer Care, Logistics and Supply Chain teams is to ensure that our customers are cared for and fully empowered, protecting and supporting the invaluable core.
                </p>
              </div>

              {/* Team 6: Public Affairs */}
              <div className="text-center">
                <div className="h-56 mb-6 rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop" 
                    alt="Public Affairs" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold mb-3">Public affairs</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our Government Affairs team focuses on opportunities to engage and support government customers, policy makers and technology leaders. Our US Public Affairs team ensures that.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default Career;