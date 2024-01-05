
import { ModeToggle } from "@/components/mode-toggle";
import { db } from "@/lib/db";

const Server = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {



  const server = await db.server.findUnique({
    where : {
      id  : params.id
    }
  })


  console.log(server)

  return <div>
   {
    params.id
   }
  </div>;
};

export default Server;
