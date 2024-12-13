export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export const ADDRESS_MOCKS: Address[] = [
  {
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    postalCode: "12345",
    country: "United States",
  },
  {
    street: "456 Elm St",
    city: "Anytown",
    state: "CA",
    postalCode: "67890",
    country: "United States",
  },
  {
    street: "789 Oak St",
    city: "Anytown",
    state: "CA",
    postalCode: "98765",
    country: "United States",
  },
  {
    street: "321 Pine St",
    city: "Anytown",
    state: "CA",
    postalCode: "54321",
    country: "United States",
  },
];
