import type { ArticleImage as ImageData } from "@/lib/articles";

export function ArticleImage({ image, alt, eager = false }: { image: ImageData; alt: string; eager?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={image.src}
      alt={alt}
      className="photo"
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      referrerPolicy="no-referrer"
    />
  );
}
