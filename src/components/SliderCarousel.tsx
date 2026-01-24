import { Carousel } from 'flowbite-react';

type Slide = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

type Props = {
  slides: Slide[];
  className?: string;
};

export default function SliderCarousel({ slides, className = 'h-full' }: Props) {
  if (slides.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <Carousel className="h-full">
        {slides.map((slide, index) => (
          <img
            key={slide.src}
            src={slide.src}
            width={slide.width}
            height={slide.height}
            alt={slide.alt}
            loading={index === 0 ? 'eager' : 'lazy'}
            className="h-full w-full object-cover"
          />
        ))}
      </Carousel>
    </div>
  );
}
