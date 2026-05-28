import { Link } from 'react-router'
import { ArrowLeft, ArrowRight, Cpu, CheckCircle, AlertTriangle, Zap, Settings } from 'lucide-react'
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
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const accuracyData = [
  { run: '1', red: 96, green: 94, blue: 98 },
  { run: '2', red: 94, green: 96, blue: 95 },
  { run: '3', red: 98, green: 92, blue: 97 },
  { run: '4', red: 95, green: 98, blue: 94 },
  { run: '5', red: 97, green: 95, blue: 96 },
  { run: '6', red: 96, green: 97, blue: 98 },
  { run: '7', red: 95, green: 94, blue: 97 },
  { run: '8', red: 97, green: 96, blue: 95 },
  { run: '9', red: 98, green: 95, blue: 96 },
  { run: '10', red: 94, green: 98, blue: 97 },
]

const throughputData = [
  { speed: 15, accuracy: 99.2 },
  { speed: 20, accuracy: 98.5 },
  { speed: 25, accuracy: 97.1 },
  { speed: 30, accuracy: 95.4 },
  { speed: 35, accuracy: 91.8 },
  { speed: 40, accuracy: 86.3 },
]

const sortingDist = [
  { name: 'Red', value: 42, color: '#dc2626' },
  { name: 'Green', value: 35, color: '#16a34a' },
  { name: 'Blue', value: 38, color: '#2563eb' },
]

const systemSpecs = [
  { param: 'Conveyor Speed', value: '0.15 - 0.35 m/s (variable)' },
  { param: 'Belt Width', value: '150 mm' },
  { param: 'Conveyor Length', value: '800 mm' },
  { param: 'Motor', value: 'NEMA 17 Stepper, 1.8°/step' },
  { param: 'Motor Driver', value: 'A4988, 16x microstepping' },
  { param: 'Frame Material', value: '2020 Aluminum Extrusion (T-slot)' },
  { param: 'Power Supply', value: '12V DC, 10A SMPS' },
  { param: 'Total System Weight', value: '8.5 kg' },
]

const pneumaticSpecs = [
  { param: 'Cylinder Bore', value: '25 mm' },
  { param: 'Cylinder Stroke', value: '50 mm' },
  { param: 'Operating Pressure', value: '4 - 6 bar' },
  { param: 'Valve Type', value: '5/2 Solenoid (24V DC)' },
  { param: 'Actuation Time', value: '~45 ms' },
  { param: 'Force @ 5 bar', value: '245 N (extension)' },
  { param: 'Air Consumption', value: '~0.15 L/cycle' },
  { param: 'FRL Unit', value: 'Filter + Regulator + Lubricator' },
]

const sensorSpecs = [
  { param: 'Color Sensor', value: 'TCS3200 (Taos/Texas Advanced Optoelectronic)' },
  { param: 'Detection Method', value: 'RGB frequency output' },
  { param: 'Response Time', value: '~10 ms per reading' },
  { param: 'Sampling', value: '5 readings averaged per object' },
  { param: 'Detection Distance', value: '3 - 10 mm (adjustable)' },
  { param: 'IR Proximity', value: 'TCRT5000 (presence detection)' },
  { param: 'Illumination', value: 'Controlled white LED array' },
  { param: 'Calibration', value: 'White balance before each run' },
]

