import { type iResponseCount } from "@/app/api/count/[count]/route";
import Image, { type StaticImageData } from "next/image";

export interface iProps {
  item: iResponseCount["elements"][0];
  imageRef: string | StaticImageData;
}

const ListItemServerSide = ({ item, imageRef }: iProps) => {
  return (
    <div className="flex gap-2 rounded-md border-2 p-2">
      <Image
        src={imageRef}
        alt={item.name}
        height={60}
        width={120}
        loading="lazy"
        placeholder="blur"
        blurDataURL="L00]Xfj[4nfQayfQj[j[4nfQ_3j["
      />
      <strong>{item.name}</strong>
      <p>{item.desc}</p>
    </div>
  );
};

export default ListItemServerSide;
