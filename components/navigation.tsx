"use client"


import { useState } from "react";
import { Menu } from "lucide-react";
import { useMedia} from "react-use"
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { NavButton } from "@/components/nav-button";
import { 
    Sheet,
    SheetContent,
    SheetTrigger,

} from "@/components/ui/sheet"


const routes = [
    {
      href: '/',
      label: 'Visão Geral'
    },
    {
      href: '/transactions',
      label: 'Transações'
    },
    {
      href: '/accounts',
      label: 'Contas'
    },
    {
      href: '/categories',
      label: 'Categorias'
    },
    {
      href: '/settings',
      label: 'Configurações'
    }, 
]

export const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);

    const router = useRouter();
    const pathname = usePathname();
    const isMobile = useMedia("(max-width: 1024px)", false);

    

    const onClick = (href: string) => {
        router.push(href)
        setIsOpen(false)
    };

    if (isMobile) {
        return (
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                {/** icone do menu na versão mobile*/}
                <SheetTrigger >
                    <Button
                      variant='outline'
                      size='sm'
                      className="font-normal bg-white/10 hover:bg-white/20 hover:text-white border-none focus-visible:ring-offset-0 focus-visible:ring-transparent outline-none text-white focus:bg-white/30 transition"
                    >
                        <Menu className="size-4" />
                    </Button>
                </SheetTrigger>
                {/** barra de navegação versão mobile */}
                <SheetContent side='left' className='px-2'>
                    <nav className="flex flex-col gap-y-2 pt-6">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.href === pathname ? 'secondary' : 'ghost'}
                                onClick={() => onClick(route.href)}
                                className="w-full justify-start"
                            >
                                {route.label}
                            </Button>
                        ))}
                    </nav>
                </SheetContent>
            </Sheet>
        );
    };

    return (
        <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">

           {routes.map((route) => (
              <NavButton
                key={route.href}
                href={route.href}
                label={route.label}
                isActive={pathname === route.href}
               />
           ))}

        </nav>
        
    );
};