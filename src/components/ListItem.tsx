import Image from "next/image";

import { type iResponseCount } from "@/app/api/count/[count]/route";
import PlaceholderIMG from "@/images/placeholder.webp";

export interface iProps {
  item: iResponseCount["elements"][0];
}

const ListItem = ({ item }: iProps) => {
  return (
    <div className="flex gap-2 rounded-md border-2 p-2">
      <Image
        src={PlaceholderIMG}
        alt={item.name}
        height={60}
        width={120}
        loading="lazy"
        placeholder="blur"
        className="object-contain"
      />
      <strong>{item.name}</strong>
      <p>{item.desc}</p>
    </div>
  );
};
export default ListItem;
