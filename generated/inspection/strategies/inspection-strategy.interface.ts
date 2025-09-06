import { Inspection } from '../models/inspection.model';

export interface InspectionStrategy {
  create(data: any): Promise<Inspection>;
  validate?(data: any): boolean;
}
