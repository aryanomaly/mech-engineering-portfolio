# FEA Simulation Report — Suspension Upright

**Component:** Steering Upright (Knuckle)  
**Material:** 7075-T6 Aluminum  
**Software:** ANSYS Mechanical 2023 R1  

---

## 1. Summary

Static structural analysis of the suspension upright under combined loading. I also ran topology optimization to cut weight since our FSAE car needed to minimize unsprung mass. The final design passed all checks with a safety factor of 2.8 and came in 312g lighter than the first version.

---

## 2. Material Properties

| Property | Value |
|----------|-------|
| Density | 2810 kg/m³ |
| Young's Modulus | 71.7 GPa |
| Poisson's Ratio | 0.33 |
| Yield Strength | 503 MPa |
| Ultimate Strength | 572 MPa |

Went with 7075-T6 over 6061-T6 because we needed the higher strength-to-weight ratio. 6061 would have worked but the upright would have been heavier for the same safety margin.

---

## 3. Mesh

- **Element type:** 10-node tetrahedral (SOLID187)
- **Global size:** 2mm
- **Refinement:** 0.5mm at fillets and bolt holes
- **Total elements:** ~2.4M
- **Skewness:** < 0.85 for 99.2% of elements

I checked mesh convergence by halving the element size and making sure stress changed by less than 2%. The fine mesh (2.4M elements) was where it stabilized.

---

## 4. Boundary Conditions

**Constraints:**
- Chassis mounts (4 points): Fixed support
- Bearing bore: Cylindrical support (radial fixed, axial free)

**Load Case — Combined Worst Case:**

| Load | Value | Location |
|------|-------|----------|
| Vertical (2g bump) | 6,750 N | Wheel center |
| Lateral (2g cornering) | 4,500 N | Wheel center |
| Braking torque | 840 N·m | Wheel center |
| Longitudinal (3g braking) | 3,200 N | Tire contact patch |

I also ran pure 4g braking and pure 3g cornering separately, but the combined case was the worst.

---

## 5. Results

### Von Mises Stress (Combined Loading)

| Location | Stress (MPa) | Safety Factor | Status |
|----------|-------------|---------------|--------|
| Coilover eye fillet | 312 | 1.61 | OK |
| Lower ball joint boss | 245 | 2.05 | OK |
| Upper ball joint boss | 198 | 2.54 | OK |
| Bearing bore transition | 267 | 1.88 | OK |
| Brake caliper mount | 298 | 1.69 | OK |

### What Changed from V1 to V4

The first design had a 2mm fillet radius at the coilover eye. Stress concentration there was brutal — 487 MPa, safety factor barely above 1.0. I increased the fillet to 5mm and the peak stress dropped to 312 MPa. That's a 35% reduction just from a fillet change. Learned that lesson the hard way.

| Version | Mass | Peak Stress | Min Safety Factor |
|---------|------|-------------|-------------------|
| V1 (solid) | 1,420g | 487 MPa | 1.03 |
| V2 (material swap) | 1,280g | 356 MPa | 1.41 |
| V3 (topology start) | 1,150g | 423 MPa | 1.19 |
| V4 (final) | 1,108g | 312 MPa | 1.61 |

### Topology Optimization

Used SIMP method in ANSYS:
- Objective: minimize mass
- Constraint: Von Mises < 280 MPa (SF >= 1.8)
- Manufacturing: 3-axis CNC, Z-axis draw direction
- Min wall thickness: 3mm
- Symmetry: XZ plane

The software basically removes material from low-stress areas. Started with a solid envelope and iterated down. Converged at iteration 20 with 52% volume fraction remaining.

### Deformation

Max deflection was 0.12mm at the wheel center under combined loading. Negligible for our purposes.

---

## 6. Fatigue Check (Quick)

Ran a preliminary stress-life analysis with Goodman correction for the endurance event. All components showed > 1M cycle life, which covers our 22km endurance race with margin.

---

## 7. What I'd Do Differently

1. The V3 topology result looked cool but had some weird geometries that would have been annoying to machine. I had to manually smooth some surfaces. Next time I'd add more manufacturing constraints earlier.
2. Didn't account for thermal expansion during machining. The part came out slightly undersized after cooling. Was still within tolerance but barely.
3. Should have done modal analysis too — didn't check for natural frequencies. Probably fine given the mass but would have been good practice.
