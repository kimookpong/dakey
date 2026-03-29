"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

// ---- Icons (SVG replacement for emojis) ----
const Icons = {
  Server: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
      <line x1="6" y1="6" x2="6.01" y2="6" />
      <line x1="6" y1="18" x2="6.01" y2="18" />
    </svg>
  ),
  Globe: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  Activity: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  Hash: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" y1="9" x2="20" y2="9" />
      <line x1="4" y1="15" x2="20" y2="15" />
      <line x1="10" y1="3" x2="8" y2="21" />
      <line x1="16" y1="3" x2="14" y2="21" />
    </svg>
  ),
  Key: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zM12 12l.93-2.015M11.07 12.93l2.015-.93M15.5 7.5L14 9l1.5 1.5L17 9l-1.5-1.5z" />
    </svg>
  ),
  User: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  LogOut: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Plus: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  Edit3: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  ),
  Trash2: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
      <line x1="10" y1="11" x2="10" y2="17" />
      <line x1="14" y1="11" x2="14" y2="17" />
    </svg>
  ),
  ExternalLink: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  ),
  Terminal: () => (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  History: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  DollarSign: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
  CreditCard: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  ),
  Copy: () => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  ),
};

// ---- Types ----
interface Note {
  id: number;
  content: string;
  date: string;
}

interface Server {
  id: number;
  protocol: string;
  host: string;
  os?: string | null;
  port: number;
  username: string;
  password: string;
  description: string | null;
  basePath: string | null;
  notes: Note[];
}

interface Domain {
  id: number;
  domain: string;
  language: string | null;
  service: string | null;
  host: string | null;
  port: number | null;
  directory: string | null;
  description: string | null;
  notes: Note[];
}

interface Transaction {
  id: number;
  date: string;
  type: "Income" | "Expense";
  amount: number;
  category: string;
  description: string | null;
  serverId: number | null;
  domainId: number | null;
  server?: { host: string };
  domain?: { domain: string };
}

const SERVICE_OPTIONS = [
  "Nginx",
  "Apache",
  "PM2",
  "Node.js",
  "PHP",
  "Docker",
  "MySQL",
  "PostgreSQL",
  "Redis",
];

// ---- Copy utility ----
function CopyBtn({ value, label = "" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={copy}
      title={`Copy ${label}`}
      style={{
        background: copied ? "rgba(16,185,129,0.15)" : "rgba(59,130,246,0.1)",
        border: `1px solid ${copied ? "rgba(16,185,129,0.4)" : "rgba(59,130,246,0.3)"}`,
        borderRadius: "6px",
        padding: "3px 7px",
        color: copied ? "#34d399" : "#93c5fd",
        cursor: "pointer",
        fontSize: "0.7rem",
        fontWeight: 600,
        transition: "all 0.2s",
        whiteSpace: "nowrap",
        display: "inline-flex",
        alignItems: "center",
        gap: "3px",
      }}
    >
      {copied ? (
        <>
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
          OK
        </>
      ) : (
        <>
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <rect x="9" y="9" width="13" height="13" rx="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
          Copy
        </>
      )}
    </button>
  );
}

// ---- Protocol Badge ----
function ProtocolBadge({ protocol }: { protocol: string }) {
  const colors: Record<string, { bg: string; color: string }> = {
    SSH: { bg: "rgba(59,130,246,0.15)", color: "#60a5fa" },
    SFTP: { bg: "rgba(16,185,129,0.15)", color: "#34d399" },
    FTP: { bg: "rgba(245,158,11,0.15)", color: "#fbbf24" },
  };
  const style = colors[protocol] || {
    bg: "rgba(139,92,246,0.15)",
    color: "#a78bfa",
  };
  return (
    <span
      style={{
        background: style.bg,
        color: style.color,
        borderRadius: "6px",
        padding: "3px 9px",
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "0.06em",
      }}
    >
      {protocol}
    </span>
  );
}

