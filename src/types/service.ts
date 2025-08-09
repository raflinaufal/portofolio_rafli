export interface Service {
  id: number;
  title: string;
  description: string;
  tools: string;
  icon: string;
}

export interface ServiceFormValues {
  title: string;
  description: string;
  tools: string;
  icon: string;
}
