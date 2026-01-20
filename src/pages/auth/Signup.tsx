/** @format */

import { FC, useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useSignupForm } from "./useSignupForm";
import { signup } from "../../store/authSlice";
import { FieldErrors } from "react-hook-form";
import { toast } from "../../hooks/use-toast";
import { t } from "i18next";
import { useAppDispatch } from "../../store/store";
import { useNavigate, Link } from "react-router-dom";
import { SocialAuthButtons } from "../../components/auth/SocialAuthButtons";

const Signup: FC = () => {
  interface SignupFormSchema {
    email: string;
    password: string;
    name?: string;
  }

  const { form } = useSignupForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async () => {
    const values = form.getValues();
    if (form.formState.isValid) {
      try {
        setLoading(true);
        const result = await dispatch(signup(values) as any);
        if (signup.fulfilled.match(result)) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error while signing up", error);
        toast({
          variant: "destructive",
          title: t("signup.error"),
          description: t("signup.errorDescription"),
        });
      } finally {
        setLoading(false);
      }
    }
  };

  function onFormError(errors: FieldErrors<SignupFormSchema>) {
    const collectErrorMessages = (
      fieldErrors: FieldErrors<SignupFormSchema>,
      parentKey = ""
    ): { field: string; message: string }[] => {
      const messages: { field: string; message: string }[] = [];

      Object.entries(fieldErrors).forEach(([key, value]) => {
        const fieldPath = parentKey ? `${parentKey}.${key}` : key;

        if (value && typeof value === "object") {
          if ("message" in value && typeof value.message === "string") {
            messages.push({ field: fieldPath, message: value.message });
          } else {
            messages.push(
              ...collectErrorMessages(value as FieldErrors<any>, fieldPath)
            );
          }
        }
      });

      return messages;
    };

    const errorMessages = collectErrorMessages(errors);

    toast({
      variant: "destructive",
      title: t("signup.formError"),
      description: (
        <ul className="list-disc pl-3 mt-2 ml-2">
          {errorMessages.map(({ field, message }, index) => (
            <li key={index} className="mb-1">
              <strong>{field}</strong>: {message}
            </li>
          ))}
        </ul>
      ),
    });
  }

  return (
    <div className="grid grid-cols-2 h-screen">
      <div
        className="bg-red w-full h-full flex justify-center items-center"
        style={{
          backgroundImage: `url('https://picsum.photos/2000')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <img src="/logo-horizontal.svg" alt="logo" className="w-1/2 mb-8" />
      </div>
      <div className="flex flex-col justify-center items-center px-8">
        <h1 className="text-2xl font-bold mb-4">{t("signup.title")}</h1>

        <Form {...form}>
          <form
            className="flex flex-col gap-4 w-full max-w-md"
            onSubmit={form.handleSubmit(onSubmit, onFormError)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("signup.name")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("signup.namePlaceholder")}
                      {...field}
                      onInput={(e) => {
                        field.onChange(e.currentTarget.value);
                        form.trigger("name");
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("signup.email")}</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder={t("signup.emailPlaceholder")}
                      {...field}
                      onInput={(e) => {
                        field.onChange(e.currentTarget.value);
                        form.trigger("email");
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("signup.password")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("signup.passwordPlaceholder")}
                      {...field}
                      onInput={(e) => {
                        field.onChange(e.currentTarget.value);
                        form.trigger("password");
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-red" />
                </FormItem>
              )}
            />

            <Button className="bg-red hover:bg-red/90" type="submit">
              {loading ? t("signup.loading") : t("signup.submit")}
            </Button>

            <div className="text-center text-sm">
              <span>{t("signup.alreadyHaveAccount")} </span>
              <Link to="/login" className="text-red hover:underline">
                {t("signup.login")}
              </Link>
            </div>
          </form>
        </Form>

        <div className="w-full max-w-md mt-6">
          <SocialAuthButtons />
        </div>
      </div>
    </div>
  );
};

export default Signup;
