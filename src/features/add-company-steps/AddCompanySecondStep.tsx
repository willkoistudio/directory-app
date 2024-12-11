import { FC } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Company } from "../../models/company";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Save } from "lucide-react";

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

const AddCompanySecondStep: FC = () => {
  return (
    <>
      <section className="grid grid-cols-2 gap-8 px-8 mt-12">
        <div>
          <Label>Name</Label>
          <Input type="text" />
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
          <Label>Postal Code</Label>
          <Input type="text" />
        </div>
        <div>
          <Label>Area</Label>
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
        <div>
          <Label>Note</Label>
          <Textarea />
        </div>
      </section>
      <div className="flex justify-center px-8 mt-12">
        <Button className="bg-red h-14 px-8">
          <Save /> Save company infos
        </Button>
      </div>
    </>
  );
};

export { AddCompanySecondStep };
