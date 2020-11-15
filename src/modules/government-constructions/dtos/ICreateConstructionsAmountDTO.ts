export default interface ICreateConstructionsAmountDTO {
  construction_amount_id: number;
  number: string;
  year: number;
  description: string;
  area: string;
  status: string;
  amount: number;
  cityId: number;
  cityDescription: string;
  projectLink?: string;
  peExecuted: number;
  contracts: {
    id: number;
    description?: string;
    number?: number;
  }[];
  latitude?: number;
  longitude?: number;
}
