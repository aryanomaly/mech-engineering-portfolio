import { Link } from 'react-router'
import { ArrowRight, Cog, Wind, Cpu, ChevronRight, FileText, Download, Code, Compass } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const projects = [
  {
    id: 'double-wishbone-suspension',
    title: 'Double Wishbone Suspension Design & FEA',
    subtitle: 'CAD Modeling, Structural Analysis & Topology Optimization',
    description:
      'Complete design and finite element analysis of a double wishbone suspension system for Formula SAE applications. Includes 3D CAD modeling in SolidWorks, static structural analysis in ANSYS, suspension kinematics simulation in MATLAB, and CNC fabrication of the upright component.',
    image: '/images/suspension-cad.jpg',
    icon: Cog,
    tags: ['SolidWorks', 'ANSYS', 'MATLAB', 'CNC', 'GD&T'],
    highlights: ['22% weight reduction via topology optimization', 'Safety factor > 2.5 under dynamic loads', 'Full GD&T manufacturing drawings'],
    color: 'from-slate-700 to-slate-900',
  },
  {
    id: 'naca-airfoil-cfd',
    title: 'NACA 2412 Airfoil: Wind Tunnel & CFD Validation',
    subtitle: 'Experimental Aerodynamics & Computational Fluid Dynamics',
    description:
      'Built a low-speed open-circuit wind tunnel test section, conducted pressure and force measurements on a NACA 2412 airfoil, and validated results against ANSYS Fluent CFD simulations across multiple angles of attack from 0° to 15°.',
    image: '/images/airfoil-windtunnel.jpg',
    icon: Wind,
    tags: ['ANSYS Fluent', 'Wind Tunnel', 'MATLAB', 'Data Acquisition'],
    highlights: ['<8% error between experimental & CFD lift coefficient', 'Pressure tap measurements at 18 chord positions', 'k-ω SST turbulence model validation'],
    color: 'from-blue-800 to-slate-900',
  },
  {
    id: 'autonomous-sorting-system',
    title: 'Autonomous Material Sorting System',
    subtitle: 'Mechatronics, Pneumatics & Embedded Controls',
    description:
      'Designed and built a conveyor-based automated sorting system that classifies objects by color using sensor fusion and sorts them with a pneumatic actuated diverter. Integrated Arduino-based control with pneumatic actuation and HMI display.',
    image: '/images/sorting-system.jpg',
    icon: Cpu,
    tags: ['Arduino', 'Pneumatics', 'Sensor Fusion', 'CAD', 'HMI'],
    highlights: ['95%+ sorting accuracy at 30 parts/minute', 'Complete pneumatic circuit design', 'Real-time HMI with count tracking'],
    color: 'from-emerald-800 to-slate-900',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-4 bg-slate-700 text-slate-200 hover:bg-slate-700">
              Mechanical Engineering Portfolio
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Three Engineering Projects<br />
              <span className="text-slate-400">Built for Impact</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
              A curated collection of mechanical engineering projects spanning structural design & FEA, 
              aerodynamics & CFD, and mechatronics systems integration. Each project demonstrates 
              hands-on technical skills that recruiters value.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                to="/project/double-wishbone-suspension"
                className="inline-flex items-center gap-2 border border-slate-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
              >
                Start Exploring
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-slate-700 pt-8">
            {[
              { label: 'Projects', value: '3' },
              { label: 'Tools Used', value: '12+' },
              { label: 'Engineering Disciplines', value: '3' },
              { label: 'Quantified Results', value: '15+' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Featured Projects</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Each project targets a different competency that mechanical engineering recruiters screen for. 
              Click any project to explore the full technical details.
            </p>
          </div>

          <div className="space-y-16">
            {projects.map((project, index) => {
              const Icon = project.icon
              const isEven = index % 2 === 0
              return (
                <div
                  key={project.id}
                  className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-12 items-center`}
                >
                  {/* Image */}
                  <div className="w-full lg:w-1/2">
                    <Link to={`/project/${project.id}`} className="block group">
                      <div className="relative overflow-hidden rounded-xl shadow-lg">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-64 md:h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                        <div className="absolute top-4 left-4">
                          <div className="bg-white/90 backdrop-blur-sm p-2 rounded-lg">
                            <Icon className="h-5 w-5 text-slate-700" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Content */}
                  <div className="w-full lg:w-1/2">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">{project.title}</h3>
                    <p className="text-sm font-medium text-slate-500 mb-4 uppercase tracking-wide">
                      {project.subtitle}
                    </p>
                    <p className="text-slate-600 mb-6 leading-relaxed">{project.description}</p>

                    <div className="space-y-3 mb-6">
                      {project.highlights.map((highlight) => (
                        <div key={highlight} className="flex items-start gap-3">
                          <div className="mt-1 min-w-[6px] h-[6px] rounded-full bg-slate-400" />
                          <span className="text-sm text-slate-700">{highlight}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={`/project/${project.id}`}
                      className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:text-slate-600 transition-colors group"
                    >
                      View Full Project
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Tools & Technologies</h2>
            <p className="text-slate-600">Software, hardware, and methodologies used across all projects</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              'SolidWorks', 'ANSYS FEA', 'ANSYS Fluent', 'MATLAB',
              'Arduino', 'C/C++', 'GD&T', 'CNC Machining',
              'Pneumatics', 'Sensor Fusion', 'Data Acquisition', 'Technical Reporting',
            ].map((tool) => (
              <div
                key={tool}
                className="bg-white border border-slate-200 rounded-lg px-4 py-3 text-center text-sm font-medium text-slate-700 hover:border-slate-400 hover:shadow-sm transition-all"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Project Downloads</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Download the complete technical file packages for each project — CAD drawings, 
              simulation reports, MATLAB/Arduino code, and design calculations. Show these files 
              during interviews as proof of hands-on work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: 'Project 1: Suspension',
                files: [
                  { icon: Code, name: 'Suspension_Kinematics_Solver.m', desc: 'MATLAB kinematics script' },
                  { icon: FileText, name: 'Suspension_Design_Calculations.xlsx', desc: '5-sheet design workbook' },
                  { icon: FileText, name: 'FEA_Simulation_Report.md', desc: 'Complete ANSYS FEA report' },
                  { icon: Compass, name: 'Upright_Technical_Drawing.pdf', desc: 'Manufacturing drawing with GD&T' },
                ],
                color: 'bg-slate-700',
              },
              {
                title: 'Project 2: Airfoil',
                files: [
                  { icon: Code, name: 'Airfoil_Data_Processing.m', desc: 'MATLAB data processing' },
                  { icon: FileText, name: 'Experimental_Data_CFD.xlsx', desc: '5-sheet data workbook' },
                  { icon: FileText, name: 'CFD_Simulation_Report.md', desc: 'ANSYS Fluent report' },
                  { icon: Compass, name: 'Wind_Tunnel_Drawing.pdf', desc: 'Tunnel design drawings' },
                ],
                color: 'bg-blue-800',
              },
              {
                title: 'Project 3: Sorting',
                files: [
                  { icon: Code, name: 'Sorting_System_Control.ino', desc: 'Complete Arduino firmware' },
                  { icon: Compass, name: 'Electrical_Wiring_Diagram.pdf', desc: 'Full wiring diagram' },
                  { icon: Compass, name: 'Pneumatic_Circuit_Diagram.pdf', desc: 'P&ID schematic' },
                  { icon: Compass, name: 'Mechanical_Assembly_Drawing.pdf', desc: 'Assembly drawing + BOM' },
                ],
                color: 'bg-emerald-800',
              },
            ].map((project) => (
              <div key={project.title} className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`${project.color} text-white px-5 py-4`}>
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  <p className="text-sm text-white/80 mt-1">{project.files.length} files</p>
                </div>
                <div className="p-4 space-y-3">
                  {project.files.map((file) => (
                    <div key={file.name} className="flex items-start gap-3">
                      <div className="mt-0.5 bg-slate-100 p-1.5 rounded-md">
                        <file.icon className="h-4 w-4 text-slate-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{file.name}</p>
                        <p className="text-xs text-slate-500">{file.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-slate-500 mb-3">
              All files are packaged in the downloads/ directory. Total: 12 files (3 code + 4 drawings + 5 reports/data)
            </p>
            <a
              href="/downloads/README.md"
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium transition-colors"
            >
              <Download className="h-4 w-4" />
              View README for file descriptions
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Dive Deeper?</h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Each project page contains detailed methodology, technical data, analysis results, 
            and key findings that you can discuss in interviews.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/project/double-wishbone-suspension"
              className="inline-flex items-center gap-2 bg-white text-slate-900 px-6 py-3 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
            >
              Explore Project 1
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
