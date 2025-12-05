export interface WetonData {
  watak: string;
  saran?: string;
}

export interface AgeDetail {
  years: number;
  months: number;
  days: number;
}

export interface BirthResult {
  fullDate: string;
  dayName: string; // Senin, Selasa...
  pasaran: string; // Legi, Pahing...
  wetonLengkap: string; // Senin Pahing
  zodiac: string;
  age: AgeDetail;
  data: WetonData | null;
}

export enum Pasaran {
  Legi = 'Legi',
  Pahing = 'Pahing',
  Pon = 'Pon',
  Wage = 'Wage',
  Kliwon = 'Kliwon',
}

export enum Hari {
  Minggu = 'Minggu',
  Senin = 'Senin',
  Selasa = 'Selasa',
  Rabu = 'Rabu',
  Kamis = 'Kamis',
  Jumat = 'Jumat',
  Sabtu = 'Sabtu',
}