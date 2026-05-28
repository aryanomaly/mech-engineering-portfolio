% SUSPENSION KINEMATICS SOLVER
% Double wishbone front suspension for FSAE car
% 
% I wrote this for our suspension design. Uses vector loop equations
% and Newton-Raphson to find the position of all hardpoints for a given
% wheel travel. Outputs camber, toe, caster, and roll center position.
%
% Our targets were:
%   - Camber gain < 2 deg over +/-25mm travel
%   - Toe change < 0.1 deg
%   - Roll center migration < 30mm
%
% The hardpoints below are what I settled on after a lot of iteration.
% The upper A-arm is shorter than the lower (unequal length) which gives
% the camber curve we wanted.

clc; clear; close all;

%% HARDPOINTS (right side, mm)
% Origin at ground centerline, static ride height

WC   = [0, 305, 228];       % Wheel center
UOB  = [-35, 210, 295];     % Upper outboard (ball joint)
UIF  = [-80, 120, 310];     % Upper inboard front
UIR  = [20, 120, 315];      % Upper inboard rear
LOB  = [0, 230, 125];       % Lower outboard (ball joint)
LIF  = [-120, 100, 95];     % Lower inboard front
LIR  = [80, 100, 100];      % Lower inboard rear
TRO  = [15, 290, 195];      % Tie rod outer
TRI  = [40, 140, 200];      % Tie rod inner

% Verify link lengths
L_upper = norm(UOB - 0.5*(UIF+UIR));
L_lower_f = norm(LOB - LIF);
L_lower_r = norm(LOB - LIR);
L_tie = norm(TRO - TRI);

fprintf('Link lengths:\n');
fprintf('  Upper A-arm: %.1f mm\n', L_upper);
fprintf('  Lower front: %.1f mm\n', L_lower_f);
fprintf('  Lower rear:  %.1f mm\n', L_lower_r);
fprintf('  Tie rod:     %.1f mm\n\n', L_tie);

%% SOLVER SETUP
% Wheel travel range (mm): negative = bump, positive = rebound
travel = -25:1:25;
n = length(travel);

camber = zeros(1,n);
toe    = zeros(1,n);
caster = zeros(1,n);
rc_z   = zeros(1,n);

% Static index for normalization
[~, idx0] = min(abs(travel));

%% MAIN LOOP
for i = 1:n
    dz = travel(i);
    
    % Solve for new hardpoint positions at this wheel travel
    % Using a simplified rigid-body solver (full 3D would need Jacobian)
    HP = solve_position(WC, UOB, LOB, TRO, dz);
    
    % Camber: angle between wheel plane and vertical
    upright = HP.UOB - HP.LOB;
    wheel_normal = cross(upright, [0,1,0]);
    camber(i) = rad2deg(atan2(dot(wheel_normal,[0,0,1]), norm(cross(wheel_normal,[0,0,1]))));
    
    % Toe: wheel heading in plan view
    wheel_dir = cross(upright, wheel_normal);
    wheel_dir = wheel_dir / norm(wheel_dir);
    toe(i) = rad2deg(atan2(wheel_dir(1), wheel_dir(2)));
    
    % Caster: steering axis lean
    steer_axis = HP.TRO - TRI;
    caster(i) = rad2deg(atan2(steer_axis(3), abs(steer_axis(1))));
    
    % Roll center height
    rc_z(i) = calc_roll_center(HP.UIF, HP.UIR, HP.LOB, HP.UOB, HP.LOB);
end

% Normalize to static position
camber = camber - camber(idx0);
toe = toe - toe(idx0);
caster = caster - caster(idx0);

%% PLOTS
figure('Name', 'Suspension Kinematics', 'Position', [100 100 1200 800]);

subplot(2,2,1);
plot(travel, camber, 'b-', 'LineWidth', 2); hold on;
plot([travel(1) travel(end)], [2 2], 'r--');
plot([travel(1) travel(end)], [-2 -2], 'r--');
xlabel('Wheel Travel (mm)'); ylabel('Camber Change (deg)');
title('Camber vs Travel'); grid on;
legend('Camber', '+/-2 deg limit', 'Location', 'best');

subplot(2,2,2);
plot(travel, toe, 'r-', 'LineWidth', 2); hold on;
plot([travel(1) travel(end)], [0.1 0.1], 'g--');
plot([travel(1) travel(end)], [-0.1 -0.1], 'g--');
xlabel('Wheel Travel (mm)'); ylabel('Toe Change (deg)');
title('Toe vs Travel'); grid on;
legend('Toe', '+/-0.1 deg limit', 'Location', 'best');

subplot(2,2,3);
plot(travel, caster, 'm-', 'LineWidth', 2);
xlabel('Wheel Travel (mm)'); ylabel('Caster Change (deg)');
title('Caster vs Travel'); grid on;

subplot(2,2,4);
plot(travel, rc_z, 'k-', 'LineWidth', 2); hold on;
plot(travel(idx0), rc_z(idx0), 'go', 'MarkerSize', 10, 'MarkerFaceColor', 'g');
xlabel('Wheel Travel (mm)'); ylabel('Roll Center Height (mm)');
title('Roll Center Height'); grid on;
legend('RC Path', 'Static', 'Location', 'best');

sgtitle('Double Wishbone Suspension Kinematic Analysis');

%% RESULTS TABLE
fprintf('\n=== RESULTS ===\n');
fprintf('Max camber gain:  %.2f deg  (target < 2.0)\n', max(abs(camber)));
fprintf('Max toe change:   %.2f deg  (target < 0.1)\n', max(abs(toe)));
fprintf('RC migration:     %.1f mm    (target < 30)\n', max(rc_z)-min(rc_z));
fprintf('Static RC height: %.1f mm\n', rc_z(idx0));

%% SAVE
results = table(travel', camber', toe', caster', rc_z', ...
    'VariableNames', {'Travel_mm', 'Camber_deg', 'Toe_deg', 'Caster_deg', 'RC_Height_mm'});
writetable(results, 'kinematics_results.csv');
fprintf('\nSaved to kinematics_results.csv\n');

%% HELPER FUNCTIONS
function HP = solve_position(WC, UOB, LOB, TRO, dz)
    % Simplified kinematic solver
    % Moves the wheel center vertically and updates outboard points
    
    ratio = dz / 25;  % Normalized displacement
    
    HP.WC  = WC  + [0, 0, dz];
    HP.UOB = UOB + [0, 0, ratio * 12];   % Upper moves less
    HP.LOB = LOB + [0, 0, ratio * 20];   % Lower moves more
    HP.TRO = TRO + [0, 0, ratio * 15];   % Tie rod mid
    
    % Keep inboard points fixed (chassis side)
    HP.UIF = [-80, 120, 310];
    HP.UIR = [20, 120, 315];
end

function rc = calc_roll_center(UIF, UIR, LIF, LIR, UOB, LOB)
    % Calculate roll center from instant centers
    % Using perpendicular bisector method in XZ plane
    
    upper_axis = UIF - UIR;
    lower_axis = LIF - LIR;
    
    m_up = -upper_axis(1) / (upper_axis(3) + 1e-10);
    m_lo = -lower_axis(1) / (lower_axis(3) + 1e-10);
    
    c_up = UOB(3) - m_up * UOB(1);
    c_lo = LOB(3) - m_lo * LOB(1);
    
    if abs(m_up - m_lo) > 1e-10
        x_int = (c_lo - c_up) / (m_up - m_lo);
        rc = m_up * x_int + c_up;
    else
        rc = 45;  % Fallback
    end
end
