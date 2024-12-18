import { useEffect, useState, FC } from "react";
import { usePageName } from "../../context/PageNameContext";
import { useCountryStateCity } from "../../context/CountryStateCityContext";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Check } from "lucide-react";
import { ROUTE_NAMES } from "../../const/routes";
import { Form } from "../../components/ui/form";
import {
  AddContactFormSchema,
  useAddContactForm,
} from "./hooks/useAddContactForm";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { getContactDetail } from "../../store/contactSlice";
import { getCompanies } from "../../store/companySlice";
import { addContact } from "../../store/contactSlice";
import { FieldErrors } from "react-hook-form";
import { useToast } from "../../hooks/use-toast";
import { ContactData } from "../../models/contact";
import { Company } from "../../models/company";
import { Skeleton } from "../../components/ui/skeleton";
import { FormStep } from "../../models/form";
import styles from "./AddContact.module.scss";
import { useTranslation } from "react-i18next";

const AddContact: FC = () => {
  const { setPageName } = usePageName();
  const {
    fetchCountries,
    getCities,
    getStates,
    selectCountry,
    countries,
    states,
    cities,
    loadingLocations,
  } = useCountryStateCity();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { t } = useTranslation();
  const { companies } = useSelector((state: RootState) => state.company);
  const { dispatchCurrentStep, form, stepsIconColor } = useAddContactForm();

  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [addContactSteps, setAddContactSteps] = useState<FormStep[]>([
    {
      name: t("addContact.avatar"),
      stepNumber: 1,
      isCompleted: false,
    },

    {
      name: t("addContact.primaryInfos"),
      stepNumber: 2,
      isCompleted: false,
    },
    {
      name: t("addContact.secondaryInfos"),
      stepNumber: 3,
      isCompleted: false,
    },
    {
      name: t("addContact.keywords"),
      stepNumber: 4,
      isCompleted: false,
    },
    {
      name: t("addContact.summary"),
      stepNumber: 5,
      isCompleted: false,
    },
  ]);

  const fetchRessources = async () => {
    setLoading(true);
    try {
      await fetchCountries();
      await dispatch(getCompanies() as any);
      if (id) {
        const { payload: contactDetail } = await dispatch(
          getContactDetail(id) as any
        );
        if (contactDetail) {
          form.setValue("name", contactDetail.name);
          form.setValue("avatar", contactDetail.avatar);
          form.setValue("companyId", contactDetail.company.id);
          form.setValue("function", contactDetail.function);
          form.setValue("email", contactDetail.email);
          form.setValue("phone", contactDetail.phone);
          form.setValue("workPhone", contactDetail.workPhone ?? "");
          form.setValue("fax", contactDetail.fax ?? "");
          form.setValue("website", contactDetail.website ?? "");
          form.setValue("notes", contactDetail.notes ?? "");
          form.setValue("keywords", contactDetail.keywords);
          form.setValue("address.street", contactDetail.address.street);
          form.setValue("address.countryId", contactDetail.address.countryId);
          form.setValue("address.cityId", contactDetail.address.cityID);
          form.setValue("address.postalCode", contactDetail.address.postalCode);
          form.setValue("address.stateId", contactDetail.address.stateId);
        }
      }
    } catch (error) {
      console.error("Error fetching ressources:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    const values = form.getValues();
    if (form.formState.isValid) {
      const contact: ContactData = {
        name: String(values.name),
        avatar: String(values.avatar),
        company:
          companies.find(
            (company) => company.id === String(values.companyId)
          ) ?? ({} as Company),
        function: String(values.function),
        email: String(values.email),
        phone: String(values.phone),
        workPhone: String(values.workPhone),
        fax: String(values.fax),
        website: String(values.website),
        notes: String(values.notes),
        address: {
          street: String(values.address.street),
          cityId: String(values.address.cityId),
          postalCode: String(values.address.postalCode),
          stateId: String(values.address.stateId),
          countryId: String(values.address.countryId),
        },
        keywords: Array.isArray(values.keywords)
          ? (values.keywords as string[])
          : [],
        createdAt: new Date().toISOString(),
      };
      try {
        setLoading(true);
        await dispatch(addContact(contact) as any);
      } catch (error) {
        console.error("Error while addinig contact", error);
      } finally {
        setLoading(false);
      }
    }
  };

  function onFormError(errors: FieldErrors<AddContactFormSchema>) {
    // Recursive function to collect error messages with their keys
    const collectErrorMessages = (
      fieldErrors: FieldErrors<AddContactFormSchema>,
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
      title: t("addContact.formError"),
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

  const isCurrentStepValid = async (step: number) => {
    let result = false;
    switch (step) {
      case 1:
        const isAvatarValid = await form.trigger("avatar");
        result = isAvatarValid;
        break;

      case 2:
        const isNameValid = await form.trigger("name");
        const isCompanyIdValid = await form.trigger("companyId");
        const isFunctionValid = await form.trigger("function");
        const isEmailValid = await form.trigger("email");
        const isPhoneValid = await form.trigger("phone");
        const isCountryIdValid = await form.trigger("address.countryId");
        const isStateIdValid = await form.trigger("address.stateId");
        const isCityIdValid = await form.trigger("address.cityId");
        const isPostalCodeValid = await form.trigger("address.postalCode");
        const isStreetValid = await form.trigger("address.street");

        result =
          isNameValid &&
          isCompanyIdValid &&
          isFunctionValid &&
          isEmailValid &&
          isPhoneValid &&
          isCountryIdValid &&
          isStateIdValid &&
          isCityIdValid &&
          isPostalCodeValid &&
          isStreetValid;
        break;

      case 3:
        const isFaxValid = await form.trigger("fax");
        const isNotesValid = await form.trigger("notes");
        const isWebsiteValid = await form.trigger("website");
        const isWorkPhoneValid = await form.trigger("workPhone");

        result =
          isFaxValid && isNotesValid && isWebsiteValid && isWorkPhoneValid;
        break;

      case 4:
        const isKeywordsValid = await form.trigger("keywords");
        result = isKeywordsValid;
        break;
      default:
        break;
    }
    return result;
  };

  const handleNextStep = async () => {
    if (await isCurrentStepValid(currentStep)) {
      const currentAddStep = addContactSteps.find(
        (step) => step.stepNumber === currentStep
      );
      setCurrentStep(currentStep + 1);
      if (currentAddStep) {
        setAddContactSteps((prevSteps) =>
          prevSteps.map((step) =>
            step.stepNumber === currentStep
              ? { ...step, isCompleted: true }
              : step
          )
        );
      }
      return;
    }

    toast({
      variant: "destructive",
      title: t("addContact.formErrorStepTitle"),
      description: t("addContact.formErrorStep"),
    });
  };

  useEffect(() => {
    setPageName(ROUTE_NAMES.ADD_CONTACT);
    fetchRessources();
  }, []);

  return (
    <div>
      {!loading ? (
        <>
          <nav className="flex border border-white/10 rounded-lg px-6 py-4 mt-12">
            {addContactSteps.map((step) => (
              <div
                className="add-contact-steps-navigation flex gap-2 items-center "
                key={step.stepNumber}
              >
                <div className="add-contact-steps-navigation-icon">
                  <Badge
                    className={`${stepsIconColor(step, currentStep)} py-1 `}
                  >
                    {step.isCompleted ? <Check size={14} /> : step.stepNumber}
                  </Badge>
                </div>
                <span className="whitespace-nowrap">{step.name}</span>
                {step.stepNumber !== 5 && (
                  <span
                    className={styles["add-contact-steps-navigation-line"]}
                  />
                )}
              </div>
            ))}
            <div className="flex gap-2 ml-auto">
              <Button
                variant={"outline"}
                disabled={currentStep === 1}
                onClick={() => setCurrentStep(currentStep - 1)}
              >
                {t("addContact.back")}
              </Button>
              <Button
                className="bg-red"
                disabled={currentStep === 5}
                onClick={handleNextStep}
              >
                {t("addContact.next")}
              </Button>
            </div>
          </nav>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, onFormError)}>
              {dispatchCurrentStep(currentStep, {
                companies,
                states,
                cities,
                countries,
                selectCountry,
                getStates,
                getCities,
                loadingLocations,
                onSubmit,
              })}
            </form>
          </Form>
        </>
      ) : (
        <>
          <Skeleton className="bg-white/10 h-16 w-fullmb-4 mt-12 mb-10" />
          <Skeleton className="bg-white/10 h-[500px] w-full" />
        </>
      )}
    </div>
  );
};

export { AddContact };
