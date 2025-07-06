"use client"

import { useModal } from "@/hooks/use-modal-store"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import Text from "../Text";
import Button from "../Button";
import { useTranslations } from "use-intl";

const GetLicence = () => {
     const { isModalOpen, onModalClose, type } = useModal()
     const tGeneral = useTranslations("general")

     const isOpen = isModalOpen && type === "free_consultation_session"

     return (
          <Dialog open={isOpen} onOpenChange={onModalClose}>
               <DialogContent className="max-w-[450px] border-[2px] border-primary/5 px-0 py-0">
                    <VisuallyHidden.Root>
                         <DialogTitle />
                         <DialogDescription />
                    </VisuallyHidden.Root>

                    <div className="flex flex-col sm:flex-row">
                         <div className="flex flex-col flex-grow justify-center md:min-h-auto gap-y-[10px] px-[30px] py-[25px]">
                              <Text className="text-[28px] font-bold text-primary text-start tracking-[-1.5px] leading-[3rem] mt-[25px]">
                                   {tGeneral("get_licence_full")}
                              </Text>

                              <div className="flex gap-x-[15px]">
                                   <Text className="text-zinc-600 text-[18px] font-medium leading-[2rem]">
                                        {tGeneral("lorem")}
                                   </Text>
                              </div>

                              <Button className="w-full mt-[25px] mb-[30px]">
                                   {tGeneral("free_consultation")}
                              </Button>
                         </div>

                         <DialogPrimitive.Close className="absolute top-0 left-0 outline-none ring-0">
                              <X className="font-light size-[35px] text-zinc-800 rounded-full border border-zinc-600/10 p-[5px] mt-[20px] ml-[20px] hover:text-zinc-950 cursor-pointer transition-all duration-500 backdrop-blur-md bg-neutral-600/[3%] hover:bg-neutral-600/[6%] hover:border-zinc-600/15" />
                         </DialogPrimitive.Close>
                    </div>
               </DialogContent>
          </Dialog>
     )
}

export default GetLicence;