export class CreateInspectionDto {
  id: number;
  title: string;
  inspection_date: Date;
  status: string;
}

export class UpdateInspectionDto {
  id?: number;
  title?: string;
  inspection_date?: Date;
  status?: string;
}