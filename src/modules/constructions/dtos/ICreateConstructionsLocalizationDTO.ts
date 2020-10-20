export default interface ICreateConstructionsLocalizationDTO {
  id: string;
  description: string;
  nuLatitude: number;
  nuLongitude: number;
  urlPin: string;
  heatMapValue: number;
  coordenates: number[];
  projectsId: number[];
  contracts: {
    id: number;
    constructionSitesId: number[];
  }[];
  heatMapQuantity: number;
}
