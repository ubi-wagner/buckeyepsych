import { getIronSession, SessionOptions } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "./db";

export type SessionData = {
  userId?: string;
  email?: string;
};

const password =
  process.env.SESSION_SECRET ||
  "this-is-a-dev-only-fallback-secret-please-change-me-32chars";

if (password.length < 32) {
  console.warn(
    "[session] SESSION_SECRET is shorter than 32 characters. Set a real one in production."
  );
}

export const sessionOptions: SessionOptions = {
  cookieName: "bp_session",
  password,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  },
};

export async function getSession() {
  return getIronSession<SessionData>(cookies(), sessionOptions);
}

export async function getCurrentUser() {
  const session = await getSession();
  if (!session.userId) return null;
  return prisma.user.findUnique({ where: { id: session.userId } });
}

export async function requireAdmin() {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  return user;
}
