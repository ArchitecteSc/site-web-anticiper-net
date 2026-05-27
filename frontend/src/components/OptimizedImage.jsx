import React from "react";

/**
 * Optimized image with WebP + fallback (JPEG by default, PNG for transparent assets).
 * Pictures live in /public/images/{name}.webp and /public/images/{name}.{fallbackExt}
 */
export const OptimizedImage = ({
  name,
  alt,
  className = "",
  style,
  loading = "lazy",
  width,
  height,
  fallbackExt = "jpg",
  ...rest
}) => {
  const webp = `/images/${name}.webp`;
  const fallback = `/images/${name}.${fallbackExt}`;

  return (
    <picture>
      <source srcSet={webp} type="image/webp" />
      <img
        src={fallback}
        alt={alt}
        className={className}
        style={style}
        loading={loading}
        decoding="async"
        width={width}
        height={height}
        {...rest}
      />
    </picture>
  );
};

export default OptimizedImage;
