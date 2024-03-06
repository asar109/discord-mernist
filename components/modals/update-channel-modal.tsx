"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useModal } from "@/hooks/use-modal-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChannelType } from "@prisma/client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const UpdateChannelModal = () => {
  const { isOpen, onClose, type, data }  = useModal();
  const { channel, channelType } = data;
  const router = useRouter();
   const params = useParams();
  const id = params ? params.id : null;
  const isModalOpen = isOpen && type === "editChannel";

  // Create a form schema
  const formSchema = z.object({
    name: z
      .string()
      .min(1, {
        message: "Channel name is required",
      })
      .refine((name) => name !== "general", {
        message: "Channel name cannot be 'general'",
      }),
    type: z.nativeEnum(ChannelType),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: channel?.type || ChannelType.TEXT,
    }
  });

  useEffect(() => {
   if (channel) {
    form.setValue("name", channel?.name);
    form.setValue("type", channel?.type);
   }
  }, [form, channel , isOpen]);


  const isLoading = form.formState.isSubmitting;

  const { isSubmitting } = form.formState;

  //  submit handler

  const submitHandler = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: "/api/channels",
        query: {
          channelId: channel?.id,
          serverId: id,
        },
      });

      await axios.patch(url, values);
      form.reset();
      router.refresh();
      onClose();
      toast.success("Channel updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const onCloseHandler = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onCloseHandler}>
      <DialogContent className="bg-white  p-0 text-black overflow-hidden">
        <DialogHeader className="text-center">
          <DialogTitle className="mt-8 text-bold px-6 text-2xl text-center">
            Edit Channel
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="space-y-8"
          >
            <div className="space-y-8 px-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Channel name
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled={isLoading}
                        className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                        placeholder="Enter channel name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Channel Type</FormLabel>
                    <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                          <SelectValue placeholder="Select a channel type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(ChannelType).map((type) => (
                          <SelectItem
                            key={type}
                            value={type}
                            className="capitalize"
                          >
                            {type.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button disabled={isSubmitting} type="submit" variant={"primary"}>
                Update
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
