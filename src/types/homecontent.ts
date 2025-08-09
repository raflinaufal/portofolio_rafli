export interface HomeContent {
  id: number;
  name: string;
  title: string;
  location: string;
  isRemote: boolean;
  description: string;
  updatedAt: string;
}

export interface HomeContentFormValues {
  name: string;
  title: string;
  location: string;
  isRemote: boolean;
  description: string;
}
