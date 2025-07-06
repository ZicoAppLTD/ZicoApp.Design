"use client"

import Link from "next/link";
import Text from "./Text";
import { useTranslations } from "next-intl";
import Container from "./Container";

const Footer = () => {
     const tGeneral = useTranslations("general")

     return (
          <div className="w-full flex justify-center">
               <Container>
                    <div className="flex flex-col sm:flex-row-reverse gap-y-[25px] justify-between items-center py-[25px] border-t-[1px] border-zinc-600/5">
                         <div className="flex w-full sm:w-auto items-center gap-x-[20px]">
                              <Link href="/privacy">
                                   <Text className="w-max text-[15px] text-zinc-600/80 hover:text-zinc-800 transition-all duration-500">
                                        {tGeneral("privacy_policy")}
                                   </Text>
                              </Link>
                              <Link href="/terms">
                                   <Text className="w-max text-[15px] text-zinc-600/80 hover:text-zinc-800 transition-all duration-500">
                                        {tGeneral("terms_of_use")}
                                   </Text>
                              </Link>
                         </div>

                         <Text className="text-zinc-600/80 text-[15px] tracking-[-0.8px] w-full">
                              {tGeneral("app_name")} / {tGeneral("all_rights_reserved")}
                         </Text>
                    </div>
               </Container>
          </div>
     );
}

export default Footer;