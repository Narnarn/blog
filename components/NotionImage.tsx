export const getMediaCtx = (value: any) => {
  const src = value.type === "external" ? value.external.url : value.file.url;
  const expire = value.type === "file" ? value.file.expiry_time : null;
  const caption = value.caption[0] ? value.caption[0].plain_text : "";
  return { src, caption, expire };
};

const NotionImage = ({ value }: { value: any }) => {
  const { src: imageSrc, caption: imageCaption } = getMediaCtx(value);
  const {
    dim: { width, height },
  } = value || {};

  return (
    <figure>
      {width && height ? (
        <img
          src={imageSrc}
          alt={imageCaption}
          width={width}
          height={height}
          className="my-4 shadow-sm"
        />
      ) : (
        <img src={imageSrc} alt={imageCaption} className="rounded" />
      )}
      {imageCaption && (
        <figcaption className="text-center my-4 p-2 shadow-sm">
          {imageCaption}
        </figcaption>
      )}
    </figure>
  );
};

export default NotionImage;
