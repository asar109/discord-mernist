"use client";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogContent,
} from "../ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Create a form schema
  const formSchema = z.object({
    name: z.string().min(1, {
      message: "Please enter a server name",
    }),
    imageUrl: z.string().min(1, {
      message: "Please add an image",
    }),
  });

  //  define the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  //  submit handler

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("called");
    console.log(values);
  }

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent className="bg-white  p-0 text-black overflow-hidden">
        <DialogHeader className="text-center">
          <DialogTitle className="mt-8 text-bold px-6 text-2xl text-center">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center">
            <p className="text-sm text-zinc-500">
              Give your server a personality with a name and an image You can
              always change this later
            </p>
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex justify-center items-center text-center">
                :TODO
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                      Server name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the server name" disabled={isLoading} className="bg-zinc-300/50 focus-visible:ring-0 focus-visible:ring-offset-0" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-100 px-6 py-4">
              <Button  disabled={isLoading} variant={'primary'} >
                Create 
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
