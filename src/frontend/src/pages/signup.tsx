import { useState } from "react";

export default function SignUpPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ["", "WEAK", "FAIR", "GOOD", "STRONG"][strength];
  const strengthColor = ["", "#e24b4a", "#ef9f27", "#1d9e75", "#00e5ff"][strength];

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (strength < 2) {
      setError("Password is too weak. Add uppercase letters, numbers, or symbols.");
      return;
    }
    setLoading(true);
    // Replace with your actual sign-up logic (e.g., API call)
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div style={styles.root}>
      <div style={styles.gridOverlay} />

      <div style={styles.card}>
        <div style={styles.brand}>
          <div style={styles.logoIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <polygon
                points="12,2 22,7 22,17 12,22 2,17 2,7"
                stroke="#00e5ff"
                strokeWidth="1.5"
                fill="none"
              />
              <polygon
                points="12,6 18,9.5 18,14.5 12,18 6,14.5 6,9.5"
                fill="#00e5ff"
                fillOpacity="0.15"
                stroke="#00e5ff"
                strokeWidth="1"
              />
              <circle cx="12" cy="12" r="2" fill="#00e5ff" />
            </svg>
          </div>
          <span style={styles.brandName}>CYBERPORTAL</span>
        </div>

        {success ? (
          <div style={styles.successBox}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" style={{ margin: "0 auto 1rem", display: "block" }}>
              <circle cx="12" cy="12" r="10" stroke="#00e5ff" strokeWidth="1.5" />
              <path d="M7 12l4 4 6-6" stroke="#00e5ff" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <h2 style={{ ...styles.heading, textAlign: "center", marginBottom: "8px" }}>ACCESS GRANTED</h2>
            <p style={{ textAlign: "center", color: "#3a6080", fontSize: "14px" }}>
              Your account has been created.{" "}
              <a href="/login" style={styles.link}>Sign in →</a>
            </p>
          </div>
        ) : (
          <>
            <h1 style={styles.heading}>Create Account</h1>
            <p style={styles.subheading}>Join the cyberportal network</p>

            <form onSubmit={handleSignUp} style={styles.form}>
              <div style={styles.fieldGroup}>
                <label style={styles.label}>DISPLAY NAME</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Agent handle"
                  style={styles.input}
                  autoComplete="name"
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>EMAIL</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="agent@cyberportal.io"
                  style={styles.input}
                  autoComplete="email"
                />
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>PASSWORD</label>
                <div style={styles.passwordWrapper}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={(e) => update("password", e.target.value)}
                    placeholder="••••••••••••"
                    style={{ ...styles.input, paddingRight: "48px" }}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={styles.eyeBtn}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {form.password.length > 0 && (
                  <div style={styles.strengthRow}>
                    <div style={styles.strengthBars}>
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          style={{
                            ...styles.strengthBar,
                            background: i <= strength ? strengthColor : "rgba(0,229,255,0.1)",
                          }}
                        />
                      ))}
                    </div>
                    <span style={{ ...styles.strengthLabel, color: strengthColor }}>
                      {strengthLabel}
                    </span>
                  </div>
                )}
              </div>

              <div style={styles.fieldGroup}>
                <label style={styles.label}>CONFIRM PASSWORD</label>
                <input
                  type="password"
                  value={form.confirm}
                  onChange={(e) => update("confirm", e.target.value)}
                  placeholder="••••••••••••"
                  style={{
                    ...styles.input,
                    borderColor:
                      form.confirm && form.confirm !== form.password
                        ? "rgba(226,75,74,0.5)"
                        : form.confirm && form.confirm === form.password
                        ? "rgba(0,229,255,0.4)"
                        : undefined,
                  }}
                  autoComplete="new-password"
                />
              </div>

              {error && <div style={styles.error}>{error}</div>}

              <button type="submit" style={styles.submitBtn} disabled={loading}>
                {loading ? (
                  <span style={styles.spinner}>◌</span>
                ) : (
                  "INITIALIZE ACCOUNT"
                )}
              </button>
            </form>

            <div style={styles.divider}>
              <span style={styles.dividerLine} />
              <span style={styles.dividerText}>OR</span>
              <span style={styles.dividerLine} />
            </div>

            <p style={styles.switchText}>
              Already registered?{" "}
              <a href="/login" style={styles.link}>
                Sign in →
              </a>
            </p>
          </>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #050a12; }
        input::placeholder { color: #2a4060; }
        input:focus { outline: none; border-color: #00e5ff !important; box-shadow: 0 0 0 1px #00e5ff30; }
        button:hover:not(:disabled) { opacity: 0.85; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  root: {
    minHeight: "100vh",
    background: "#050a12",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Rajdhani', sans-serif",
    position: "relative",
    overflow: "hidden",
    padding: "2rem",
  },
  gridOverlay: {
    position: "absolute",
    inset: 0,
    backgroundImage: `
      linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
    pointerEvents: "none",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    background: "rgba(8, 18, 32, 0.95)",
    border: "1px solid rgba(0, 229, 255, 0.18)",
    borderRadius: "4px",
    padding: "2.5rem",
    animation: "fadeIn 0.4s ease",
    position: "relative",
    zIndex: 1,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "2rem",
  },
  logoIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "13px",
    letterSpacing: "0.2em",
    color: "#00e5ff",
  },
  heading: {
    fontSize: "28px",
    fontWeight: 600,
    color: "#e8f4ff",
    letterSpacing: "0.05em",
    marginBottom: "6px",
  },
  subheading: {
    fontSize: "14px",
    color: "#3a6080",
    letterSpacing: "0.04em",
    marginBottom: "2rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "11px",
    letterSpacing: "0.15em",
    color: "#00e5ff",
  },
  input: {
    background: "rgba(0, 229, 255, 0.04)",
    border: "1px solid rgba(0, 229, 255, 0.15)",
    borderRadius: "3px",
    padding: "10px 14px",
    fontSize: "15px",
    color: "#d0eeff",
    fontFamily: "'Rajdhani', sans-serif",
    width: "100%",
    transition: "border-color 0.2s",
  },
  passwordWrapper: {
    position: "relative",
  },
  eyeBtn: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#3a6080",
    cursor: "pointer",
    padding: "4px",
    display: "flex",
    alignItems: "center",
  },
  strengthRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "4px",
  },
  strengthBars: {
    display: "flex",
    gap: "4px",
    flex: 1,
  },
  strengthBar: {
    flex: 1,
    height: "3px",
    borderRadius: "2px",
    transition: "background 0.3s",
  },
  strengthLabel: {
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "10px",
    letterSpacing: "0.1em",
    minWidth: "42px",
    textAlign: "right",
  },
  error: {
    background: "rgba(226, 75, 74, 0.1)",
    border: "1px solid rgba(226, 75, 74, 0.3)",
    borderRadius: "3px",
    padding: "10px 14px",
    color: "#f09595",
    fontSize: "13px",
    letterSpacing: "0.02em",
  },
  submitBtn: {
    background: "rgba(0, 229, 255, 0.1)",
    border: "1px solid rgba(0, 229, 255, 0.4)",
    borderRadius: "3px",
    padding: "12px",
    fontFamily: "'Share Tech Mono', monospace",
    fontSize: "13px",
    letterSpacing: "0.2em",
    color: "#00e5ff",
    cursor: "pointer",
    marginTop: "4px",
    transition: "opacity 0.2s, background 0.2s",
  },
  spinner: {
    display: "inline-block",
    animation: "spin 1s linear infinite",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "1.5rem 0 1rem",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "rgba(0, 229, 255, 0.1)",
  },
  dividerText: {
    fontSize: "11px",
    fontFamily: "'Share Tech Mono', monospace",
    color: "#3a6080",
    letterSpacing: "0.1em",
  },
  switchText: {
    textAlign: "center",
    fontSize: "14px",
    color: "#3a6080",
    letterSpacing: "0.03em",
  },
  link: {
    color: "#00e5ff",
    fontSize: "13px",
    textDecoration: "none",
    letterSpacing: "0.03em",
  },
  successBox: {
    padding: "1rem 0",
  },
};