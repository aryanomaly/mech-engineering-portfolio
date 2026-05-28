/*
 * Autonomous Sorting System
 * 
 * Conveyor-based color sorting system I built for my mechatronics course.
 * Uses a TCS3200 color sensor to detect red/green/blue blocks on a moving
 * belt and a pneumatic cylinder to divert them into the right bins.
 * 
 * Hardware:
 *   - Arduino Mega 2560
 *   - TCS3200 color sensor
 *   - TCRT5000 IR proximity sensor
 *   - 5/2 solenoid valve (via relay module)
 *   - NEMA 17 stepper motor (A4988 driver)
 *   - I2C LCD 16x2 display
 *   - Emergency stop button (NC)
 * 
 * The timing was the hardest part to get right. The belt moves at a fixed
 * speed, so I measured the time it takes for a block to get from the IR
 * sensor to the color sensor, and from there to the diverter. These delays
 * are calibrated empirically.
 */

#include <Wire.h>
#include <LiquidCrystal_I2C.h>

// --- Pin Definitions ---
#define COLOR_S0     22
#define COLOR_S1     24
#define COLOR_S2     26
#define COLOR_S3     28
#define COLOR_OUT    2    // Must be interrupt-capable

#define IR_SENSOR    3    // Active LOW
#define SOLENOID     8    // Via relay module
#define STEP_PIN     10
#define DIR_PIN      11
#define ENABLE_PIN   12
#define ESTOP        20   // Hardware interrupt
#define LED_RED      13
#define LED_GREEN    9

// --- Timing (calibrated empirically) ---
#define IR_TO_COLOR    150   // ms from IR detect to color sensor
#define COLOR_TO_DIV   200   // ms from color sensor to diverter
#define SOLENOID_DWELL 100   // ms to hold solenoid
#define DEBOUNCE       50    // ms debounce for IR
#define NUM_SAMPLES    5     // Color sensor readings to average

// --- Color reference ratios (after white calibration) ---
// Format: {R_ratio, G_ratio, B_ratio} normalized to sum=1
float ref_red[3]   = {0.85, 0.25, 0.20};
float ref_green[3] = {0.30, 0.75, 0.35};
float ref_blue[3]  = {0.25, 0.40, 0.80};

// --- Globals ---
LiquidCrystal_I2C lcd(0x27, 16, 2);
float white_cal[3] = {1.0, 1.0, 1.0};
volatile bool object_flag = false;
unsigned long last_detect = 0;
unsigned long total = 0, cnt_red = 0, cnt_green = 0, cnt_blue = 0, cnt_err = 0;

// --- Setup ---
void setup() {
  Serial.begin(115200);
  Serial.println("Sorting System Boot");

  // Pin modes
  pinMode(COLOR_S0, OUTPUT); pinMode(COLOR_S1, OUTPUT);
  pinMode(COLOR_S2, OUTPUT); pinMode(COLOR_S3, OUTPUT);
  pinMode(COLOR_OUT, INPUT);
  pinMode(IR_SENSOR, INPUT_PULLUP);
  pinMode(SOLENOID, OUTPUT);
  pinMode(STEP_PIN, OUTPUT); pinMode(DIR_PIN, OUTPUT); pinMode(ENABLE_PIN, OUTPUT);
  pinMode(ESTOP, INPUT_PULLUP);
  pinMode(LED_RED, OUTPUT); pinMode(LED_GREEN, OUTPUT);

  // Defaults
  digitalWrite(SOLENOID, LOW);
  digitalWrite(ENABLE_PIN, HIGH);  // Motor off initially
  digitalWrite(LED_RED, HIGH);

  // Color sensor scaling: 20%
  digitalWrite(COLOR_S0, HIGH);
  digitalWrite(COLOR_S1, LOW);

  // Init LCD
  lcd.init(); lcd.backlight();
  lcd.print("Sorting System");
  lcd.setCursor(0, 1); lcd.print("Calibrating...");

  // Interrupts
  attachInterrupt(digitalPinToInterrupt(IR_SENSOR), onObject, FALLING);
  attachInterrupt(digitalPinToInterrupt(ESTOP), onEstop, FALLING);

  calibrateColorSensor();
  startConveyor();
  
  digitalWrite(LED_RED, LOW);
  digitalWrite(LED_GREEN, HIGH);
  lcd.clear(); lcd.print("Running...");
  
  Serial.println("Ready");
}

