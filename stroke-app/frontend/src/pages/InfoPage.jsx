import Navbar from '../components/Navbar';

export default function NeuroPulsePage() {
  const blogs = [
    {
      title: "Understanding Stroke: Causes and Symptoms",
      link: "https://www.heart.org/en/health-topics/stroke/about-stroke",
      source: "American Heart Association"
    },
    {
      title: "Stroke Prevention: Tips for a Healthy Brain",
      link: "https://www.stroke.org/en/life-after-stroke/stroke-prevention",
      source: "Stroke.org"
    },
    {
      title: "Latest Research on Stroke Recovery",
      link: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6760273/",
      source: "NCBI"
    },
    {
      title: "Diet and Lifestyle Changes to Reduce Stroke Risk",
      link: "https://www.mayoclinic.org/diseases-conditions/stroke/in-depth/stroke-prevention/art-20045401",
      source: "Mayo Clinic"
    },
    {
      title: "Recognizing the Early Signs of Stroke",
      link: "https://www.cdc.gov/stroke/index.htm",
      source: "CDC"
    },
    {
      title: "Managing Stroke Risk Factors Effectively",
      link: "https://www.webmd.com/stroke/guide/stroke-prevention",
      source: "WebMD"
    },
    {
      title: "Stroke Symptoms and Types",
      link: "https://www.nhs.uk/conditions/stroke/",
      source: "NHS"
    },
    {
      title: "Rehabilitation After Stroke: What to Expect",
      link: "https://www.stroke.org/en/life-after-stroke/stroke-recovery",
      source: "Stroke.org"
    },
    {
      title: "Stroke and Brain Health: Key Insights",
      link: "https://www.medicalnewstoday.com/articles/150701",
      source: "Medical News Today"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-50 to-white text-gray-800 flex flex-col">
      <Navbar />

      {/* Info Section */}
      <div className="flex-grow max-w-5xl mx-auto pt-20 p-6 flex flex-col gap-6 overflow-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-teal-700 text-center">Welcome</h1>
        <blockquote className="italic text-gray-700 text-center border-l-4 border-teal-300 pl-4 py-2">
          “Protect your brain — it's your life's control center.”
        </blockquote>

        <div className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4">
          <p className="text-gray-700 leading-relaxed">
            A stroke happens when the blood supply to part of the brain is interrupted or reduced,
            preventing brain tissue from getting oxygen and nutrients. Symptoms include facial droop,
            arm weakness, speech difficulties, and a sudden severe headache. Stroke is a medical emergency —
            every minute counts. Quick treatment can reduce brain damage and improve outcomes.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Prevention includes controlling blood pressure, managing diabetes, avoiding smoking, regular exercise, and a healthy diet.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="bg-teal-50 rounded-lg p-4 shadow-inner">
              <h3 className="font-semibold text-teal-700 mb-2">Global incidence</h3>
              <p className="text-gray-700">~15 million strokes/year</p>
            </div>
            <div className="bg-teal-50 rounded-lg p-4 shadow-inner">
              <h3 className="font-semibold text-teal-700 mb-2">India incidence</h3>
              <p className="text-gray-700">~1.8 million/year</p>
            </div>
          </div>
        </div>

        {/* Blog Section */}
        <h2 className="text-3xl md:text-4xl font-bold text-teal-700 text-center mt-10">NeuroPulse Health Blog</h2>
        <p className="text-center text-gray-700 text-lg">
          Stay informed with the latest research, prevention tips, and healthcare insights about brain stroke.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {blogs.map((blog, idx) => (
            <a 
              key={idx} 
              href={blog.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow flex flex-col gap-2"
            >
              <h3 className="text-teal-700 font-semibold text-lg">{blog.title}</h3>
              <p className="text-gray-600 text-sm">{blog.source}</p>
              <span className="text-teal-500 font-medium text-sm mt-auto">Read more →</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
