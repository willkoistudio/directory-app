export interface Address {
  street: string;
  postalCode: string;
  cityId: string;
  stateId: string;
  countryId: string;
}

export const ADDRESS_MOCKS: Address[] = [
  {
    street: "123 Main St",
    cityId: "Anytown",
    stateId: "3870",
    postalCode: "12345",
    countryId: "1",
  },
  {
    street: "456 Elm St",
    cityId: "71",
    stateId: "CA",
    postalCode: "67890",
    countryId: "United States",
  },
  {
    street: "789 Oak St",
    cityId: "Anytown",
    stateId: "CA",
    postalCode: "98765",
    countryId: "United States",
  },
  {
    street: "321 Pine St",
    cityId: "Anytown",
    stateId: "CA",
    postalCode: "54321",
    countryId: "United States",
  },
];
