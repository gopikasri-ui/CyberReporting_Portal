import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
setTimeout(() => {
  setLoading(false);
  navigate("/");
}, 1500);
  };

  return (
    <div style={styles.root}>
      {/* Background grid lines */}
      <div style={styles.gridOverlay} />

      <div style={styles.card}>
        {/* Logo / Brand */}
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

        <h1 style={styles.heading}>Sign In</h1>
        <p style={styles.subheading}>Access your secure workspace</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label style={styles.label}>EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                style={{ ...styles.input, paddingRight: "48px" }}
                autoComplete="current-password"
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
          </div>

          <div style={styles.forgotRow}>
            <a href="#" style={styles.link}>Forgot password?</a>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? (
              <span style={styles.spinner}>◌</span>
            ) : (
              "AUTHENTICATE"
            )}
          </button>
        </form>

        <div style={styles.divider}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerText}>OR</span>
          <span style={styles.dividerLine} />
        </div>

        <p style={styles.switchText}>
          No account?{" "}
          <a href="/signup" style={styles.link}>
            Create one →
          </a>
        </p>
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
  forgotRow: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "-8px",
  },
  link: {
    color: "#00e5ff",
    fontSize: "13px",
    textDecoration: "none",
    letterSpacing: "0.03em",
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
};