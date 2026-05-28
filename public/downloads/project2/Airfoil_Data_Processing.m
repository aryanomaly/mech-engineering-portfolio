% NACA 2412 AIRFOIL — EXPERIMENTAL vs CFD DATA PROCESSING
% 
% I wrote this to process the wind tunnel data and compare it with my
% ANSYS Fluent results. Reads pressure tap readings, computes Cp, CL, CD,
% and generates the comparison plots for my report.
% 
% The experimental data was collected using a 16-channel pressure scanner
% connected to 18 pressure taps on the airfoil surface.

clc; clear; close all;

%% CONSTANTS
c = 0.150;          % Chord (m)
V_inf = 19.6;       % Freestream velocity (m/s)
rho = 1.225;        % Air density (kg/m^3)
q_inf = 0.5 * rho * V_inf^2;  % Dynamic pressure (Pa)

fprintf('NACA 2412 Analysis\n');
fprintf('Re = %.0f\n', rho*V_inf*c/1.81e-5);
fprintf('q_inf = %.1f Pa\n\n', q_inf);

%% PRESSURE TAP LOCATIONS (x/c)
% 18 taps: 9 upper surface, 9 lower surface
tap_x = [0, 0.025, 0.05, 0.075, 0.10, 0.15, 0.20, 0.30, 0.40, ...
         0.50, 0.60, 0.70, 0.80, 0.90, 0.95, 0.975, 1.0];

%% EXPERIMENTAL DATA: Cp at alpha = 10 deg
% These are the pressure readings I got from the wind tunnel
% Negative = suction, Positive = pressure

% Upper surface (leading edge to trailing edge)
Cp_exp_upper = [-0.05, -0.78, -0.82, -0.80, -0.70, -0.52, -0.38, ...
                -0.22, -0.12, -0.06];

% Lower surface
Cp_exp_lower = [0.12, 0.62, 0.68, 0.62, 0.52, 0.38, 0.25, ...
                0.12, 0.05, 0.01, -0.01, -0.02, -0.02, -0.01, ...
                0, 0, 0];

%% CFD DATA: Cp at alpha = 10 deg (from Fluent)
% I exported these from the ANSYS Fluent surface monitor
Cp_cfd_upper = [-0.05, -0.82, -0.85, -0.80, -0.70, -0.58, -0.45, ...
                -0.25, -0.15, -0.10];
Cp_cfd_lower = [0.15, 0.65, 0.70, 0.65, 0.55, 0.40, 0.28, ...
                0.15, 0.08, 0.03, 0, -0.02, -0.03, -0.02, ...
                0, 0, 0];

%% LIFT AND DRAG vs ANGLE OF ATTACK
% Experimental data from force balance
alpha = [-4, -2, 0, 2, 4, 6, 8, 10, 12, 14, 16];
CL_exp = [-0.18, -0.05, 0.22, 0.45, 0.68, 0.89, 1.08, 1.24, 1.35, 1.32, 1.18];
CD_exp = [0.032, 0.035, 0.038, 0.042, 0.048, 0.058, 0.068, 0.085, 0.112, 0.158, 0.205];

% CFD results (Fluent force report)
CL_cfd = [-0.16, -0.04, 0.24, 0.47, 0.70, 0.92, 1.12, 1.28, 1.38, 1.35, 1.22];
CD_cfd = [0.029, 0.032, 0.035, 0.039, 0.045, 0.054, 0.064, 0.080, 0.105, 0.148, 0.192];

%% PLOT 1: Cp Distribution at alpha = 10 deg
figure('Name', 'Pressure Coefficient', 'Position', [100 100 900 600]);

upper_x = tap_x(1:10);
lower_x = tap_x(8:end);

plot(upper_x, Cp_exp_upper, 'bs-', 'LineWidth', 2, 'MarkerSize', 8, ...
     'MarkerFaceColor', 'b', 'DisplayName', 'Exp (Upper)'); hold on;
