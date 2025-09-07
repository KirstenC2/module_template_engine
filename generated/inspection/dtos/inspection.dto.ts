export class CreateInspectionDto {
  id: number;
  title: string;
  type: string;
  inspection_date: Date;
  status: string;
}

export class UpdateInspectionDto {
  id?: number;
  title?: string;
  type?: string;
  inspection_date?: Date;
  status?: string;
}


