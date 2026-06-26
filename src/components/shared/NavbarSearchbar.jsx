"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";

const NavbarSearchBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("search") || "");

    // URL change হলে input update হবে
    useEffect(() => {
        setSearch(searchParams.get("search") || "");
    }, [searchParams]);

    useEffect(() => {
             if (pathname !== "/lawyers") {

            if (search.trim()) {
                router.push(`/lawyers?search=${encodeURIComponent(search)}&page=1`);
            }

            return;
        }
        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());

            if (search.trim()) {
                params.set("search", search);
            } else {
                params.delete("search");
            }

            params.set("page", "1");

            router.push(`/lawyers?${params.toString()}`);
        }, 200);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        <div className="relative w-full">
            <IoSearchOutline
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
                type="text"
                placeholder="Search lawyers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );
};

export default NavbarSearchBar;