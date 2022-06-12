import React from "react";
import Image from "next/image";

function ProjBlock({
  imgSrc,
  name,
  description,
}: {
  imgSrc: string;
  name: string;
  description: string;
}) {
  return (
    <div className="flex flex-col w-full md:w-1/2  bg-green-50/40 dark:bg-green-100/20 rounded-lg shadow-lg p-1">
      <Image
        src={imgSrc}
        alt="presentation image"
        width={500}
        height={300}
        className="rounded"
      />

      <p className="text-xl font-WorkSans px-2 py-2 font-medium text-neutral-600 dark:text-neutral-100">
        <a
          href="https://calendar-sable-theta.vercel.app/"
          className="hover:text-green-800/80 dark:hover:text-lime-100"
          target="_blank"
          rel="noreferrer"
        >
          {name}{" "}
        </a>
      </p>
      <p className="px-2 pb-1 text-neutral-600 text-sm dark:text-neutral-200">
        {description}
      </p>
    </div>
  );
}

export default ProjBlock;
