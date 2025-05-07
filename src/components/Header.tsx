
import { Link } from "react-router-dom";
import { Music, Home, BookOpen, FileAudio, Info, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-music-surface py-4 sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Music className="h-6 w-6 text-music-primary" />
          <h1 className="text-xl font-semibold">Chordsify</h1>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to="/">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Home size={16} />
                    <span>Home</span>
                  </Button>
                </Link>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-1">
                  <BookOpen size={16} />
                  <span>Library</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[200px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/saved-tabs"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">Saved Tabs</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            View your saved guitar tablatures
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/favorites"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">Favorites</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Access your favorite chord progressions
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger className="flex items-center gap-1">
                  <FileAudio size={16} />
                  <span>Tools</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 w-[220px]">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/chord-finder"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">Chord Finder</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Find chord shapes and fingerings
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/metronome"
                          className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          )}
                        >
                          <div className="text-sm font-medium leading-none">Metronome</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Practice with adjustable tempo
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <Link to="/about">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <Info size={16} />
                    <span>About</span>
                  </Button>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          <ThemeToggle />
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <ChevronDown className={`h-5 w-5 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden py-2 px-4 bg-background border-t border-music-surface">
          <nav className="flex flex-col space-y-2">
            <Link to="/" className="flex items-center gap-2 py-2 hover:text-music-primary">
              <Home size={16} />
              <span>Home</span>
            </Link>
            <Link to="/saved-tabs" className="flex items-center gap-2 py-2 hover:text-music-primary">
              <BookOpen size={16} />
              <span>Saved Tabs</span>
            </Link>
            <Link to="/favorites" className="flex items-center gap-2 py-2 hover:text-music-primary">
              <BookOpen size={16} />
              <span>Favorites</span>
            </Link>
            <Link to="/chord-finder" className="flex items-center gap-2 py-2 hover:text-music-primary">
              <FileAudio size={16} />
              <span>Chord Finder</span>
            </Link>
            <Link to="/metronome" className="flex items-center gap-2 py-2 hover:text-music-primary">
              <FileAudio size={16} />
              <span>Metronome</span>
            </Link>
            <Link to="/about" className="flex items-center gap-2 py-2 hover:text-music-primary">
              <Info size={16} />
              <span>About</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
