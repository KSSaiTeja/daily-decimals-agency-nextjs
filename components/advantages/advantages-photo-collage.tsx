import type { CSSProperties } from "react";
import { ADVANTAGES_PHOTO_COLLAGE } from "@/components/advantages/data";

export function AdvantagesPhotoCollage() {
  return (
    <div className="advantages-photo-collage" aria-hidden>
      {ADVANTAGES_PHOTO_COLLAGE.map((photo, index) => (
        <div
          key={photo.src}
          className="advantages-photo-collage__item"
          data-advantages-image
          style={
            {
              "--photo-rotation": `${photo.rotation}deg`,
              "--photo-index": index,
            } as CSSProperties
          }
        >
          <div className="advantages-photo-collage__frame">
            <img alt="" className="advantages-photo-collage__image" src={photo.src} />
          </div>
        </div>
      ))}
    </div>
  );
}
