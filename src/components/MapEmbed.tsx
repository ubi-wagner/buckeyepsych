interface Props {
  address: string;
  className?: string;
}

export default function MapEmbed({ address, className }: Props) {
  if (!address) return null;
  const q = encodeURIComponent(address);
  const src = `https://www.google.com/maps?q=${q}&output=embed`;
  return (
    <div
      className={
        className ?? "overflow-hidden rounded-2xl border border-brand-100 bg-white"
      }
    >
      <iframe
        src={src}
        title={`Map to ${address}`}
        width="100%"
        height="360"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export function mapsLink(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}
