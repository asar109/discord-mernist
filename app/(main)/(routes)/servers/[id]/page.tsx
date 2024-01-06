
import { ModeToggle } from "@/components/mode-toggle";
import { db } from "@/lib/db";

const Server = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {




  return <div>
   {
    params.id
   }
  </div>;
};

export default Server;
