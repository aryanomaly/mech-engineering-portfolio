# My Engineering Projects

Some projects I worked on during my undergrad in mechanical engineering. Putting them here to keep track of everything and share with anyone who's interested.

The website is live at: **https://aryanomaly.github.io/repo-name** 

---

## Project 1: Double Wishbone Suspension

Designed and analyzed a double wishbone suspension for our college's Formula SAE car. Started with hand calculations, moved to CAD, ran FEA, then actually machined the upright on a HAAS VF-2 in our workshop.

**What I actually did:**
- Modeled the entire assembly in SolidWorks — upper/lower A-arms, knuckle, coilover mount, tie rod ends. Bottom-up approach with proper mates.
- Ran static structural FEA in ANSYS. Worst case was 3g braking + 2g cornering. The initial design had stress concentrations at the coilover eye fillet (2mm radius was too small). Bumped it to 5mm and peak stress dropped by 40%.
- Used topology optimization in ANSYS to cut weight. SIMP method with a 3-axis CNC constraint. Went through about 20 iterations. Final upright weighed 1108g vs 1420g originally — 312g saved.
- Wrote a MATLAB script to simulate suspension kinematics — camber change, toe change, roll center migration through wheel travel. Used vector loop equations with Newton-Raphson iteration. Took me a while to get the solver converging properly.
- Machined the upright on our HAAS VF-2. Roughing with a 6mm end mill at 1200 mm/min, finishing with a 3mm ball end mill at 800 mm/min. Got the bearing bore within ±0.02mm which was good enough for the press-fit.

**Files:**
- `Suspension_Kinematics_Solver.m` — MATLAB kinematics code
- `Suspension_Design_Calculations.xlsx` — All design data, load cases, FEA results, hardpoint coordinates
- `FEA_Report.md` — Full ANSYS report I wrote up after the simulations
- `Upright_Drawing.pdf` — Manufacturing drawing with GD&T

---

## Project 2: NACA 2412 Airfoil — Wind Tunnel & CFD

Built a small wind tunnel test section and tested a NACA 2412 airfoil against CFD simulations I ran in ANSYS Fluent. This was for my aerodynamics course project but I ended up spending way more time on it than required.

**What I actually did:**
- Designed and built the test section (300×300×600 mm) with a 6.25:1 contraction ratio. Used 3rd-order polynomial for the contraction profile. Two layers of aluminum honeycomb flow straighteners + three screens (16, 32, 16 mesh) upstream.
- CNC machined the NACA 2412 model from 6061-T6 aluminum. 150mm chord, 298mm span (wall-to-wall). Drilled 18 pressure tap holes (0.8mm diameter) along the chord — 9 on upper surface, 9 on lower.
- Connected the taps to a 16-channel pressure scanner. Ran tests at angles of attack from -4° to 16°. The stall at 14° was pretty obvious — sudden drop in lift, pressure recovery gone.
- Ran CFD in ANSYS Fluent. Tested k-ε, k-ω, and k-ω SST turbulence models. k-ω SST worked best for this Reynolds number (200,000). The k-ε model overpredicted separation by 2-3°.
- Compared experimental vs CFD results. Lift coefficient matched within 8% across all angles. Pre-stall it was actually under 4% which I was happy with. The disagreement post-stall was expected — massive separation is hard to model.

**Files:**
- `Airfoil_Data_Processing.m` — MATLAB code that reads data and generates all the comparison plots
- `Experimental_Data_and_CFD_Results.xlsx` — Raw pressure data, processed results, CFD setup parameters
- `CFD_Report.md` — Fluent simulation report
- `Wind_Tunnel_Drawing.pdf` — Tunnel design drawings

---

## Project 3: Autonomous Sorting System

Built a conveyor-based sorting system for a mechatronics course. Arduino controlled, pneumatic actuated diverter, color sensor for classification. Actually worked pretty well once I sorted out the timing issues.

**What I actually did:**
- Designed the frame using 2020 aluminum extrusion. Conveyor belt is 150mm wide, 800mm long. Used a NEMA 17 stepper with A4988 driver for the belt.
- Designed the pneumatic circuit from scratch. 5/2 solenoid valve, double-acting cylinder (25mm bore, 50mm stroke), FRL unit, flow control valves on both lines (meter-out configuration). Operating pressure 5 bar. Cylinder extends in about 45ms which was fast enough.
- Wrote the Arduino firmware. TCS3200 color sensor for RGB classification using a simple distance-based approach. TCRT5000 IR sensor for object detection. The tricky part was the timing — getting the diverter to fire exactly when the object reaches it. I used empirically calibrated delays (150ms from IR to color sensor, 200ms from sensor to diverter) with some PID-like compensation for belt speed variation.
- The green blocks gave me trouble initially — accuracy was only ~91% because the fluorescent lights in the lab interfered with the green channel. Fixed it by adding an opaque shroud around the color sensor with a controlled white LED. Brought green accuracy up to 94.5%.
- Added a hardware emergency stop (normally-closed contact, cuts 12V rail immediately), software watchdog timer, and pneumatic pressure interlock. Safety matters.

**Files:**
- `Sorting_System.ino` — Full Arduino code
- `Wiring_Diagram.pdf` — Electrical wiring diagram
- `Pneumatic_Diagram.pdf` — P&ID schematic
- `Assembly_Drawing.pdf` — Mechanical assembly with BOM

---

## Tech Stack for the Website

React + TypeScript + Tailwind CSS. Used Recharts for the data plots. Nothing fancy, just wanted a clean way to present the projects.

To run locally:
```bash
npm install
npm run dev
```

To build:
```bash
npm run build
```

## All Files

```
public/downloads/project1/  — 4 files (MATLAB, Excel, Report, PDF)
public/downloads/project2/  — 4 files (MATLAB, Excel, Report, PDF)
public/downloads/project3/  — 4 files (Arduino, 3 PDFs)
public/images/              — 10 project photos
```
