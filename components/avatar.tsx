import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface AvatarComponentProps {
  src?: string;
  classNames?: string;
}

const AvatarComponent = ({ src, classNames }: AvatarComponentProps) => {
  return (
    <Avatar>
      <AvatarImage  className={cn("", classNames)} src={src} />
      <AvatarFallback>
        <Loader2 className="animate-spin " />
      </AvatarFallback>
    </Avatar>
  );
};

export default AvatarComponent;
