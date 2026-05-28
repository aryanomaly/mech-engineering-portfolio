import { Link } from 'react-router'
import { ArrowLeft, ArrowRight, Cog, AlertTriangle, CheckCircle, Ruler, Weight, Shield } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts'

const stressData = [
  { component: 'Upright', original: 487, optimized: 312, safety: 2.8 },
  { component: 'Lower A-Arm', original: 356, optimized: 245, safety: 3.1 },
  { component: 'Upper A-Arm', original: 198, optimized: 156, safety: 4.2 },
  { component: 'Knuckle', original: 423, optimized: 298, safety: 2.9 },
  { component: 'Coilover Mt', original: 267, optimized: 198, safety: 3.5 },
]

const weightData = [
  { iteration: 'V1 - Initial', weight: 1420 },
  { iteration: 'V2 - Material', weight: 1280 },
  { iteration: 'V3 - Topology', weight: 1150 },
  { iteration: 'V4 - Final', weight: 1108 },
]

const kinematicsData = [
  { travel: -25, camber: -1.2, toe: 0.05 },
  { travel: -20, camber: -0.8, toe: 0.04 },
  { travel: -15, camber: -0.5, toe: 0.03 },
  { travel: -10, camber: -0.2, toe: 0.02 },
  { travel: -5, camber: 0.0, toe: 0.01 },
  { travel: 0, camber: 0.0, toe: 0.0 },
  { travel: 5, camber: 0.2, toe: -0.01 },
  { travel: 10, camber: 0.5, toe: -0.02 },
  { travel: 15, camber: 0.9, toe: -0.03 },
  { travel: 20, camber: 1.4, toe: -0.04 },
  { travel: 25, camber: 2.0, toe: -0.05 },
]

const gdntTable = [
  { feature: 'Wheel Bearing Bore', nominal: '40.000', tolerance: 'H7 (+0.025/0)', gdnt: 'Position 0.05 @ MMC' },
  { feature: 'Ball Joint Mount', nominal: '16.000', tolerance: 'h6 (0/-0.011)', gdnt: 'Perpendicularity 0.03' },
  { feature: 'Coilover Eye', nominal: '12.000', tolerance: 'H8 (+0.018/0)', gdnt: 'Concentricity 0.04' },
  { feature: 'Brake Caliper Mt', nominal: 'M10x1.5', tolerance: '6H', gdnt: 'Position 0.1 @ MMC' },
]

