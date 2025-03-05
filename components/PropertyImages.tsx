import Image from "next/image";
import React from "react";

const PropertyImages = ({ images }: { images: string[] }) => {
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt=""
            className="object-cover h-[400px] mx-auto rounded-xl"
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div className="col-span-1" key={index}>
                <Image
                  key={index}
                  src={image}
                  alt=""
                  className="object-cover h-[400px] w-full rounded-xl"
                  width="0"
                  height="0"
                  sizes="100vw"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyImages;
