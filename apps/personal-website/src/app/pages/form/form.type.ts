export type CatOption = {
  namePl: string;
  nameEN: string;
  id: string;
};

export interface CatFormModel {
  name: string;
  age: number | null;
  birthday: Date | null;
  description: string;
  purebred: boolean;
  bred: string;
  toys: string[];
  beauty: number;
  malice: number;
}

export interface PetFormModel {
  petType: 'cat' | 'dog' | '';
  cat: CatFormModel;
}
