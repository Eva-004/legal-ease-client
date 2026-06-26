import { headers } from "next/headers";
import { auth } from "./auth";

export const featuredLawyers = async()=>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured-lawyers`);
  const lawyers = await res.json();
  return lawyers;
}