plot(upper_x, Cp_cfd_upper, 'ro--', 'LineWidth', 2, 'MarkerSize', 8, ...
     'MarkerFaceColor', 'r', 'DisplayName', 'CFD (Upper)');
plot(lower_x, Cp_exp_lower(1:end-7), 'b^-', 'LineWidth', 2, 'MarkerSize', 8, ...
     'MarkerFaceColor', [0.7 0.7 1], 'DisplayName', 'Exp (Lower)');
plot(lower_x, Cp_cfd_lower(1:end-7), 'rs--', 'LineWidth', 2, 'MarkerSize', 8, ...
     'MarkerFaceColor', [1 0.7 0.7], 'DisplayName', 'CFD (Lower)');

% Sketch airfoil at bottom
af_x = linspace(0, 1, 100);
theta = acos(1 - 2*af_x);
yt = 5*0.12*(0.2969*sqrt(af_x) - 0.1260*af_x - 0.3516*af_x.^2 + ...
     0.2843*af_x.^3 - 0.1015*af_x.^4);
plot(af_x, -0.05 + yt*0.06, 'k-', 'LineWidth', 1.5, 'HandleDisplay', 'off');
plot(af_x, -0.05 - yt*0.06, 'k-', 'LineWidth', 1.5, 'HandleDisplay', 'off');

xlabel('x/c'); ylabel('C_p');
title('NACA 2412 C_p Distribution at \alpha = 10\circ');
legend('Location', 'best'); grid on;
set(gca, 'YDir', 'reverse');

saveas(gcf, 'Cp_alpha10.png');

%% PLOT 2: CL vs alpha
figure('Name', 'Lift Curve', 'Position', [100 100 800 600]);
plot(alpha, CL_exp, 'bs-', 'LineWidth', 2, 'MarkerSize', 10, ...
     'MarkerFaceColor', 'b', 'DisplayName', 'Experimental'); hold on;
plot(alpha, CL_cfd, 'ro--', 'LineWidth', 2, 'MarkerSize', 10, ...
     'MarkerFaceColor', 'r', 'DisplayName', 'CFD (k-\omega SST)');
xline(14, 'g-.', 'LineWidth', 1.5, 'Label', 'Stall Onset');
xlabel('\alpha (deg)'); ylabel('C_L');
title('NACA 2412 Lift Curve'); legend('Location', 'best'); grid on;
saveas(gcf, 'CL_vs_alpha.png');

%% PLOT 3: CD vs alpha
figure('Name', 'Drag Polar', 'Position', [100 100 800 600]);
plot(alpha, CD_exp, 'bs-', 'LineWidth', 2, 'MarkerSize', 10, ...
     'MarkerFaceColor', 'b', 'DisplayName', 'Experimental'); hold on;
plot(alpha, CD_cfd, 'ro--', 'LineWidth', 2, 'MarkerSize', 10, ...
     'MarkerFaceColor', 'r', 'DisplayName', 'CFD (k-\omega SST)');
xlabel('\alpha (deg)'); ylabel('C_D');
title('NACA 2412 Drag Polar'); legend('Location', 'best'); grid on;
saveas(gcf, 'CD_vs_alpha.png');

%% ERROR ANALYSIS
CL_err = abs((CL_cfd - CL_exp) ./ CL_exp) * 100;
pre_stall_idx = alpha <= 12;

fprintf('\n=== RESULTS ===\n');
fprintf('Pre-stall mean CL error: %.1f%%\n', mean(CL_err(pre_stall_idx)));
fprintf('Max CL error: %.1f%% @ %d deg\n', max(CL_err), alpha(CL_err == max(CL_err)));
fprintf('Stall angle (exp): %d deg\n', alpha(find(diff(CL_exp) < 0, 1)));

%% SAVE
data = table(alpha', CL_exp', CL_cfd', CD_exp', CD_cfd', CL_err', ...
    'VariableNames', {'Alpha_deg', 'CL_exp', 'CL_cfd', 'CD_exp', 'CD_cfd', 'CL_error_pct'});
writetable(data, 'airfoil_results.csv');
fprintf('\nSaved to airfoil_results.csv\n');
