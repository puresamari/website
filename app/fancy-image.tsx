import classNames from 'classnames';
import Image from 'next/image';

export const FancyImage = ({
  src,
  width,
  height,
  alt,
  className,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  className: string;
}) => {
  return (
    <div className={classNames('p-[3rem] relative', className)}>
      <Image src={src} className="h-full w-auto" width={width} height={height} alt={alt} />
      <div className="absolute inset-[3rem]">
        {new Array(6).fill(null).map((_, i) => (
          <Image
            className={classNames('absolute inset-0 mix-blend-screen opacity-50 ', {
              'backdrop-hue-rotate-90': i % 3 === 0,
              'backdrop-hue-rotate-180': i % 3 === 0,
              'backdrop-hue-rotate-270': i % 3 === 0,
            })}
            style={{ transform: `translate(${-(i - 3)}rem, ${i - 3}rem)` }}
            key={i}
            src={src}
            width={width}
            height={height}
            alt={alt}
          />
        ))}
        <Image
          className={classNames('absolute inset-0 z-2')}
          src={src}
          width={width}
          height={height}
          alt={alt}
        />
      </div>
    </div>
  );
};
