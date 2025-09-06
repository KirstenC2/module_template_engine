import { Inspection } from '../models/inspection.model';

export interface inspectionStrategy {
  create(data: any): Promise<Inspection>;
  validate?(data: any): boolean;
}
