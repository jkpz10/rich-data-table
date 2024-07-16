export type id = {
  name: string;
  value: string;
};

export type name = {
  title: string;
  first: string;
  last: string;
};

export type location = {
  city: string;
  country: string;
};

export type UserData = {
  id: id;
  name: name;
  location: location;
};

export type info = {
  page: number;
  results: number;
  seed: string;
  version: string;
};

export type listItem = {
  id: string;
  first_name: string;
  last_name: string;
  city: string;
  country: string;
};

export type apiRes = {
  info: info;
  results: UserData[];
};