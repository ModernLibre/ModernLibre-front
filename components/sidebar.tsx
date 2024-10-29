'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { 
  Library, 
  Download, 
  Star, 
  Clock,
  Heart,
  BookMarked,
  Tags
} from 'lucide-react'

const categories = [
  "Fiction",
  "Non-Fiction",
  "Science",
  "Technology",
  "History",
  "Biography",
  "Self-Help",
  "Business",
  "Art & Design",
  "Cooking"
]

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Library</h2>
          <div className="space-y-1">
            <Button
              variant={pathname === '/library' ? 'secondary' : 'ghost'}
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href="/library">
                <Library className="h-4 w-4" />
                All Books
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Download className="h-4 w-4" />
              Downloaded
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Star className="h-4 w-4" />
              Top Rated
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Clock className="h-4 w-4" />
              Recently Added
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Heart className="h-4 w-4" />
              Favorites
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <BookMarked className="h-4 w-4" />
              Reading List
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            <div className="flex items-center gap-2">
              <Tags className="h-4 w-4" />
              Categories
            </div>
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={pathname === `/categories/${category.toLowerCase().replace(' ', '-')}` ? 'secondary' : 'ghost'}
                  className="w-full justify-start font-normal"
                  asChild
                >
                  <Link href={`/categories/${category.toLowerCase().replace(' ', '-')}`}>
                    {category}
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}