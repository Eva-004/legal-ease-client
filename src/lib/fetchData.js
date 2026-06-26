

export const featuredLawyers = async()=>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/featured-lawyers`);
  const lawyers = await res.json();
  return lawyers;
}

export const topLawyers = async()=>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/top-lawyers`);
  const lawyers = await res.json();
  return lawyers;
}