// ---- Password field (masked + reveal + copy) ----
function PasswordField({ password }: { password: string }) {
  const [shown, setShown] = useState(false);
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
      <code
        style={{
          background: "rgba(0,0,0,0.3)",
          borderRadius: "5px",
          padding: "2px 7px",
          fontSize: "0.8rem",
          color: "var(--text-secondary)",
          fontFamily: "monospace",
          letterSpacing: shown ? "0" : "0.2em",
          maxWidth: "120px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {shown ? password : "•".repeat(Math.min(password.length, 10))}
      </code>
      <button
        onClick={() => setShown(!shown)}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "var(--text-muted)",
          padding: "2px",
        }}
        title={shown ? "Hide" : "Show"}
      >
        {shown ? (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
          </svg>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
      <CopyBtn value={password} label="password" />
    </div>
  );
}

// ---- Health Check Button ----
function HealthCheckBtn({ target }: { target: string }) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const check = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/health-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target }),
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={check}
        disabled={loading}
        title="Health Check"
        style={{
          background: "rgba(59,130,246,0.1)",
          border: "1px solid rgba(59,130,246,0.3)",
          borderRadius: "6px",
          padding: "5px 10px",
          color: "#93c5fd",
          cursor: loading ? "wait" : "pointer",
          fontSize: "0.75rem",
          fontWeight: 600,
          display: "inline-flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <Icons.Activity />
        {loading ? "Checking..." : "Health"}
      </button>

      {result && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            right: 0,
            zIndex: 60,
            width: "320px",
          }}
        >
          <div
            className="glass-card"
            style={{ borderRadius: "12px", padding: "0.6rem", width: "100%" }}
          >
            <div style={{ padding: "0.4rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "0.8rem", fontWeight: 700 }}>
                  Results
                </span>
                <button
                  onClick={() => setResult(null)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--text-muted)",
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </div>

              <div
                style={{
                  fontSize: "0.75rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>Ping</span>
                  <span
                    style={{
                      color:
                        result.ping.status === "ok" ? "#10b981" : "#ef4444",
                    }}
                  >
                    {result.ping.status === "ok"
                      ? `${result.ping.latency}ms`
                      : "Fail"}
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>HTTP</span>
                  <span
                    style={{
                      color:
                        result.http.status === "ok" && result.http.code < 400
                          ? "#10b981"
                          : "#ef4444",
                    }}
                  >
                    {result.http.status === "ok"
                      ? `Status ${result.http.code}`
                      : "Fail"}
                  </span>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <span>DNS</span>
                  <span
                    style={{
                      color: result.dns.status === "ok" ? "#10b981" : "#ef4444",
                    }}
                  >
                    {result.dns.status === "ok" ? "OK" : "Error"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---- Modal ----
function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  // Prevent background scrolling while modal is open and restore on close
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(8px)",
        padding: "1rem",
      }}
    >
      <div
        className="glass-card"
        style={{
          borderRadius: "28px",
          padding: "2rem",
          width: "100%",
          maxWidth: "600px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.5rem",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--text-primary)",
              }}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: "var(--text-muted)",
                padding: "4px",
              }}
              aria-label="Close modal"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div
          style={{
            flex: "1 1 auto",
            overflowY: "auto",
            padding: "0 0.5rem 0 0",
            height: "100%",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

// ---- Form field components ----
function Field({
  label,
  id,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        htmlFor={id}
        style={{
          display: "block",
          fontSize: "0.78rem",
          fontWeight: 500,
          color: "var(--text-secondary)",
          marginBottom: "0.4rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
        {required && <span style={{ color: "var(--accent-red)" }}> *</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          width: "100%",
          padding: "0.65rem 0.9rem",
          background: "var(--bg-input)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          color: "var(--text-primary)",
          fontSize: "0.875rem",
          outline: "none",
          fontFamily: "inherit",
          transition: "border-color 0.2s",
        }}
        onFocus={(e) => (e.target.style.borderColor = "var(--accent-blue)")}
        onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
      />
    </div>
  );
}

function MultiSelect({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (vals: string[]) => void;
}) {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt));
    } else {
      onChange([...selected, opt]);
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label
        style={{
          display: "block",
          fontSize: "0.78rem",
          fontWeight: 500,
          color: "var(--text-secondary)",
          marginBottom: "0.4rem",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "6px",
          background: "var(--bg-input)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "8px",
        }}
      >
        {options.map((opt) => {
          const isSelected = selected.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              style={{
                background: isSelected
                  ? "var(--accent-blue)"
                  : "rgba(255,255,255,0.05)",
                color: isSelected ? "white" : "var(--text-secondary)",
                border: "none",
                borderRadius: "5px",
                padding: "4px 10px",
                fontSize: "0.75rem",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ---- Server Form ----
function ServerForm({
  initial,
  onSave,
  onCancel,
}: {
  initial?: Partial<Server>;
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    protocol: initial?.protocol || "SSH",
    host: initial?.host || "",
    os: initial?.os || "",
    port: String(initial?.port || "22"),
    username: initial?.username || "",
    password: initial?.password || "",
    description: initial?.description || "",
    basePath: initial?.basePath || "",
    note: "", // New note for this update/creation
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  const handleProtocolChange = (v: string) => {
    let port = form.port;
    if (v === "FTP") port = "21";
    if (v === "SSH" || v === "SFTP") port = "22";
    setForm({ ...form, protocol: v, port });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 1rem",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.78rem",
              fontWeight: 500,
              color: "var(--text-secondary)",
              marginBottom: "0.4rem",
              textTransform: "uppercase",
            }}
          >
            Protocol *
          </label>
          <select
            value={form.protocol ?? ""}
            onChange={(e) => handleProtocolChange(e.target.value)}
            style={{
              width: "100%",
              padding: "0.65rem",
              background: "var(--bg-input)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--text-primary)",
            }}
          >
            <option value="SSH">SSH</option>
            <option value="SFTP">SFTP</option>
            <option value="FTP">FTP</option>
          </select>
        </div>
        <Field
          label="Port"
          id="s-port"
          value={form.port}
          onChange={(v) => setForm({ ...form, port: v })}
          type="number"
          placeholder="22"
          required
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 1rem",
        }}
      >
        <div style={{ marginBottom: "1rem" }}>
          <label
            style={{
              display: "block",
              fontSize: "0.78rem",
              fontWeight: 500,
              color: "var(--text-secondary)",
              marginBottom: "0.4rem",
              textTransform: "uppercase",
            }}
          >
            Operating System
          </label>
          <select
            value={form.os ?? ""}
            onChange={(e) => setForm({ ...form, os: e.target.value })}
            style={{
              width: "100%",
              padding: "0.65rem",
              background: "var(--bg-input)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--text-primary)",
            }}
          >
            <option value="">-- Select OS --</option>
            <option value="Linux">Linux</option>
            <option value="Ubuntu">Ubuntu</option>
            <option value="CentOS">CentOS</option>
            <option value="Windows">Windows</option>
            <option value="BSD">BSD</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div />
      </div>
      <Field
        label="Host / IP"
        id="s-host"
        value={form.host}
        onChange={(v) => setForm({ ...form, host: v })}
        placeholder="192.168.1.1 or domain.com"
        required
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 1rem",
        }}
      >
        <Field
          label="Username"
          id="s-username"
          value={form.username}
          onChange={(v) => setForm({ ...form, username: v })}
          placeholder="root"
          required
        />
        <Field
          label="Password"
          id="s-password"
          value={form.password}
          onChange={(v) => setForm({ ...form, password: v })}
          type="password"
          placeholder="••••••••"
          required
        />
      </div>
      <Field
        label="Base Path"
        id="s-basepath"
        value={form.basePath}
        onChange={(v) => setForm({ ...form, basePath: v })}
        placeholder="/var/www"
      />
      <Field
        label="Description"
        id="s-desc"
        value={form.description}
        onChange={(v) => setForm({ ...form, description: v })}
        placeholder="Production server"
      />

      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          background: "rgba(59,130,246,0.05)",
          borderRadius: "10px",
          border: "1px dashed rgba(59,130,246,0.2)",
        }}
      >
        <Field
          label="Update Note"
          id="s-note"
          value={form.note}
          onChange={(v) => setForm({ ...form, note: v })}
          placeholder="What did you change? (optional)"
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          justifyContent: "flex-end",
          marginTop: "1rem",
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: "0.6rem 1.25rem",
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            color: "var(--text-secondary)",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "0.6rem 1.5rem",
            background: "linear-gradient(135deg, #3b82f6, #2563eb)",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: saving ? "not-allowed" : "pointer",
            fontWeight: 600,
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}

// ---- Domain Form ----
function DomainForm({
  initial,
  servers,
  onSave,
  onCancel,
}: {
  initial?: Partial<Domain>;
  servers: Server[];
  onSave: (data: any) => Promise<void>;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    domain: initial?.domain || "",
    language: initial?.language || "",
    service: initial?.service || "", // This will be handled as comma separated string
    host: initial?.host || "",
    port: String(initial?.port || "80"),
    directory: initial?.directory || "",
    description: initial?.description || "",
    note: "",
  });
  const [selectedServices, setSelectedServices] = useState<string[]>(
    initial?.service ? initial.service.split(",").filter((s) => s) : [],
  );
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave({ ...form, service: selectedServices.join(",") });
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field
        label="Domain"
        id="d-domain"
        value={form.domain}
        onChange={(v) => setForm({ ...form, domain: v })}
        placeholder="example.com"
        required
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 1rem",
        }}
      >
        <Field
          label="Language / Stack"
          id="d-lang"
          value={form.language}
          onChange={(v) => setForm({ ...form, language: v })}
          placeholder="PHP, Node.js..."
        />
        <Field
          label="Port"
          id="d-port"
          value={form.port}
          onChange={(v) => setForm({ ...form, port: v })}
          type="number"
          placeholder="80"
        />
      </div>

      <MultiSelect
        label="Running Services"
        options={SERVICE_OPTIONS}
        selected={selectedServices}
        onChange={setSelectedServices}
      />

      <div style={{ marginBottom: "1rem" }}>
        <label
          style={{
            display: "block",
            fontSize: "0.78rem",
            fontWeight: 500,
            color: "var(--text-secondary)",
            marginBottom: "0.4rem",
            textTransform: "uppercase",
          }}
        >
          Host / IP (From Servers)
        </label>
        <div style={{ display: "flex", gap: "10px" }}>
          <select
            value={form.host ?? ""}
            onChange={(e) => setForm({ ...form, host: e.target.value })}
            style={{
              flex: 1,
              padding: "0.65rem",
              background: "var(--bg-input)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--text-primary)",
            }}
          >
            <option value="">-- Select Host --</option>
            {servers.map((s) => (
              <option key={s.id} value={s.host}>
                {s.description || s.username}@{s.host}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Manual Host"
            value={form.host}
            onChange={(e) => setForm({ ...form, host: e.target.value })}
            style={{
              width: "150px",
              padding: "0.65rem",
              background: "var(--bg-input)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--text-primary)",
            }}
          />
        </div>
      </div>

      <Field
        label="Directory"
        id="d-dir"
        value={form.directory}
        onChange={(v) => setForm({ ...form, directory: v })}
        placeholder="/var/www/html/example"
      />
      <Field
        label="Description"
        id="d-desc"
        value={form.description}
        onChange={(v) => setForm({ ...form, description: v })}
        placeholder="Main website"
      />

      <div
        style={{
          marginTop: "1rem",
          padding: "1rem",
          background: "rgba(16,185,129,0.05)",
          borderRadius: "10px",
          border: "1px dashed rgba(16,185,129,0.2)",
        }}
      >
        <Field
          label="Update Note"
          id="d-note"
          value={form.note}
          onChange={(v) => setForm({ ...form, note: v })}
          placeholder="Audit log message (optional)"
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          justifyContent: "flex-end",
          marginTop: "1rem",
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: "0.6rem 1.25rem",
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            color: "var(--text-secondary)",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "0.6rem 1.5rem",
            background: "linear-gradient(135deg, #10b981, #059669)",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: saving ? "not-allowed" : "pointer",
            fontWeight: 600,
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}

// ---- Card Components ----
function ServerCard({
  server,
  onEdit,
  onDelete,
  onDuplicate,
  linkedDomains,
}: {
  server: Server;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  linkedDomains: Domain[];
}) {
  const [showNotes, setShowNotes] = useState(false);
  const [showLinked, setShowLinked] = useState(false);

  return (
    <div
      className="glass-card"
      style={{
        borderRadius: "24px",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        transition: "all 0.3s ease",
        position: "relative",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
          gap: "8px",
        }}
      >
        <button
          onClick={onDuplicate}
          title="Duplicate"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Icons.Copy />
        </button>
        <button
          onClick={onEdit}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Icons.Edit3 />
        </button>
        <button
          onClick={onDelete}
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#f87171",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Icons.Trash2 />
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <ProtocolBadge protocol={server.protocol} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Icons.Globe />
          <span style={{ fontWeight: 600, color: "#93c5fd" }}>
            {server.host}
          </span>
          {server.os && (
            <span
              style={{
                marginLeft: "8px",
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.04)",
                color: "var(--text-muted)",
                borderRadius: "8px",
                padding: "4px 8px",
                fontSize: "0.72rem",
                fontWeight: 700,
              }}
            >
              {server.os}
            </span>
          )}
          <CopyBtn value={server.host} label="host" />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Icons.Hash /> {server.port}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Icons.User /> {server.username}
          </div>
        </div>
        <PasswordField password={server.password} />
      </div>

      {server.basePath && (
        <div
          style={{
            padding: "8px",
            background: "rgba(0,0,0,0.2)",
            borderRadius: "8px",
            fontSize: "0.8rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <code
            style={{
              color: "var(--text-muted)",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {server.basePath}
          </code>
          <CopyBtn value={server.basePath} label="path" />
        </div>
      )}

      {server.description && (
        <p
          style={{
            margin: 0,
            fontSize: "0.8rem",
            color: "var(--text-muted)",
            fontStyle: "italic",
          }}
        >
          {server.description}
        </p>
      )}

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {server.protocol === "SSH" && (
          <a
            href={`ssh://${server.username}@${server.host}:${server.port}`}
            style={{ flex: 1, textDecoration: "none" }}
          >
            <button
              style={{
                width: "100%",
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.3)",
                borderRadius: "6px",
                padding: "6px",
                color: "#60a5fa",
                fontSize: "0.75rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                cursor: "pointer",
              }}
            >
              <Icons.Terminal /> SSH
            </button>
          </a>
        )}
        {(server.protocol === "SFTP" || server.protocol === "FTP") && (
          <a
            href={`filezilla://connectsite/${server.protocol.toLowerCase()}://${encodeURIComponent(server.username)}:${encodeURIComponent(server.password)}@${server.host}:${server.port}`}
            style={{ flex: 1, textDecoration: "none" }}
          >
            <button
              style={{
                width: "100%",
                background: "rgba(245,158,11,0.1)",
                border: "1px solid rgba(245,158,11,0.3)",
                borderRadius: "6px",
                padding: "6px",
                color: "#fbbf24",
                fontSize: "0.75rem",
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                cursor: "pointer",
              }}
            >
              FileZilla
            </button>
          </a>
        )}
      </div>

      <div
        style={{
          borderTop: "1px solid var(--border)",
          paddingTop: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <button
            onClick={() => setShowLinked(!showLinked)}
            style={{
              background: "transparent",
              border: "none",
              color: linkedDomains.length > 0 ? "#10b981" : "var(--text-muted)",
              fontSize: "0.75rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: 0,
            }}
          >
            <Icons.Globe />{" "}
            {showLinked
              ? "Hide Domains"
              : `Connected Domains (${linkedDomains.length})`}
          </button>
          <button
            onClick={() => setShowNotes(!showNotes)}
            style={{
              background: "transparent",
              border: "none",
              color: "var(--text-muted)",
              fontSize: "0.75rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "4px",
              padding: 0,
            }}
          >
            <Icons.History />{" "}
            {showNotes ? "Hide History" : `History (${server.notes.length})`}
          </button>
        </div>

        {showLinked && linkedDomains.length > 0 && (
          <div
            style={{
              padding: "8px",
              background: "rgba(16,185,129,0.05)",
              borderRadius: "8px",
              border: "1px solid rgba(16,185,129,0.2)",
            }}
          >
            {linkedDomains.map((d) => (
              <div
                key={d.id}
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-secondary)",
                  padding: "2px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.02)",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>{d.domain}</span>
                <span
                  style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}
                >
                  {d.service}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {showNotes && (
        <div
          style={{
            padding: "10px",
            background: "rgba(255,255,255,0.03)",
            borderRadius: "8px",
            border: "1px solid var(--border)",
          }}
        >
          {server.notes.length === 0 ? (
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
              No history
            </div>
          ) : (
            server.notes.map((n) => (
              <div
                key={n.id}
                style={{
                  marginBottom: "8px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  paddingBottom: "4px",
                }}
              >
                <div style={{ fontSize: "0.65rem", color: "#60a5fa" }}>
                  {new Date(n.date).toLocaleString()}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  {n.content}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function TransactionForm({
  servers,
  domains,
  onSave,
  onCancel,
}: {
  servers: Server[];
  domains: Domain[];
  onSave: (data: any) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({
    type: "Expense",
    amount: "",
    category: "Hosting",
    description: "",
    serverId: "",
    domainId: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave(form);
    setSaving(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.85rem",
              color: "var(--text-secondary)",
              marginBottom: "4px",
            }}
          >
            Type
          </label>
          <select
            value={form.type ?? ""}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            style={{
              width: "100%",
              background: "var(--bg-input)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "10px",
              color: "white",
            }}
          >
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.85rem",
              color: "var(--text-secondary)",
              marginBottom: "4px",
            }}
          >
            Category
          </label>
          <select
            value={form.category ?? ""}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            style={{
              width: "100%",
              background: "var(--bg-input)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "10px",
              color: "white",
            }}
          >
            <option value="Hosting">Hosting</option>
            <option value="Domain">Domain</option>
            <option value="Service">Service</option>
            <option value="Setup">Setup</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <Field
          label="Amount (฿)"
          id="t-amount"
          value={form.amount}
          onChange={(v) => setForm({ ...form, amount: v })}
          placeholder="0.00"
          type="number"
        />
        <Field
          label="Date"
          id="t-date"
          value={form.date}
          onChange={(v) => setForm({ ...form, date: v })}
          type="date"
        />
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}
      >
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.85rem",
              color: "var(--text-secondary)",
              marginBottom: "4px",
            }}
          >
            Link Server
          </label>
          <select
            value={form.serverId ?? ""}
            onChange={(e) => setForm({ ...form, serverId: e.target.value })}
            style={{
              width: "100%",
              background: "var(--bg-input)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "10px",
              color: "white",
            }}
          >
            <option value="">No Server</option>
            {servers.map((s) => (
              <option key={s.id} value={s.id}>
                {s.host}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            style={{
              display: "block",
              fontSize: "0.85rem",
              color: "var(--text-secondary)",
              marginBottom: "4px",
            }}
          >
            Link Domain
          </label>
          <select
            value={form.domainId ?? ""}
            onChange={(e) => setForm({ ...form, domainId: e.target.value })}
            style={{
              width: "100%",
              background: "var(--bg-input)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "10px",
              color: "white",
            }}
          >
            <option value="">No Domain</option>
            {domains.map((d) => (
              <option key={d.id} value={d.id}>
                {d.domain}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Field
        label="Description"
        id="t-desc"
        value={form.description}
        onChange={(v) => setForm({ ...form, description: v })}
        placeholder="Payment for March..."
      />

      <div
        style={{
          display: "flex",
          gap: "0.75rem",
          justifyContent: "flex-end",
          marginTop: "1rem",
        }}
      >
        <button
          type="button"
          onClick={onCancel}
          style={{
            padding: "0.6rem 1.25rem",
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            color: "var(--text-secondary)",
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "0.6rem 1.5rem",
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            border: "none",
            borderRadius: "8px",
            color: "white",
            cursor: saving ? "not-allowed" : "pointer",
            fontWeight: 600,
            opacity: saving ? 0.7 : 1,
          }}
        >
          {saving ? "Saving..." : "Add Transaction"}
        </button>
      </div>
    </form>
  );
}

function DomainCard({
  domain,
  onEdit,
  onDelete,
  onDuplicate,
}: {
  domain: Domain;
  onEdit: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
}) {
  const [showNotes, setShowNotes] = useState(false);
  const [healthStatus, setHealthStatus] = useState<{
    online: boolean;
    dns: any;
  } | null>(null);
  const [checking, setChecking] = useState(false);

  const checkHealth = async () => {
    setChecking(true);
    try {
      const res = await fetch(`/api/health-check?domain=${domain.domain}`);
      if (res.ok) setHealthStatus(await res.json());
    } catch (err) {
      console.error(err);
    }
    setChecking(false);
  };

  const services = domain.service
    ? domain.service.split(",").filter((s) => s)
    : [];

  return (
    <div
      className="glass-card"
      style={{
        borderRadius: "24px",
        padding: "1.5rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.25rem",
        transition: "all 0.3s ease",
        position: "relative",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          display: "flex",
          gap: "8px",
        }}
      >
        <button
          onClick={onDuplicate}
          title="Duplicate"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Icons.Copy />
        </button>
        <button
          onClick={onEdit}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Icons.Edit3 />
        </button>
        <button
          onClick={onDelete}
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)",
            color: "#f87171",
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <Icons.Trash2 />
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {domain.language && (
            <span
              style={{
                padding: "2px 8px",
                background: "rgba(139,92,246,0.15)",
                color: "#a78bfa",
                borderRadius: "5px",
                fontSize: "0.7rem",
                fontWeight: 700,
              }}
            >
              {domain.language}
            </span>
          )}
          {services.map((s) => (
            <span
              key={s}
              style={{
                padding: "2px 8px",
                background: "rgba(255,255,255,0.08)",
                color: "#d1d5db",
                borderRadius: "5px",
                fontSize: "0.7rem",
                fontWeight: 600,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            background: "rgba(16,185,129,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#10b981",
          }}
        >
          <Icons.Globe />
        </div>
        <a
          href={`https://${domain.domain}`}
          target="_blank"
          rel="noreferrer"
          style={{
            fontWeight: 700,
            fontSize: "1rem",
            color: "#10b981",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          {domain.domain} <Icons.ExternalLink />
        </a>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          fontSize: "0.85rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "var(--text-secondary)",
            }}
          >
            <Icons.Server /> {domain.host || "No Host"}
          </div>
          {domain.host && <CopyBtn value={domain.host} label="host" />}
        </div>
        <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
          Port: {domain.port || "Default"}
        </div>
      </div>

      {domain.directory && (
        <div
          style={{
            padding: "8px",
            background: "rgba(0,0,0,0.2)",
            borderRadius: "8px",
            fontSize: "0.75rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <code
            style={{
              color: "var(--text-muted)",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {domain.directory}
          </code>
          <CopyBtn value={domain.directory} label="directory" />
        </div>
      )}

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <HealthCheckBtn target={domain.domain} />
        <button
          onClick={() => setShowNotes(!showNotes)}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-muted)",
            fontSize: "0.75rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          <Icons.History /> History ({domain.notes.length})
        </button>
      </div>

      {showNotes && (
        <div
          style={{
            padding: "10px",
            background: "rgba(255,255,255,0.03)",
            borderRadius: "8px",
            border: "1px solid var(--border)",
          }}
        >
          {domain.notes.length === 0 ? (
            <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>
              No history
            </div>
          ) : (
            domain.notes.map((n) => (
              <div
                key={n.id}
                style={{
                  marginBottom: "8px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  paddingBottom: "4px",
                }}
              >
                <div style={{ fontSize: "0.65rem", color: "#10b981" }}>
                  {new Date(n.date).toLocaleString()}
                </div>
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  {n.content}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

// ---- Main Dashboard ----
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<
    "servers" | "domains" | "transactions"
  >("servers");
  const [servers, setServers] = useState<Server[]>([]);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [serverModal, setServerModal] = useState<{
    mode: "add" | "edit";
    data?: Server;
  } | null>(null);
  const [domainModal, setDomainModal] = useState<{
    mode: "add" | "edit";
    data?: Domain;
  } | null>(null);
  const [transactionModal, setTransactionModal] = useState<{
    mode: "add" | "edit";
    data?: Transaction;
  } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: "server" | "domain" | "transaction";
    id: number;
    name: string;
  } | null>(null);
  const router = useRouter();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [sr, dr, tr] = await Promise.all([
        fetch("/api/servers").then((r) => r.json()),
        fetch("/api/domains").then((r) => r.json()),
        fetch("/api/transactions").then((r) => r.json()),
      ]);

      if (sr.error || dr.error) {
        router.push("/login");
        return;
      }

      setServers(Array.isArray(sr) ? sr : []);
      setDomains(Array.isArray(dr) ? dr : []);
      setTransactions(Array.isArray(tr) ? tr : []);
    } catch (e) {
      router.push("/login");
    }
    setLoading(false);
  }, [router]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  const saveServer = async (form: any, id?: number) => {
    const url = id ? `/api/servers/${id}` : "/api/servers";
    const method = id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.status === 401) {
      router.push("/login");
      return;
    }
    setServerModal(null);
    await loadData();
  };

  const saveDomain = async (form: any, id?: number) => {
    const url = id ? `/api/domains/${id}` : "/api/domains";
    const method = id ? "PUT" : "POST";
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.status === 401) {
      router.push("/login");
      return;
    }
    setDomainModal(null);
    await loadData();
  };

  const deleteServer = async (id: number) => {
    const res = await fetch(`/api/servers/${id}`, { method: "DELETE" });
    if (res.status === 401) {
      router.push("/login");
      return;
    }
    setDeleteConfirm(null);
    await loadData();
  };

  const deleteDomain = async (id: number) => {
    const res = await fetch(`/api/domains/${id}`, { method: "DELETE" });
    if (res.status === 401) {
      router.push("/login");
      return;
    }
    setDeleteConfirm(null);
    await loadData();
  };

  const saveTransaction = async (form: any) => {
    const res = await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.status === 401) {
      router.push("/login");
      return;
    }
    setTransactionModal(null);
    await loadData();
  };

  const deleteTransaction = async (id: number) => {
    const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });
    if (res.status === 401) {
      router.push("/login");
      return;
    }
    setDeleteConfirm(null);
    await loadData();
  };

  const handleDuplicateServer = (server: Server) => {
    setServerModal({ mode: "add", data: { ...server, id: 0, notes: [] } });
  };

  const handleDuplicateDomain = (domain: Domain) => {
    setDomainModal({ mode: "add", data: { ...domain, id: 0, notes: [] } });
  };

  return (
    <div
      style={{ minHeight: "100vh", position: "relative", overflowX: "hidden" }}
    >
      {/* Floating Animated Spheres */}
      <div className="sphere sphere-purple" />
      <div className="sphere sphere-orange" />

      {/* Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 10,

          padding: "1.5rem", 
          maxWidth: "1200px", 
          margin: "0 auto" 
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              background: "rgba(59,130,246,0.1)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src="/logo.png"
              alt="Logo"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              margin: 0,
              letterSpacing: "-0.025em",
            }}
          >
            RahatLab
          </h1>
        </div>
        <button
          onClick={logout}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.05)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
            padding: "8px 16px",
            borderRadius: "10px",
            fontSize: "0.85rem",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <Icons.LogOut /> Logout
        </button>
      </header>

      {/* Main Content */}
      <main style={{ padding: "1.5rem", maxWidth: "1200px", margin: "0 auto" }}>
        {/* Stats Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          {[
            {
              label: "Total Servers",
              value: servers.length,
              icon: <Icons.Server />,
              color: "#3b82f6",
            },
            {
              label: "Active Domains",
              value: domains.length,
              icon: <Icons.Globe />,
              color: "#10b981",
            },
            {
              label: "Finance Balance",
              value:
                transactions
                  .reduce(
                    (acc, t) =>
                      t.type === "Income" ? acc + t.amount : acc - t.amount,
                    0,
                  )
                  .toLocaleString() + " ฿",
              icon: <Icons.DollarSign />,
              color: "#f59e0b",
            },
            {
              label: "Update Logs",
              value:
                servers.reduce((acc, s) => acc + (s.notes?.length || 0), 0) +
                domains.reduce((acc, d) => acc + (d.notes?.length || 0), 0),
              icon: <Icons.Activity />,
              color: "#a78bfa",
            },
          ].map((s, idx) => (
            <div
              key={idx}
              className="glass-card"
              style={{
                borderRadius: "24px",
                padding: "1.5rem",
                display: "flex",
                alignItems: "center",
                gap: "1.25rem",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                style={{
                  background: `${s.color}15`,
                  color: s.color,
                  borderRadius: "16px",
                  padding: "14px",
                  display: "flex",
                  boxShadow: `0 0 20px ${s.color}20`,
                }}
              >
                {s.icon}
              </div>
              <div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(255,255,255,0.5)",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 800,
                    color: "white",
                  }}
                >
                  {s.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Switcher */}
        <div className="tab-container-responsive">
          <div
            className="glass-card"
            style={{
              padding: "6px",
              borderRadius: "18px",
              display: "flex",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <button
              onClick={() => setActiveTab("servers")}
              style={{
                padding: "0.75rem 1.75rem",
                borderRadius: "14px",
                border: "none",
                background:
                  activeTab === "servers"
                    ? "rgba(255,255,255,0.1)"
                    : "transparent",
                color:
                  activeTab === "servers" ? "white" : "rgba(255,255,255,0.4)",
                cursor: "pointer",
                transition: "all 0.3s",
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              Servers
            </button>
            <button
              onClick={() => setActiveTab("domains")}
              style={{
                padding: "0.75rem 1.75rem",
                borderRadius: "14px",
                border: "none",
                background:
                  activeTab === "domains"
                    ? "rgba(255,255,255,0.1)"
                    : "transparent",
                color:
                  activeTab === "domains" ? "white" : "rgba(255,255,255,0.4)",
                cursor: "pointer",
                transition: "all 0.3s",
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              Domains
            </button>
            <button
              onClick={() => setActiveTab("transactions")}
              style={{
                padding: "0.75rem 1.75rem",
                borderRadius: "14px",
                border: "none",
                background:
                  activeTab === "transactions"
                    ? "rgba(255,255,255,0.1)"
                    : "transparent",
                color:
                  activeTab === "transactions"
                    ? "white"
                    : "rgba(255,255,255,0.4)",
                cursor: "pointer",
                transition: "all 0.3s",
                fontWeight: 700,
                fontSize: "0.9rem",
              }}
            >
              Transactions
            </button>
          </div>
          {activeTab === "servers" && (
            <button
              onClick={() => setServerModal({ mode: "add" })}
              className="btn-gradient"
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Icons.Plus /> Add server
            </button>
          )}
          {activeTab === "domains" && (
            <button
              onClick={() => setDomainModal({ mode: "add" })}
              className="btn-gradient"
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Icons.Plus /> Add domain
            </button>
          )}
          {activeTab === "transactions" && (
            <button
              onClick={() => setTransactionModal({ mode: "add" })}
              className="btn-gradient"
              style={{
                padding: "0.75rem 1.5rem",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Icons.Plus /> Add Transaction
            </button>
          )}
        </div>

        {/* Content Grid */}
        {loading ? (
          <div
            style={{
              padding: "5rem",
              textAlign: "center",
              color: "var(--text-muted)",
            }}
          >
            <div style={{ fontSize: "2rem" }}>🔃</div>Loading...
          </div>
        ) : (
          <>
            {activeTab === "servers" && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "1.25rem",
                }}
              >
                {servers.length === 0 ? (
                  <p
                    style={{
                      gridColumn: "1/-1",
                      textAlign: "center",
                      color: "var(--text-muted)",
                    }}
                  >
                    No servers found.
                  </p>
                ) : (
                  servers.map((s) => (
                    <ServerCard
                      key={s.id}
                      server={s}
                      onEdit={() => setServerModal({ mode: "edit", data: s })}
                      onDelete={() =>
                        setDeleteConfirm({
                          type: "server",
                          id: s.id,
                          name: s.host,
                        })
                      }
                      onDuplicate={() => handleDuplicateServer(s)}
                      linkedDomains={domains.filter((d) => d.host === s.host)}
                    />
                  ))
                )}
              </div>
            )}
            {activeTab === "domains" && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "1.25rem",
                }}
              >
                {domains.length === 0 ? (
                  <p
                    style={{
                      gridColumn: "1/-1",
                      textAlign: "center",
                      color: "var(--text-muted)",
                    }}
                  >
                    No domains found.
                  </p>
                ) : (
                  domains.map((d) => (
                    <DomainCard
                      key={d.id}
                      domain={d}
                      onEdit={() => setDomainModal({ mode: "edit", data: d })}
                      onDelete={() =>
                        setDeleteConfirm({
                          type: "domain",
                          id: d.id,
                          name: d.domain,
                        })
                      }
                      onDuplicate={() => handleDuplicateDomain(d)}
                    />
                  ))
                )}
              </div>
            )}
            {activeTab === "transactions" && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "1rem",
                }}
              >
                {transactions.length === 0 ? (
                  <p
                    style={{
                      gridColumn: "1/-1",
                      textAlign: "center",
                      color: "var(--text-muted)",
                    }}
                  >
                    No transactions found.
                  </p>
                ) : (
                  transactions.map((t) => (
                    <div
                      key={t.id}
                      className="glass-card"
                      style={{
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "20px",
                        padding: "1.25rem 1.75rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1.5rem",
                        }}
                      >
                        <div
                          style={{
                            background:
                              t.type === "Income"
                                ? "rgba(16,185,129,0.1)"
                                : "rgba(239,68,68,0.1)",
                            color: t.type === "Income" ? "#34d399" : "#f87171",
                            borderRadius: "14px",
                            padding: "12px",
                            display: "flex",
                            boxShadow: `0 0 15px ${t.type === "Income" ? "#10b98120" : "#ef444420"}`,
                          }}
                        >
                          <Icons.DollarSign />
                        </div>
                        <div>
                          <h4
                            style={{
                              margin: 0,
                              fontSize: "1.05rem",
                              color: "white",
                              fontWeight: 700,
                            }}
                          >
                            {t.category}{" "}
                            {t.server ? (
                              <span
                                style={{
                                  color: "rgba(255,255,255,0.4)",
                                  fontSize: "0.85rem",
                                  fontWeight: 500,
                                }}
                              >
                                ({t.server.host})
                              </span>
                            ) : t.domain ? (
                              <span
                                style={{
                                  color: "rgba(255,255,255,0.4)",
                                  fontSize: "0.85rem",
                                  fontWeight: 500,
                                }}
                              >
                                ({t.domain.domain})
                              </span>
                            ) : (
                              ""
                            )}
                          </h4>
                          <p
                            style={{
                              margin: "4px 0 0",
                              fontSize: "0.85rem",
                              color: "rgba(255,255,255,0.5)",
                            }}
                          >
                            {t.description}
                          </p>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: "rgba(255,255,255,0.3)",
                              marginTop: "4px",
                            }}
                          >
                            {new Date(t.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          display: "flex",
                          alignItems: "center",
                          gap: "1.5rem",
                        }}
                      >
                        <div
                          style={{
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            color: t.type === "Income" ? "#34d399" : "#f87171",
                          }}
                        >
                          {t.type === "Income" ? "+" : "-"}
                          {t.amount.toLocaleString()} ฿
                        </div>
                        <button
                          onClick={() =>
                            setDeleteConfirm({
                              id: t.id,
                              name: `${t.category} (${t.amount})`,
                              type: "transaction",
                            })
                          }
                          style={{
                            background: "rgba(239,68,68,0.1)",
                            color: "#f87171",
                            border: "none",
                            borderRadius: "6px",
                            padding: "6px",
                            cursor: "pointer",
                          }}
                        >
                          <Icons.Trash2 />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Modals */}
      {serverModal && (
        <Modal
          title={
            serverModal.mode === "add" ? "Add New Server" : "Update Server"
          }
          onClose={() => setServerModal(null)}
        >
          <ServerForm
            initial={serverModal.data}
            onSave={(data) => saveServer(data, serverModal.data?.id)}
            onCancel={() => setServerModal(null)}
          />
        </Modal>
      )}
      {domainModal && (
        <Modal
          title={
            domainModal.mode === "add" ? "Add New Domain" : "Update Domain"
          }
          onClose={() => setDomainModal(null)}
        >
          <DomainForm
            initial={domainModal.data}
            servers={servers}
            onSave={(data) => saveDomain(data, domainModal.data?.id)}
            onCancel={() => setDomainModal(null)}
          />
        </Modal>
      )}
      {transactionModal && (
        <Modal
          title="Add Transaction"
          onClose={() => setTransactionModal(null)}
        >
          <TransactionForm
            servers={servers}
            domains={domains}
            onSave={saveTransaction}
            onCancel={() => setTransactionModal(null)}
          />
        </Modal>
      )}
      {deleteConfirm && (
        <Modal title="Confirm Action" onClose={() => setDeleteConfirm(null)}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#ef4444", marginBottom: "1rem" }}>
              <Icons.Trash2 />
            </div>
            <p
              style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}
            >
              Are you sure you want to delete{" "}
              <strong style={{ color: "var(--text-primary)" }}>
                {deleteConfirm.name}
              </strong>
              ?
            </p>
            <div
              style={{ display: "flex", gap: "10px", justifyContent: "center" }}
            >
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  padding: "0.6rem 2rem",
                  background: "transparent",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  deleteConfirm.type === "server"
                    ? deleteServer(deleteConfirm.id)
                    : deleteConfirm.type === "domain"
                      ? deleteDomain(deleteConfirm.id)
                      : deleteTransaction(deleteConfirm.id)
                }
                style={{
                  padding: "0.6rem 2rem",
                  background: "#ef4444",
                  borderRadius: "8px",
                  color: "white",
                  border: "none",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      <style jsx global>{`
        .icon-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border);
          border-radius: 6px;
          padding: 6px;
          color: var(--text-muted);
          cursor: pointer;
          transition: 0.2s;
          display: flex;
        }
        .icon-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: var(--text-primary);
          border-color: var(--text-muted);
        }
        @media (max-width: 640px) {
          main {
            padding: 1rem;
          }
          header {
            padding: 0 1rem;
          }
        }
      `}</style>
    </div>
  );
}
