import { prisma } from "@/lib/db";
import { publicFileUrl } from "@/lib/storage";

export type MediaSlot =
  | "site.logo"
  | "home.hero"
  | "home.hero_overlay"
  | "about.portrait"
  | "about.banner"
  | "services.banner"
  | "contact.banner";

interface Props {
  slot: MediaSlot | string;
  className?: string;
  alt?: string;
  fallback?: React.ReactNode;
  imgClassName?: string;
}

export async function MediaImage({
  slot,
  className,
  imgClassName,
  alt,
  fallback,
}: Props) {
  let media: { fileName: string; alt: string } | null = null;
  try {
    media = await prisma.media.findUnique({
      where: { slot },
      select: { fileName: true, alt: true },
    });
  } catch {
    // ignore
  }
  if (!media) {
    return <>{fallback ?? null}</>;
  }
  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={publicFileUrl(media.fileName)}
        alt={alt || media.alt || ""}
        className={
          imgClassName ?? "h-full w-full object-cover"
        }
      />
    </div>
  );
}
