/** @format */

import React, { FC, useEffect, useState } from "react";
import { usePageName } from "../../context/PageNameContext";
import { ROUTE_NAMES } from "../../const/routes";
import { Badge } from "../../components/ui/badge";
import { Check } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Form } from "../../components/ui/form";
import { FormStep } from "../../models/form";
import { useDispatch } from "react-redux";
import {
  AddCompanyFormSchema,
  useAddCompanyForm,
} from "./hooks/useAddCompanyForm";
import { useCountryStateCity } from "../../context/CountryStateCityContext";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/use-toast";
import { CompanyData } from "../../models/Company";
import { addCompany, getCompanyDetail } from "../../store/companySlice";
import { FieldErrors } from "react-hook-form";
import { Skeleton } from "../../components/ui/skeleton";
import styles from "../add-contact/AddContact.module.scss";
import { t } from "i18next";

const AddCompany: FC = () => {
  const { setPageName } = usePageName();
  const [currentStep, setCurrentStep] = useState(1);
  const [addCompanySteps, setAddCompanySteps] = useState<FormStep[]>([
    {
      name: t("addCompany.logo"),
      stepNumber: 1,
      isCompleted: false,
    },
    {
      name: t("addCompany.companyInfos"),
      stepNumber: 2,
      isCompleted: false,
    },
    {
      name: t("addCompany.summary"),
      stepNumber: 3,
      isCompleted: false,
    },
  ]);

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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const { dispatchCurrentStep, form, stepsIconColor } = useAddCompanyForm();

  const fetchRessources = async () => {
    setLoading(true);
    try {
      const countriesData = await fetchCountries();
      if (id) {
        const { payload: companyDetail } = await dispatch(
          getCompanyDetail(id) as any,
        );
        if (companyDetail) {
          form.setValue("name", companyDetail.name);
          form.setValue("logo", companyDetail.logo);
          form.setValue("phone", companyDetail.phone);
          form.setValue("fax", companyDetail.fax ?? "");
          form.setValue("website", companyDetail.website ?? "");
          form.setValue("notes", companyDetail.notes ?? "");
          form.setValue("area", companyDetail.area);
          form.setValue("address.street", companyDetail.address.street);
          form.setValue("address.countryId", companyDetail.address.countryId);
          form.setValue("address.postalCode", companyDetail.address.postalCode);
          form.setValue("address.stateId", companyDetail.address.stateId);
          form.setValue("address.cityId", companyDetail.address.cityId);

          // Load states for edit mode
          const country = countriesData.find(
            (c) => String(c.id) === String(companyDetail.address.countryId),
          );
          if (country) {
            const statesData = await selectCountry(country.iso2);

            // Re-set stateId AFTER states are loaded so Autocomplete can find the match
            form.setValue("address.stateId", companyDetail.address.stateId, {
              shouldDirty: true,
            });

            // Load cities for edit mode
            const state = statesData.find(
              (s) => String(s.id) === String(companyDetail.address.stateId),
            );
            if (state) {
              await getCities(state.iso2, country.iso2);

              // Re-set cityId AFTER cities are loaded so Autocomplete can find the match
              form.setValue("address.cityId", companyDetail.address.cityId, {
                shouldDirty: true,
              });
            }
          }
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
    const company: CompanyData = {
      name: String(values.name),
      logo: String(values.logo),
      phone: String(values.phone),
      fax: String(values.fax),
      website: String(values.website),
      notes: String(values.notes),
      area: String(values.area),
      address: {
        street: String(values.address.street),
        cityId: String(values.address.cityId),
        postalCode: String(values.address.postalCode),
        stateId: String(values.address.stateId),
        countryId: String(values.address.countryId),
      },
    };
    try {
      setLoading(true);
      const { payload } = await dispatch(addCompany(company) as any);
      if (payload?.id) {
        navigate(`/company/${payload.id}`);
      }
    } catch (error) {
      console.error("Error while adding company", error);
    } finally {
      setLoading(false);
    }
  };

  function onFormError(errors: FieldErrors<AddCompanyFormSchema>) {
    // Recursive function to collect error messages with their keys
    const collectErrorMessages = (
      fieldErrors: FieldErrors<AddCompanyFormSchema>,
      parentKey = "",
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
              ...collectErrorMessages(value as FieldErrors<any>, fieldPath),
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
      title: t("addCompany.formError"),
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
        const isLogoValid = await form.trigger("logo");
        result = isLogoValid;
        break;

      case 2:
        const isNameValid = await form.trigger("name");
        const isPhoneValid = await form.trigger("phone");
        const isAreaValid = await form.trigger("area");
        const isFaxValid = await form.trigger("fax");
        const isWebsiteValid = await form.trigger("website");
        const isNotesValid = await form.trigger("notes");
        const isCountryIdValid = await form.trigger("address.countryId");
        const isStateIdValid = await form.trigger("address.stateId");
        const isCityIdValid = await form.trigger("address.cityId");
        const isPostalCodeValid = await form.trigger("address.postalCode");
        const isStreetValid = await form.trigger("address.street");

        result =
          isNameValid &&
          isPhoneValid &&
          isAreaValid &&
          isFaxValid &&
          isWebsiteValid &&
          isNotesValid &&
          isCountryIdValid &&
          isStateIdValid &&
          isCityIdValid &&
          isPostalCodeValid &&
          isStreetValid;
        break;
      default:
        break;
    }
    return result;
  };

  const handleNextStep = async () => {
    if (await isCurrentStepValid(currentStep)) {
      const currentAddStep = addCompanySteps.find(
        (step) => step.stepNumber === currentStep,
      );
      setCurrentStep(currentStep + 1);
      if (currentAddStep) {
        setAddCompanySteps((prevSteps) =>
          prevSteps.map((step) =>
            step.stepNumber === currentStep
              ? { ...step, isCompleted: true }
              : step,
          ),
        );
      }
      return;
    }

    toast({
      variant: "destructive",
      title: t("addCompany.formErrorStepTitle"),
      description: t("addCompany.formErrorStep"),
    });
  };

  useEffect(() => {
    fetchRessources();
    setPageName(ROUTE_NAMES.ADD_COMPANY); // Mettre à jour le nom de la page
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <nav className="flex border border-white/10 rounded-lg px-6 py-4">
            {addCompanySteps.map((step) => (
              <div
                className="add-contact-steps-navigation flex gap-2 items-center"
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
                {step.stepNumber !== 3 && (
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
                {t("addCompany.back")}
              </Button>
              <Button
                className="bg-red"
                disabled={currentStep === 3}
                onClick={handleNextStep}
              >
                {t("addCompany.next")}
              </Button>
            </div>
          </nav>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onFormError)}
              className="flex flex-1 flex-col"
            >
              {dispatchCurrentStep(currentStep, {
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
          <Skeleton className="bg-white/10 h-16 w-full mb-4" />
          <Skeleton className="bg-white/10 h-[500px] w-full" />
        </>
      )}
    </>
  );
};

export { AddCompany };
