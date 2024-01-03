import { streamQuality } from './const';

export function paintToCanvas(
  videoRef: React.RefObject<HTMLVideoElement>,
  photoRef: React.RefObject<HTMLCanvasElement>,
  colorRef: React.RefObject<HTMLDivElement>
) {
  const { width, height } = streamQuality;
  const video = videoRef.current;
  const photo = photoRef.current;
  const ctx = photo?.getContext('2d');

  if (photo) {
    photo.width = width;
    photo.height = height;
  }

  return setInterval(() => {
    const color = colorRef.current;

    if (video) {
      ctx?.drawImage(video, 0, 0, width, height);
    }

    const pixels = ctx?.getImageData(0, 0, width, height);

    if (color) {
      color.style.backgroundColor = `rgb(${pixels?.data[0]},${pixels?.data[1]},${pixels?.data[2]})`;
    }
  }, 0);
}
