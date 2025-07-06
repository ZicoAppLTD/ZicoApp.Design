import { cn } from "@/lib/utils";
import React from "react";

const Container = ({
     children,
     className,
}: {
     children?: React.ReactNode,
     className?: String
}) => {
     return (
          <div className={cn(
               "max-w-6xl w-full px-[30px] xl:px-0",
               className
          )}>
               {children}
          </div>
     );
}

export default Container;