"use client";

import { useEffect, useTransition } from "react";
import { THamletFormInput } from "../_config/dto/hamlet.type";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { HamletInputSchema } from "../_config/dto/hamlet.zod";

interface HamletFormProps {
  initialData?: THamletFormInput | null;
  setModal?: () => void;
}

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader2, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import slugify from "slugify";
import { createHamlet } from "../_config/actions/createHamlet.action";

const HamletForm = ({ initialData, setModal }: HamletFormProps) => {
  const isEditing = !!initialData;

  const [isPending, startTransition] = useTransition();

  const form = useForm<THamletFormInput>({
    resolver: zodResolver(HamletInputSchema),
    defaultValues: initialData || {
      name: "",
      slug: "",
      descriptions: "",
    },
  });

  const nameValue = form.watch("name");

  useEffect(() => {
    if (!nameValue) {
      form.setValue("slug", "");
      return;
    }

    const slug = slugify(nameValue, {
      lower: true,
      strict: true,
      trim: true,
    });

    form.setValue("slug", slug, { shouldValidate: true });
  }, [nameValue, form]);

  const handleSubmit = (value: THamletFormInput) => {
    startTransition(async () => {
      try {
        if (isEditing) {
        } else {
          const res = await createHamlet(value);

          if (!res.success) {
            toast.error(res.message);
            return;
          }

          toast.success(res.message);
          if (setModal) {
            setModal();
          }
        }
      } catch (error) {
        toast.error("Ups!, terjadi kesalahan!");
      }
    });
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel className="font-semibold">
                Nama Dusun
                <span className="text-rose-500">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="e.g. Bukit Bintan"
                    {...field}
                    className="focus-visible:ring-primary transition-all"
                  />
                </div>
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel className="font-semibold">Nama Dusun</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    readOnly
                    {...field}
                    className="focus-visible:ring-primary transition-all"
                  />
                </div>
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="descriptions"
          render={({ field }) => (
            <FormItem className="space-y-0.5">
              <FormLabel className="font-semibold">Nama Dusun</FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea
                    placeholder="e.g. Tentang dusun ..."
                    {...field}
                    className="focus-visible:ring-primary transition-all"
                  />
                </div>
              </FormControl>
              <FormDescription></FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={isSubmitting || isPending}
          >
            Reset
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting || isPending}
            className="min-w-30 transition-all active:scale-95"
          >
            {isSubmitting || isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save />
                {isEditing ? "Perbarui Dusun" : "Tambah Dusun"}
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default HamletForm;
