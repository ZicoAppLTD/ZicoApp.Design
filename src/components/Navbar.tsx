"use client"

import { useTranslations } from "next-intl";
import Button from "./Button";
import Text from "./Text";
import Link from "next/link";
import MenuIcon from "./icons/MenuIcon";
import Container from "./Container";
import { navbarItems } from "@/config/values";
import { useModal } from "@/hooks/use-modal-store";

const Navbar = () => {
     const tGeneral = useTranslations("general")

     const { onModalOpen } = useModal()

     return (
          <div className="w-full flex justify-center">
               <Container>
                    <div className="flex py-[25px] justify-between items-center border-b border-primary/5">
                         <div className="flex gap-x-[35px] items-center">
                              <Text className="flex flex-grow text-[22px] md:text-[25px] font-semibold text-zinc-600 tracking-[-1.5px]">
                                   <Link href="/">
                                        {tGeneral("app_name")}
                                   </Link>
                              </Text>

                              <div className="hidden sm:flex gap-x-[25px]">
                                   {navbarItems.map((item) => (
                                        <Link
                                             key={item.id}
                                             href={item.href}>
                                             <Text className="w-max text-[18px] font-medium text-zinc-600/80 hover:text-zinc-800 transition-all duration-500">
                                                  {tGeneral(item.title.split('.')[1])}
                                             </Text>
                                        </Link>
                                   ))}
                              </div>
                         </div>

                         <div className="flex items-center gap-x-[20px]">
                              <div className="block sm:hidden cursor-pointer text-zinc-600">
                                   <MenuIcon />
                              </div>

                              <Button
                                   variant="outline"
                                   onClick={() => onModalOpen("free_consultation_session")}
                                   className="hidden sm:block">
                                   {tGeneral("get_licence")}
                              </Button>
                         </div>
                    </div>
               </Container>
          </div>
     );
}

export default Navbar;