export default function Project3() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="/images/sorting-system.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/90 to-slate-900" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge className="bg-slate-700 text-slate-200">Arduino</Badge>
            <Badge className="bg-slate-700 text-slate-200">Pneumatics</Badge>
            <Badge className="bg-slate-700 text-slate-200">Sensor Fusion</Badge>
            <Badge className="bg-slate-700 text-slate-200">CAD</Badge>
            <Badge className="bg-slate-700 text-slate-200">HMI</Badge>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Autonomous Material Sorting System
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl">
            A conveyor-based mechatronics system that classifies objects by color using sensor fusion and sorts them 
            with a pneumatic actuated diverter, featuring Arduino control and real-time HMI monitoring.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: Zap, label: 'Sorting Accuracy', value: '95.4%' },
            { icon: Settings, label: 'Throughput', value: '30/min' },
            { icon: Cpu, label: 'Actuation Time', value: '45 ms' },
            { icon: CheckCircle, label: 'Categories', value: '3 colors' },
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
          <div className="bg-slate-50 border-l-4 border-emerald-700 p-6 rounded-r-lg">
            <p className="text-slate-700 leading-relaxed">
              Design and build a fully automated material sorting system capable of classifying colored plastic 
              blocks (red, green, blue) on a moving conveyor belt and diverting them into corresponding collection 
              bins. The system must achieve ≥ 95% classification accuracy at a minimum throughput of 25 objects 
              per minute, with a pneumatic actuation response time under 60 ms. The controller must log sorting 
              statistics to an HMI display and include emergency stop functionality for safe operation.
            </p>
          </div>
        </section>

        {/* System Overview */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">System Architecture</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <img
                src="/images/sorting-system.jpg"
                alt="Complete Sorting System"
                className="w-full rounded-xl shadow-lg mb-4"
              />
              <p className="text-sm text-slate-500 text-center">Figure 1: Complete integrated sorting system with conveyor, sensors, and collection bins</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">System Specifications</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {systemSpecs.map((row) => (
                    <TableRow key={row.param}>
                      <TableCell className="font-medium text-sm">{row.param}</TableCell>
                      <TableCell className="text-sm">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Block Diagram */}
          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Control System Block Diagram</h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
              <div className="bg-white border-2 border-slate-300 rounded-lg px-4 py-3 text-center w-full md:w-auto">
                <div className="font-semibold text-slate-800">IR Proximity Sensor</div>
                <div className="text-slate-500 text-xs mt-1">Object Detection</div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 hidden md:block" />
              <div className="bg-white border-2 border-slate-300 rounded-lg px-4 py-3 text-center w-full md:w-auto">
                <div className="font-semibold text-slate-800">TCS3200 Color Sensor</div>
                <div className="text-slate-500 text-xs mt-1">RGB Classification</div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 hidden md:block" />
              <div className="bg-emerald-100 border-2 border-emerald-400 rounded-lg px-4 py-3 text-center w-full md:w-auto">
                <div className="font-semibold text-emerald-800">Arduino Mega 2560</div>
                <div className="text-emerald-600 text-xs mt-1">Processing & Control</div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 hidden md:block" />
              <div className="bg-white border-2 border-slate-300 rounded-lg px-4 py-3 text-center w-full md:w-auto">
                <div className="font-semibold text-slate-800">5/2 Solenoid Valve</div>
                <div className="text-slate-500 text-xs mt-1">Pneumatic Actuation</div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-400 hidden md:block" />
              <div className="bg-white border-2 border-slate-300 rounded-lg px-4 py-3 text-center w-full md:w-auto">
                <div className="font-semibold text-slate-800">Pneumatic Cylinder</div>
                <div className="text-slate-500 text-xs mt-1">Diverter Mechanism</div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg px-4 py-2 text-center">
                <div className="font-semibold text-blue-800 text-sm">LCD HMI Display + Relay Module + Emergency Stop</div>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Mechanical Design */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Mechanical Design</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <img
                src="/images/sorting-pneumatic.jpg"
                alt="Pneumatic Actuator System"
                className="w-full rounded-xl shadow-lg mb-4"
              />
              <p className="text-sm text-slate-500 text-center">Figure 2: Pneumatic cylinder with FRL unit and 5/2 solenoid valve</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Pneumatic Subsystem</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pneumaticSpecs.map((row) => (
                    <TableRow key={row.param}>
                      <TableCell className="font-medium text-sm">{row.param}</TableCell>
                      <TableCell className="text-sm">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <div className="mt-6 space-y-3 text-sm text-slate-700">
                <p>
                  <strong>Diverter Design:</strong> A 3D-printed ABS paddle (15 mm thick) is mounted to the 
                  cylinder rod end using a threaded coupling. The paddle profile was optimized in SolidWorks 
                  to provide smooth block deflection without jamming.
                </p>
                <p>
                  <strong>Timing Calculation:</strong> At 30 parts/minute with 150 mm object spacing, each 
                  object passes the sensor for 300 ms. With 45 ms actuation + 100 ms dwell, the system has 
                  a timing margin of 155 ms — sufficient for reliable operation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Electronics & Control */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Electronics & Control System</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <img
                src="/images/sorting-electronics.jpg"
                alt="Arduino Control Panel"
                className="w-full rounded-xl shadow-lg mb-4"
              />
              <p className="text-sm text-slate-500 text-center">Figure 3: Arduino Mega control board with relay module, LCD, and sensor interface</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-4">Sensor Specifications</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Parameter</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sensorSpecs.map((row) => (
                    <TableRow key={row.param}>
                      <TableCell className="font-medium text-sm">{row.param}</TableCell>
                      <TableCell className="text-sm">{row.value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Control Logic */}
          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Control Algorithm</h3>
            <div className="space-y-4 text-sm">
              <div className="bg-white border border-slate-200 rounded-lg p-4 font-mono text-xs leading-relaxed">
                <div className="text-slate-500">// Arduino Control Loop - Pseudocode</div>
                <div className="text-purple-700">void <span className="text-blue-700">loop</span>() {'{'}</div>
                <div className="ml-4">
                  <div><span className="text-purple-700">if</span> (irSensor.detected()) {'{'}</div>
                  <div className="ml-4">
                    <div>delay(<span className="text-orange-700">TRANSPORT_DELAY</span>); <span className="text-slate-500">// 150ms to color sensor</span></div>
                    <div>color = tcs3200.readRGB();</div>
                    <div>classification = classifyColor(color);</div>
                    <div>logToHMI(classification);</div>
                    <div><span className="text-purple-700">if</span> (classification != CURRENT_BIN) {'{'}</div>
                    <div className="ml-4">
                      <div>solenoid.trigger();</div>
                      <div>delay(<span className="text-orange-700">ACTUATION_DWELL</span>); <span className="text-slate-500">// 100ms</span></div>
                      <div>solenoid.release();</div>
                    </div>
                    <div>{'}'}</div>
                    <div>updateStatistics(classification);</div>
                  </div>
                  <div>{'}'}</div>
                </div>
                <div>{'}'}</div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">Color Classification</h4>
                  <p className="text-slate-600">
                    Uses a k-nearest neighbors approach with Euclidean distance in RGB space. 
                    5 readings are averaged with outlier rejection (values outside 1.5 std dev discarded). 
                    A calibration white-balance step is performed at startup.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">Timing Control</h4>
                  <p className="text-slate-600">
                    The transport delay from IR sensor to color sensor (150 ms) and from color sensor 
                    to diverter (200 ms) are empirically calibrated. A PID-like compensation adjusts 
                    for belt speed variations measured via encoder feedback.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-800 mb-2">Safety Systems</h4>
                  <p className="text-slate-600">
                    Hardware emergency stop (NC contact, immediately cuts 12V rail), software watchdog 
                    timer (resets if loop cycle {'>'} 500 ms), and pneumatic pressure interlock (operation 
                    inhibited below 3.5 bar).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* Results */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Results & Performance</h2>

          {/* Accuracy per Run */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Sorting Accuracy per Test Run (10 runs, 30 objects each)</h3>
            <div className="h-80 w-full mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={accuracyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="run" label={{ value: 'Test Run', position: 'insideBottom', offset: -5 }} />
                  <YAxis domain={[85, 100]} label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="red" name="Red" fill="#dc2626" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="green" name="Green" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="blue" name="Blue" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-slate-500 text-center mb-6">Figure 4: Classification accuracy by color across 10 test runs at 30 parts/min</p>

            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-emerald-800">Target Exceeded</p>
                <p className="text-sm text-emerald-700 mt-1">
                  Mean accuracy of 95.4% across all colors at 30 parts/minute, exceeding the 95% target. 
                  Red blocks showed highest accuracy (96.2%) while green had the lowest (94.5%) due to 
                  ambient fluorescent lighting interference in the green spectrum.
                </p>
              </div>
            </div>
          </div>

          {/* Throughput vs Accuracy */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Throughput vs Accuracy Trade-off</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={throughputData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="speed" label={{ value: 'Speed (parts/min)', position: 'insideBottom', offset: -5 }} />
                    <YAxis domain={[80, 100]} label={{ value: 'Accuracy (%)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="accuracy" name="Accuracy (%)" stroke="#475569" strokeWidth={3} dot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col justify-center">
                <h4 className="font-semibold text-slate-800 mb-3">Operating Envelope</h4>
                <p className="text-sm text-slate-700 mb-4">
                  The system maintains {'>'} 95% accuracy up to 30 parts/minute. Beyond this, accuracy 
                  drops due to insufficient time for color sensor integration and pneumatic actuation. 
                  The recommended operating point is 25-30 parts/minute for optimal accuracy-throughput balance.
                </p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Speed (ppm)</TableHead>
                      <TableHead>Accuracy</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      { speed: '15', acc: '99.2%', status: 'Optimal accuracy' },
                      { speed: '25', acc: '97.1%', status: 'Recommended' },
                      { speed: '30', acc: '95.4%', status: 'Target met' },
                      { speed: '35', acc: '91.8%', status: 'Below target' },
                    ].map((row) => (
                      <TableRow key={row.speed}>
                        <TableCell className="font-medium">{row.speed}</TableCell>
                        <TableCell>{row.acc}</TableCell>
                        <TableCell className="text-sm">{row.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Distribution */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Sorted Object Distribution (300 objects)</h3>
            <div className="flex justify-center">
              <div className="h-64 w-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sortingDist}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {sortingDist.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        {/* P&ID and Documentation */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Documentation</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 rounded-lg p-5">
              <h4 className="font-semibold text-slate-800 mb-3">Pneumatic Circuit (P&ID)</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><strong>Air Supply:</strong> Compressor → Shut-off valve → FRL unit</li>
                <li><strong>Distribution:</strong> Manifold → 5/2 Solenoid valve (24V DC coil)</li>
                <li><strong>Actuation:</strong> Double-acting cylinder (Port A: extend, Port B: retract)</li>
                <li><strong>Exhaust:</strong> Mufflers on both pilot exhaust ports</li>
                <li><strong>Safety:</strong> Pressure switch (3.5 bar cutoff) + Emergency vent valve</li>
              </ul>
            </div>
            <div className="bg-slate-50 rounded-lg p-5">
              <h4 className="font-semibold text-slate-800 mb-3">Electrical Wiring Diagram</h4>
              <ul className="space-y-2 text-sm text-slate-700">
                <li><strong>Power:</strong> 12V SMPS → Arduino Vin + Relay module power</li>
                <li><strong>Inputs:</strong> IR sensor (D2), TCS3200 (D3-D7, interrupt)</li>
                <li><strong>Outputs:</strong> Relay module (D8) → Solenoid valve coil</li>
                <li><strong>HMI:</strong> I2C LCD 16×2 (SDA → A4, SCL → A5)</li>
                <li><strong>Safety:</strong> E-stop (D10, INPUT_PULLUP), pressure switch (D11)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Findings */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">Key Findings & Conclusions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-emerald-800">Accuracy Target Exceeded</p>
                <p className="text-sm text-emerald-700 mt-1">
                  95.4% mean accuracy at 30 parts/minute with individual color accuracy ranging from 
                  94.5% (green) to 96.2% (red). Adding a light shield improved green accuracy by 2.3%.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-emerald-800">Pneumatic Response Verified</p>
                <p className="text-sm text-emerald-700 mt-1">
                  Measured actuation time of 45 ms at 5 bar, well within the 60 ms requirement. 
                  The 25 mm bore cylinder provided sufficient force (245 N) to reliably divert all block types.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-amber-800">Lighting Sensitivity Identified</p>
                <p className="text-sm text-amber-700 mt-1">
                  Green classification accuracy dropped 4% under variable ambient lighting. 
                  Solution: Added an opaque shroud around the color sensor with controlled white LED illumination.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-blue-800">System Integration Successful</p>
                <p className="text-sm text-blue-700 mt-1">
                  Full mechatronics integration validated — mechanical, pneumatic, electronic, and software 
                  subsystems operated without failure over 8+ hours of continuous testing (14,400+ objects sorted).
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
              'How did you handle sensor noise and signal debouncing in your Arduino code? What filtering techniques did you use?',
              'Walk me through your pneumatic circuit design — why did you choose a 5/2 valve over a 3/2 valve for this application?',
              'Explain the timing calculation: how did you determine the transport delay and ensure the diverter fires at the right moment?',
              'What safety considerations did you implement, and how would you modify the system for an industrial environment?',
              'If you were to replace the color sensor with a camera-based vision system, what would be the key design changes?',
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
          <Link
            to="/project/naca-airfoil-cfd"
            className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Previous: Aerodynamics
          </Link>
          <Link to="/" className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-slate-800 transition-colors">
            Back to Home
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