export default function Project1() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/suspension-cad.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-slate-700 text-slate-200">SolidWorks</Badge>
            <Badge className="bg-slate-700 text-slate-200">ANSYS</Badge>
            <Badge className="bg-slate-700 text-slate-200">MATLAB</Badge>
            <Badge className="bg-slate-700 text-slate-200">CNC</Badge>
            <Badge className="bg-slate-700 text-slate-200">GD&T</Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Double Wishbone Suspension Design & FEA
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl">
            Complete design and structural analysis of a double wishbone suspension system for Formula SAE, 
            including topology optimization, kinematics simulation, and CNC fabrication of the upright.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: Weight, label: 'Weight Reduction', value: '22%' },
            { icon: Shield, label: 'Safety Factor', value: '> 2.5' },
            { icon: Ruler, label: 'Travel Range', value: '±25 mm' },
            { icon: Cog, label: 'Components', value: '15 parts' },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
              <stat.icon className="h-6 w-6 text-slate-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-xs text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Problem Statement */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Problem Statement</h2>
          <div className="bg-slate-50 border-l-4 border-slate-700 p-6 rounded-r-lg">
            <p className="text-slate-700 leading-relaxed">
              Design a complete front double wishbone suspension assembly for a 300 kg Formula SAE electric vehicle 
              that achieves a target roll gradient of 1.5 deg/g, maintains camber gain under 2° over ±25 mm wheel travel, 
              and meets a minimum safety factor of 2.0 under combined 3g braking and 2g cornering loads. 
              The design must be manufacturable using in-house CNC machining and minimize unsprung mass.
            </p>
          </div>
        </section>

        {/* CAD Design */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">CAD Design & Assembly</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <img
                src="/images/suspension-cad.jpg"
                alt="Double Wishbone Suspension CAD Assembly"
                className="w-full rounded-xl shadow-lg mb-4"
              />
              <p className="text-sm text-slate-500 text-center">Figure 1: Complete double wishbone suspension assembly in SolidWorks</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-slate-800">Design Parameters</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { param: 'Vehicle Mass', value: '300 kg' },
                    { param: 'Front Track Width', value: '1200 mm' },
                    { param: 'Wheelbase', value: '1550 mm' },
                    { param: 'CG Height', value: '280 mm' },
                    { param: 'Motion Ratio', value: '0.72:1' },
                    { param: 'Spring Rate', value: '175 N/mm' },
                    { param: 'Damper Ratio', value: '60:40 (Rebound:Comp)' },
                    { param: 'Roll Center Height', value: '45 mm (static)' },
                  ].map((row) => (
                    <TableRow key={row.param}>
                      <TableCell className="font-medium">{row.param}</TableCell>
                      <TableCell>{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <p className="text-sm text-slate-600 leading-relaxed">
                The assembly was modeled using bottom-up design with 15 unique parts and 8 assembly configurations 
                for different suspension travel positions. All parts were designed with manufacturability constraints 
                for 3-axis CNC milling.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* FEA Analysis */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">FEA Structural Analysis</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <img
                src="/images/suspension-fea-stress.jpg"
                alt="FEA Von Mises Stress Contour"
                className="w-full rounded-xl shadow-lg mb-4"
              />
              <p className="text-sm text-slate-500 text-center">Figure 2: Von Mises stress distribution under 3g braking + 2g cornering</p>
            </div>
            <div>
              <img
                src="/images/suspension-fea-mesh.jpg"
                alt="FEA Mesh Detail"
                className="w-full rounded-xl shadow-lg mb-4"
              />
              <p className="text-sm text-slate-500 text-center">Figure 3: Tetrahedral mesh with refinement at stress concentrations</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">FEA Setup Details</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Mesh Configuration</h4>
                <ul className="space-y-1 text-slate-600">
                  <li>Element Type: 10-node Tetrahedral</li>
                  <li>Element Size: 2 mm (global)</li>
                  <li>Refinement: 0.5 mm at fillets</li>
                  <li>Total Elements: ~2.4M</li>
                  <li>Skewness: &lt; 0.85 (99.2%)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Material Properties</h4>
                <ul className="space-y-1 text-slate-600">
                  <li>Material: 7075-T6 Aluminum</li>
                  <li>Young's Modulus: 71.7 GPa</li>
                  <li>Yield Strength: 503 MPa</li>
                  <li>Ultimate Strength: 572 MPa</li>
                  <li>Density: 2810 kg/m³</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-2">Boundary Conditions</h4>
                <ul className="space-y-1 text-slate-600">
                  <li>Chassis mounts: Fixed support</li>
                  <li>Wheel center: Remote force</li>
                  <li>Brake torque: 840 N·m</li>
                  <li>Lateral load: 4,500 N</li>
                  <li>Vertical load: 6,750 N</li>
                </ul>
              </div>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-800 mb-4">Stress Results: Before vs After Optimization</h3>
          <div className="h-80 w-full mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stressData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="component" />
                <YAxis label={{ value: 'Stress (MPa)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="original" name="Original (MPa)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="optimized" name="Optimized (MPa)" fill="#475569" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-slate-500 text-center mb-8">Figure 4: Peak Von Mises stress comparison before and after topology optimization</p>
        </section>

        <Separator className="my-12" />

        {/* Topology Optimization & Weight */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Topology Optimization</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Optimization Strategy</h3>
              <div className="space-y-3 text-slate-700">
                <p>
                  <strong>Objective:</strong> Minimize mass with a stress constraint of 280 MPa (safety factor ≥ 1.8 
                  relative to yield).
                </p>
                <p>
                  <strong>Manufacturing Constraint:</strong> 3-axis CNC milling with minimum wall thickness of 3 mm 
                  and draw direction along Z-axis.
                </p>
                <p>
                  <strong>Symmetry:</strong> Enforced planar symmetry about the XZ plane for balanced loading.
                </p>
                <p>
                  <strong>Iteration Process:</strong> Started with a solid envelope and progressively removed material 
                  using the SIMP (Solid Isotropic Material with Penalization) method with a penalization factor of 3.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Weight Reduction Progress</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weightData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="iteration" />
                    <YAxis label={{ value: 'Mass (g)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="weight" name="Mass (g)" stroke="#475569" strokeWidth={3} dot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-emerald-800">Result: 22% Weight Reduction Achieved</p>
              <p className="text-sm text-emerald-700 mt-1">
                Final upright mass reduced from 1,420g to 1,108g while maintaining all structural requirements. 
                The optimized design passed validation with a minimum safety factor of 2.8 under worst-case loading.
              </p>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Kinematics */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Suspension Kinematics (MATLAB)</h2>
          
          <div className="mb-6">
            <p className="text-slate-700 mb-4">
              A 3D kinematic model was developed in MATLAB using the suspension hardpoints extracted from SolidWorks. 
              The model computes camber angle, toe angle, caster angle, and roll center position as functions of 
              wheel travel using vector loop equations and iterative Newton-Raphson solvers.
            </p>
          </div>

          <h3 className="text-lg font-semibold text-slate-800 mb-4">Camber & Toe vs Wheel Travel</h3>
          <div className="h-80 w-full mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={kinematicsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="travel" label={{ value: 'Wheel Travel (mm)', position: 'insideBottom', offset: -5 }} />
                <YAxis label={{ value: 'Angle (deg)', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="camber" name="Camber (deg)" stroke="#dc2626" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="toe" name="Toe (deg)" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-slate-500 text-center mb-8">Figure 5: Camber and toe angle variation through ±25 mm wheel travel</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-lg p-5">
              <h4 className="font-semibold text-slate-800 mb-3">Key Kinematic Targets</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Achieved</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { param: 'Camber Gain', target: '< 2.0°', achieved: '1.8°' },
                    { param: 'Toe Change', target: '< 0.1°', achieved: '0.05°' },
                    { param: 'Roll Center Migration', target: '< 30 mm', achieved: '22 mm' },
                    { param: 'Caster Change', target: '< 0.5°', achieved: '0.3°' },
                    { param: 'Anti-Dive (%)', target: '15-25%', achieved: '18%' },
                  ].map((row) => (
                    <TableRow key={row.param}>
                      <TableCell className="font-medium">{row.param}</TableCell>
                      <TableCell>{row.target}</TableCell>
                      <TableCell className="text-emerald-700 font-medium">{row.achieved}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="bg-slate-50 rounded-lg p-5">
              <h4 className="font-semibold text-slate-800 mb-3">Hardpoint Coordinates (mm)</h4>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Point</TableHead>
                    <TableHead>X</TableHead>
                    <TableHead>Y</TableHead>
                    <TableHead>Z</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { point: 'WC', x: 0, y: 305, z: 228 },
                    { point: 'UOB', x: -35, y: 210, z: 295 },
                    { point: 'LOB (F)', x: 120, y: 245, z: 95 },
                    { point: 'LOB (R)', x: -120, y: 245, z: 95 },
                    { point: 'TR', x: 15, y: 290, z: 195 },
                  ].map((row) => (
                    <TableRow key={row.point}>
                      <TableCell className="font-medium">{row.point}</TableCell>
                      <TableCell>{row.x}</TableCell>
                      <TableCell>{row.y}</TableCell>
                      <TableCell>{row.z}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Manufacturing */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Manufacturing & GD&T</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <img
                src="/images/suspension-fabricated.jpg"
                alt="CNC Machined Upright Component"
                className="w-full rounded-xl shadow-lg mb-4"
              />
              <p className="text-sm text-slate-500 text-center">Figure 6: CNC machined 7075-T6 aluminum upright</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">GD&T Specifications</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    <TableHead>Nominal</TableHead>
                    <TableHead>Tolerance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {gdntTable.map((row) => (
                    <TableRow key={row.feature}>
                      <TableCell className="font-medium text-sm">{row.feature}</TableCell>
                      <TableCell className="text-sm">{row.nominal}</TableCell>
                      <TableCell className="text-xs">{row.gdnt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6 space-y-3 text-sm text-slate-700">
                <p>
                  <strong>CNC Process:</strong> 3-axis machining on HAAS VF-2 with 6,000 RPM spindle. 
                  Roughing with 6 mm end mill at 1,200 mm/min, finishing with 3 mm ball end mill at 800 mm/min.
                </p>
                <p>
                  <strong>Post-Processing:</strong> Deburring, surface passivation, and dry film lubricant 
                  coating on bearing bores for press-fit assembly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Key Findings */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Key Findings & Conclusions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-emerald-800">Topology Optimization Success</p>
                <p className="text-sm text-emerald-700 mt-1">
                  Achieved 22% mass reduction (312g saved) with safety factor improving from 2.1 to 2.8 
                  due to better load path distribution.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-emerald-800">Kinematic Targets Met</p>
                <p className="text-sm text-emerald-700 mt-1">
                  All 5 kinematic parameters met or exceeded targets. Camber gain of 1.8° provides 
                  excellent tire contact patch maintenance through bump travel.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-amber-800">Design Iteration Learning</p>
                <p className="text-sm text-amber-700 mt-1">
                  Initial stress concentration at the coilover eye fillet (radius 2 mm) caused localized 
                  yielding. Increasing fillet radius to 5 mm reduced peak stress by 40%.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-blue-800">Manufacturing Validated</p>
                <p className="text-sm text-blue-700 mt-1">
                  CNC machined upright achieved ±0.02 mm dimensional accuracy on bearing bores, 
                  confirming GD&T specifications were practical for 3-axis machining.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Interview Talking Points */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Interview Talking Points</h2>
          <div className="bg-slate-50 rounded-xl p-6 space-y-4">
            {[
              'Explain why 7075-T6 was chosen over 6061-T6 for this application (strength-to-weight ratio and fatigue considerations)',
              'Describe your FEA mesh convergence strategy: how did you determine 2 mm global size with 0.5 mm refinement was sufficient?',
              'Discuss the trade-off between camber gain and packaging constraints — why was 1.8° chosen over a more aggressive 2.5°?',
              'How did you validate that the topology-optimized geometry was manufacturable on a 3-axis CNC?',
              'What would change in your design if the vehicle mass increased to 400 kg or the CG height rose to 320 mm?',
            ].map((point, i) => (
              <div key={i} className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-700 text-white text-xs flex items-center justify-center font-bold mt-0.5">
                  {i + 1}
                </span>
                <p className="text-slate-700">{point}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div className="flex justify-between items-center border-t pt-8">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <Link
            to="/project/naca-airfoil-cfd"
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
          >
            Next: Aerodynamics Project
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
