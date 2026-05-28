# CFD Report — NACA 2412 Airfoil

**Airfoil:** NACA 2412  
**Reynolds Number:** 200,000  
**Software:** ANSYS Fluent 2023 R1  

---

## 1. What This Is

I built a small wind tunnel for my aerodynamics project, tested a NACA 2412 airfoil in it, and ran CFD simulations to compare. The goal was to see how well Fluent could predict the experimental results. Spoiler: pretty well for pre-stall, not great post-stall.

---

## 2. Wind Tunnel

Test section is 300×300×600 mm. I used a 6.25:1 contraction ratio with a 3rd-order polynomial profile. Two layers of aluminum honeycomb (6mm cells, L/D=8) plus three screens (16, 32, 16 mesh) upstream to straighten the flow. Measured turbulence intensity at <0.5% which is decent for a student-built tunnel.

The NACA 2412 model is CNC machined from 6061-T6 aluminum. 150mm chord, wall-to-wall span (298mm). I drilled 18 pressure taps (0.8mm diameter) along the chord — 9 upper, 9 lower. Connecting to a pressure scanner was a pain, had to use very thin tubing to avoid damping the signal.

---

## 3. CFD Setup

**Solver:** Pressure-based, steady state, incompressible  
**Fluid:** Air at 20°C, ρ = 1.225 kg/m³

### Turbulence Models Tested

I tried three models at α=10° to see which worked best:

| Model | CL | CD | Stall Prediction |
|-------|-----|-----|-----------------|
| k-ε Standard | 1.30 | 0.091 | 16° (overpredicted) |
| k-ω Standard | 1.26 | 0.078 | 13° |
| **k-ω SST** | **1.28** | **0.080** | **14°** |

k-ω SST won. It handles adverse pressure gradients better which matters for stall prediction. The k-ε model completely missed the stall angle by 2 degrees. For low-Re airfoil flows (Re=200,000), k-ω SST is the way to go — it's well documented in literature too.

### Mesh

Used a hybrid mesh: structured O-grid around the airfoil, unstructured everywhere else.

- Total elements: ~285,000 (2D)
- y+ < 1 (wall resolved, 25 inflation layers, growth rate 1.15)
- First cell height: 0.015mm
- Refined at leading edge (0.01mm) and trailing edge (0.005mm)
- Wake region extended 20 chords downstream

I did a mesh independence study. At 285K elements the CL changed by <1% compared to 520K, so I stuck with the coarser mesh to save computation time. Each case took about 45 minutes on my laptop.

### Boundary Conditions

| Boundary | Type | Setting |
|----------|------|---------|
| Inlet | Velocity inlet | 19.6 m/s, Tu=0.5% |
| Outlet | Pressure outlet | Gauge P = 0 |
| Airfoil | No-slip wall | Adiabatic |
| Top/Bottom | Symmetry | — |

Domain was 50c × 50c. C-grid shape. Maybe overkill but I didn't want far-field boundaries messing with the results.

---

## 4. Results

### Pressure Coefficient at α = 10°

The suction peak on the upper surface matched well — experiment showed Cp ≈ -0.82 at x/c ≈ 0.05, CFD predicted -0.85. The pressure recovery toward the trailing edge was also similar, which tells me the boundary layer modeling is reasonable at this angle.

Some discrepancy in the aft portion of the upper surface (3-5%). I think this is from:
1. Surface roughness on the physical model (Ra ≈ 1.6μm) vs perfectly smooth CFD
2. My angle of attack setup has about ±0.2° tolerance
3. Some wall interference I didn't fully correct for

### Lift Coefficient vs Angle of Attack

| α (deg) | CL (exp) | CL (CFD) | Error |
|---------|----------|----------|-------|
| 0 | 0.22 | 0.24 | 9.1% |
| 4 | 0.68 | 0.70 | 2.9% |
| 8 | 1.08 | 1.12 | 3.7% |
| 10 | 1.24 | 1.28 | 3.2% |
| 12 | 1.35 | 1.38 | 2.2% |
| 14 | 1.32 | 1.35 | 2.3% |
| 16 | 1.18 | 1.22 | 3.4% |

Pre-stall mean error is about 3.4%. Post-stall it gets worse because massive separation is genuinely hard to model. The hysteresis loop in the experiment (different CL going up vs down in angle) wasn't captured at all in the steady-state simulation.

### Drag Coefficient

Pre-stall CD errors are around 5-6%. Post-stall it blows up to ~15% which is expected. The k-ω SST does a decent job with the attached boundary layer but struggles once the flow separates completely.

### 3D Effects

I also ran a 3D simulation with tunnel walls included. The walls knocked about 3% off the lift coefficient at high angles due to blockage. Our test section is a bit small (blockage ratio σ = 4.2%) so there's definitely some interference. I applied the Maskell correction to the experimental data but it's not perfect.

---

## 5. What I Learned

1. **y+ matters a lot.** I initially had y+ ≈ 5 and the results were way off. Once I refined to y+ < 1 everything snapped into place. Wall resolution is non-negotiable for airfoil flows.

2. **Don't trust one turbulence model.** I almost went with k-ε because it's the default, but testing all three saved me from bad results. Always benchmark.

3. **Experimental setup is half the battle.** Getting the pressure taps sealed properly, calibrating the scanner, accounting for temperature drift — this took more time than the CFD. Good experimental data is harder to get than good simulation data.

4. **Stall is hard.** Both experimentally and computationally. The unsteady vortex shedding at stall made the pressure readings fluctuate like crazy. I'd need transient simulation to capture that properly, which is beyond what I had time for.

---

## Files

| File | Description |
|------|-------------|
| `Airfoil_Data_Processing.m` | MATLAB script — reads data, generates all comparison plots |
| `Experimental_Data_and_CFD_Results.xlsx` | All the raw and processed data |
| `Wind_Tunnel_Drawing.pdf` | Tunnel design drawings I made |
