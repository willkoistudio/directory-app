/** @format */

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

export function useSignupForm() {
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().optional(),
  });

  const form: UseFormReturn<z.infer<typeof formSchema>> = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  return {
    form,
  };
}
