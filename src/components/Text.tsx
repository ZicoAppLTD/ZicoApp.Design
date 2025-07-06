import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

const Text = ({
     children,
     className,
     persianClassName,
}: {
     children: React.ReactNode,
     className?: string,
     persianClassName?: string,
}) => {
     const locale = useLocale()

     return (
          <div className={cn(
               locale === "fa" && "tracking-[-1px]",
               locale === "en" && "tracking-[-0.8px]",
               className,
               locale === "fa" && persianClassName
          )}>
               {children}
          </div>
     );
}

export default Text;