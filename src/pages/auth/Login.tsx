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
import { useLoginForm } from "./useAuth";
import { login } from "../../store/authSlice";
import { FieldErrors } from "react-hook-form";
import { toast } from "../../hooks/use-toast";
import { t } from "i18next";
import { useAppDispatch } from "../../store/store";
import { useNavigate, Link } from "react-router-dom";
import { SocialAuthButtons } from "../../components/auth/SocialAuthButtons";

const Login: FC = () => {
  interface LoginFormSchema {
    email: string;
    password: string;
  }

  const { form } = useLoginForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async () => {
    const values = form.getValues();
    if (form.formState.isValid) {
      try {
        setLoading(true);
        const result = await dispatch(login(values) as any);
        if (login.fulfilled.match(result)) {
          navigate("/");
        }
      } catch (error) {
        console.error("Error while logging in", error);
        toast({
          variant: "destructive",
          title: t("login.error"),
          description: t("login.errorDescription"),
        });
      } finally {
        setLoading(false);
      }
    }
  };

  function onFormError(errors: FieldErrors<LoginFormSchema>) {
    // Recursive function to collect error messages with their keys
    const collectErrorMessages = (
      fieldErrors: FieldErrors<LoginFormSchema>,
      parentKey = ""
    ): { field: string; message: string }[] => {
      const messages: { field: string; message: string }[] = [];

      Object.entries(fieldErrors).forEach(([key, value]) => {
        const fieldPath = parentKey ? `${parentKey}.${key}` : key;

        if (value && typeof value === "object") {
          if ("message" in value && typeof value.message === "string") {
            // Add the message with its field path
            messages.push({ field: fieldPath, message: value.message });
          } else {
            // Recurse for nested errors
            messages.push(
              ...collectErrorMessages(value as FieldErrors<any>, fieldPath)
            );
          }
        }
      });

      return messages;
    };

    // Collect the error messages with their corresponding keys
    const errorMessages = collectErrorMessages(errors);

    // Show the errors using toast
    toast({
      variant: "destructive",
      title: t("login.formError"),
      description: (
        <ul className="list-disc pl-3 mt-2  ml-2">
          {errorMessages.map(({ field, message }, index) => (
            <li key={index} className="mb-1 ">
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
          transition: "all 0.3s ease-in-out",
        }}
      >
        <img src="/logo-horizontal.svg" alt="logo" className="w-1/2 mb-8" />
      </div>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">{t("login.title")}</h1>

        <Form {...form}>
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit(onSubmit, onFormError)}
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("login.email")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("login.email")}
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
                  <FormLabel>{t("login.password")}</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={t("login.password")}
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
              {loading ? t("login.loading") : t("login.submit")}
            </Button>

            <div className="text-center text-sm">
              <span>{t("login.dontHaveAccount")} </span>
              <Link to="/signup" className="text-red hover:underline">
                {t("login.signup")}
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

export default Login;
