export class CreateInspectionDto {
  id: number;
  title: string;
  description?: string;
  inspector: string;
  inspection_date: Date;
  status: string;
  result?: string;
}

export class UpdateInspectionDto {
  id?: number;
  title?: string;
  description?: string;
  inspector?: string;
  inspection_date?: Date;
  status?: string;
  result?: string;
}