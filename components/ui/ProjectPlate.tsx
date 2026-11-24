import Image from "next/image";

export function ProjectPlate({
  src,
  alt,
  priority = false,
}: {
  src?: string;
  alt: string;
  priority?: boolean;
}) {
  if (!src) {
    return (
      <div className="plate is-empty" role="img" aria-label={`${alt} — preview pending`}>
        <span className="plate-empty-label">Visual pending</span>
        <b>{alt}</b>
      </div>
    );
  }

  return (
    <div className="plate">
      <Image
        src={src}
        alt={alt}
        width={800}
        height={500}
        sizes="(max-width: 1023px) 80vw, 42vw"
        priority={priority}
        className="plate-img"
      />
    </div>
  );
}
