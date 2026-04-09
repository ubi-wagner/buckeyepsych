import { prisma } from "./db";

export async function recordRevision(args: {
  entityType: string;
  entityId: string;
  data: unknown;
  authorId?: string | null;
  authorEmail?: string | null;
  action?: string;
  note?: string;
}) {
  try {
    await prisma.revision.create({
      data: {
        entityType: args.entityType,
        entityId: args.entityId,
        data: args.data as never,
        authorId: args.authorId ?? null,
        authorEmail: args.authorEmail ?? null,
        action: args.action ?? "update",
        note: args.note ?? "",
      },
    });
  } catch (err) {
    // Don't let revision failures block the main write
    console.error("[revision] failed to record", err);
  }
}