// --- Main Loop ---
void loop() {
  if (!object_flag) return;
  object_flag = false;

  if (millis() - last_detect < DEBOUNCE) return;
  last_detect = millis();

  // 1. Wait for object to reach color sensor
  delay(IR_TO_COLOR);

  // 2. Read and classify color
  int color = readColor();
  total++;

  // 3. Log
  Serial.print("#"); Serial.print(total);
  Serial.print(" ");
  if (color == 0) { Serial.print("RED");    cnt_red++; }
  else if (color == 1) { Serial.print("GREEN");  cnt_green++; }
  else if (color == 2) { Serial.print("BLUE");   cnt_blue++; }
  else { Serial.print("UNKNOWN"); cnt_err++; }
  Serial.println();

  // 4. Actuate if needed
  // Current diverter position tracking (simplified)
  static int current_bin = 0;
  if (color >= 0 && color <= 2 && color != current_bin) {
    digitalWrite(SOLENOID, HIGH);
    delay(SOLENOID_DWELL);
    digitalWrite(SOLENOID, LOW);
    current_bin = color;
  }

  // 5. Update display
  updateLCD();
}

// --- Color Reading ---
int readColor() {
  float r = readChannel(LOW, LOW)  / white_cal[0];   // Red filter
  float g = readChannel(HIGH, HIGH) / white_cal[1];   // Green filter
  float b = readChannel(LOW, HIGH)  / white_cal[2];   // Blue filter

  // Normalize
  float sum = r + g + b;
  r /= sum; g /= sum; b /= sum;

  // Classify by minimum Euclidean distance
  float d_red   = dist(r, g, b, ref_red);
  float d_green = dist(r, g, b, ref_green);
  float d_blue  = dist(r, g, b, ref_blue);

  if (d_red < d_green && d_red < d_blue && d_red < 0.15) return 0;   // Red
  if (d_green < d_red && d_green < d_blue && d_green < 0.15) return 1; // Green
  if (d_blue < d_red && d_blue < d_green && d_blue < 0.15) return 2;   // Blue
  return -1; // Unknown
}

float readChannel(int s2, int s3) {
  digitalWrite(COLOR_S2, s2);
  digitalWrite(COLOR_S3, s3);
  delayMicroseconds(100);
  
  long total_pulse = 0;
  int valid = 0;
  for (int i = 0; i < NUM_SAMPLES; i++) {
    long p = pulseIn(COLOR_OUT, LOW, 10000);
    if (p > 0) { total_pulse += p; valid++; }
    delay(10);
  }
  return (valid > 0) ? (float)valid / total_pulse * 1e6 : 0;
}

float dist(float r, float g, float b, float ref[3]) {
  return sqrt(sq(r-ref[0]) + sq(g-ref[1]) + sq(b-ref[2]));
}

// --- Calibration ---
void calibrateColorSensor() {
  Serial.println("Show white reference...");
  delay(3000);
  
  white_cal[0] = readChannel(LOW, LOW);
  white_cal[1] = readChannel(HIGH, HIGH);
  white_cal[2] = readChannel(LOW, HIGH);
  
  Serial.print("Cal: R="); Serial.print(white_cal[0]);
  Serial.print(" G="); Serial.print(white_cal[1]);
  Serial.print(" B="); Serial.println(white_cal[2]);
}

// --- Conveyor ---
void startConveyor() {
  digitalWrite(ENABLE_PIN, LOW);
  digitalWrite(DIR_PIN, HIGH);
  
  // Timer1 for stepper: ~200 steps/sec
  noInterrupts();
  TCCR1A = 0; TCCR1B = 0; TCNT1 = 0;
  OCR1A = 12499;
  TCCR1B |= (1 << WGM12) | (1 << CS12);
  TIMSK1 |= (1 << OCIE1A);
  interrupts();
}

volatile bool step_toggle = false;
ISR(TIMER1_COMPA_vect) {
  digitalWrite(STEP_PIN, step_toggle);
  step_toggle = !step_toggle;
}

// --- Display ---
void updateLCD() {
  lcd.setCursor(0, 0);
  lcd.print("R:"); lcd.print(cnt_red);
  lcd.print(" G:"); lcd.print(cnt_green);
  lcd.print(" B:"); lcd.print(cnt_blue);
  lcd.setCursor(0, 1);
  lcd.print("Total:"); lcd.print(total);
  if (cnt_err > 0) { lcd.print(" E:"); lcd.print(cnt_err); }
}

// --- Safety ---
void onObject() { object_flag = true; }

void onEstop() {
  digitalWrite(SOLENOID, LOW);
  digitalWrite(ENABLE_PIN, HIGH);
  TIMSK1 &= ~(1 << OCIE1A);
  digitalWrite(LED_RED, HIGH);
  digitalWrite(LED_GREEN, LOW);
  lcd.clear(); lcd.print("E-STOP ACTIVE");
  while (1) { /* Halt until reset */ }
}
