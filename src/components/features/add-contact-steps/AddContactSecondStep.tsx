import { FC } from "react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Company } from "../../../models/company";
import { UseFormReturn } from "react-hook-form";
import { AddContactFormSchema } from "../../../pages/add-contact/hooks/useAddContactForm";

const companiesList: Company[] = [
  {
    id: "1",
    name: "Company 1",
    phone: "+33 6 00 00 00 00",
    logo: "https://blog.logomaster.ai/hs-fs/hubfs/adobe-logo-1990.jpg?width=662&height=447&name=adobe-logo-1990.jpg",
    address: {
      street: "Street 1",
      city: "City 1",
      postalCode: "12345",
      country: "France",
      state: "France",
    },
    area: "Area 1",
    note: "Note 1",
    createdAt: "new Date()",
    updatedAt: "new Date()",
    updatedBy: "John Doe",
  },
  {
    id: "2",
    name: "Company 2",
    phone: "+33 6 00 00 00 00",
    logo: "https://media.idownloadblog.com/wp-content/uploads/2018/07/Apple-logo-black-and-white-429x500.png",
    address: {
      street: "Street 1",
      city: "City 1",
      postalCode: "12345",
      country: "France",
      state: "France",
    },
    area: "Area 1",
    note: "Note 1",
    createdAt: "new Date()",
    updatedAt: "new Date()",
    updatedBy: "Peysoh GNX",
  },
  {
    id: "3",
    name: "Company 3",
    phone: "+33 6 00 00 00 00",
    logo: "https://blog.logomaster.ai/hs-fs/hubfs/adobe-logo-1990.jpg?width=662&height=447&name=adobe-logo-1990.jpg",
    address: {
      street: "Street 1",
      city: "City 1",
      postalCode: "12345",
      country: "France",
      state: "France",
    },
    area: "Area 1",
    note: "Note 1",
    createdAt: "new Date()",
    updatedAt: "new Date()",
    updatedBy: "John Doe",
  },
];

const cities = [
  {
    id: "1",
    name: "New York",
  },
  {
    id: "2",
    name: "London",
  },
  {
    id: "3",
    name: "Paris",
  },
  {
    id: "4",
    name: "Tokyo",
  },
  {
    id: "5",
    name: "Sydney",
  },
  {
    id: "6",
    name: "Berlin",
  },
  {
    id: "7",
    name: "New York",
  },
  {
    id: "8",
    name: "London",
  },
  {
    id: "9",
    name: "Paris",
  },
  {
    id: "10",
    name: "Tokyo",
  },
  {
    id: "11",
    name: "Sydney",
  },
];

const countries = [
  {
    id: "1",
    name: "United States",
  },
  {
    id: "2",
    name: "United Kingdom",
  },
  {
    id: "3",
    name: "France",
  },
  {
    id: "4",
    name: "Japan",
  },
  {
    id: "5",
    name: "Australia",
  },
  {
    id: "6",
    name: "Germany",
  },
];

const AddContactSecondStep: FC<UseFormReturn<AddContactFormSchema>> = () => {
  return (
    <>
      <section className="grid grid-cols-2 gap-8 mt-12 px-8">
        <div>
          <Label>Name</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>Company</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a company" />
            </SelectTrigger>
            <SelectContent>
              {companiesList.map((company) => (
                <SelectItem key={company.id} value={company.name}>
                  {company.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Function</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>E-mail</Label>
          <Input type="email" />
        </div>
        <div>
          <Label>Phone</Label>
          <Input type="phone" />
        </div>
        <div>
          <Label>Street</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>City</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.name}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Postal Code</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>Country</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>
    </>
  );
};

export { AddContactSecondStep };
