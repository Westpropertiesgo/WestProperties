"use client";

import { useState } from "react";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const switchMode = (next: "signin" | "signup") => {
    setMode(next);
    setSubmitted(false);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-ink/60 p-4 py-10 backdrop-blur-sm md:py-16"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-md bg-ivory shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center bg-ink text-ivory transition-colors hover:bg-brass hover:text-ink"
        >
          <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
            <path d="M4 4L16 16M16 4L4 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>

        <div className="p-8 md:p-10">
          <span className="plaque">
            {mode === "signin" ? "Welcome Back" : "Join West Properties"}
          </span>
          <h2 className="mt-4 font-display text-2xl font-medium text-ink">
            {mode === "signin" ? "Log In To Your Account" : "Create Your Account"}
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-ink/55">
            {mode === "signin"
              ? "Access your saved listings, searches, and consultation history."
              : "Save listings, track new matches, and pick up your search anytime."}
          </p>

          {/* Mode toggle */}
          <div className="mt-7 flex border border-stone-line">
            <button
              type="button"
              onClick={() => switchMode("signin")}
              className={`flex-1 py-2.5 font-mono text-[11px] uppercase tracking-widest2 transition-colors ${
                mode === "signin" ? "bg-ink text-ivory" : "text-ink/50 hover:text-ink"
              }`}
            >
              Log In
            </button>
            <button
              type="button"
              onClick={() => switchMode("signup")}
              className={`flex-1 py-2.5 font-mono text-[11px] uppercase tracking-widest2 transition-colors ${
                mode === "signup" ? "bg-ink text-ivory" : "text-ink/50 hover:text-ink"
              }`}
            >
              Sign Up
            </button>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-1">
              {mode === "signup" && (
                <input type="text" placeholder="Full name" className="field" required />
              )}
              <input type="email" placeholder="Email address" className="field" required />
              <input type="password" placeholder="Password" className="field" required />
              {mode === "signup" && (
                <input type="password" placeholder="Confirm password" className="field" required />
              )}

              {mode === "signin" && (
                <div className="mt-3 flex justify-end">
                  <a href="#" className="font-mono text-[11px] uppercase tracking-widest2 text-ink/45 hover:text-brass-dark">
                    Forgot password?
                  </a>
                </div>
              )}

              <button type="submit" className="btn-primary mt-7 w-full">
                {mode === "signin" ? "Log In" : "Create Account"}
              </button>

              <p className="mt-5 text-center text-[12px] text-ink/50">
                {mode === "signin" ? (
                  <>
                    Don&rsquo;t have an account?{" "}
                    <button type="button" onClick={() => switchMode("signup")} className="text-brass-dark hover:underline">
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button type="button" onClick={() => switchMode("signin")} className="text-brass-dark hover:underline">
                      Log in
                    </button>
                  </>
                )}
              </p>
            </form>
          ) : (
            <div className="mt-8 flex flex-col items-start gap-3 border-t border-stone-line pt-6">
              <span className="plaque">
                {mode === "signin" ? "Signed In" : "Account Created"}
              </span>
              <p className="text-[14px] leading-relaxed text-ink/65">
                {mode === "signin"
                  ? "You're logged in. This is a design preview, so no real account has been accessed."
                  : "Welcome to West Properties! This is a design preview, so no real account has been created yet."}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="btn-outline mt-2"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
