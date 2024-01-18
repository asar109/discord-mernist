"use client";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { useModal } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FileUpload from "../file-upload";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export const SendFileUrl = () => {
  const router = useRouter();
  const { isOpen, onClose, data, type } = useModal();
  const { apiUrl, query } = data;
  const dailogOpen = isOpen && type === "sendFile";

  // Create a form schema
  const formSchema = z.object({
    fileUrl: z.string().min(1, {
      message: "Please attach a file",
    }),
  });

  //  define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: "",
    },
  });

  const { isSubmitting } = form.formState;

  //  submit handler
  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || "",
        query,
      });
      await axios.post(url, {
        ...values,
        content: values.fileUrl,
      });
      form.reset();
      router.refresh();
      onCloseHandler();
    } catch (error) {
      console.log(error);
    }
  };

  const onCloseHandler = () => {
    onClose();
    form.reset();
  };

  return (
    <Dialog open={dailogOpen} onOpenChange={onCloseHandler}>
      <DialogContent className="bg-white  p-0 text-black overflow-hidden">
        <DialogHeader className="text-center">
          <DialogTitle className="mt-8 text-bold px-6 text-2xl text-center">
            Add an attachement
          </DialogTitle>
          <DialogDescription className="text-center">
            <p className="text-sm text-zinc-500">Send a file as a message</p>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-8"
          >
            <div className="space-y-8 px-6">
              <div className="flex justify-center items-center text-center">
                <FormField
                  name="fileUrl"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex flex-col gap-2">
                      <FileUpload
                        endpoint="messageFile"
                        value={field.value}
                        onChange={field.onChange}
                      />
                  <FormMessage />
                    </div>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isSubmitting} type="submit" variant={"primary"}>
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
