"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function SearchBar() {
    const [query, setQuery] = useState("")

    return (
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full bg-gray-100 border-none"
            />
        </div>
    )
}
