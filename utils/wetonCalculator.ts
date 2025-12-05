import { Hari, Pasaran, BirthResult } from '../types';
import { wetonDatabase } from '../data/wetonData';

// Base Reference: 1 Januari 1900 was a Senin Pahing
const BASE_DATE = new Date('1900-01-01T12:00:00Z');

// Pasaran Cycle: 0=Legi, 1=Pahing, 2=Pon, 3=Wage, 4=Kliwon
const PASARAN_CYCLE = [
  Pasaran.Legi,   // 0
  Pasaran.Pahing, // 1
  Pasaran.Pon,    // 2
  Pasaran.Wage,   // 3
  Pasaran.Kliwon  // 4
];

const HARI_INDONESIA = [
  Hari.Minggu,
  Hari.Senin, 
  Hari.Selasa, 
  Hari.Rabu,  
  Hari.Kamis, 
  Hari.Jumat, 
  Hari.Sabtu  
];

const getZodiac = (day: number, month: number): string => {
  const zodiacs = [
    { char: '♑ Capricorn', start: [12, 22], end: [1, 19] },
    { char: '♒ Aquarius', start: [1, 20], end: [2, 18] },
    { char: '♓ Pisces', start: [2, 19], end: [3, 20] },
    { char: '♈ Aries', start: [3, 21], end: [4, 19] },
    { char: '♉ Taurus', start: [4, 20], end: [5, 20] },
    { char: '♊ Gemini', start: [5, 21], end: [6, 20] },
    { char: '♋ Cancer', start: [6, 21], end: [7, 22] },
    { char: '♌ Leo', start: [7, 23], end: [8, 22] },
    { char: '♍ Virgo', start: [8, 23], end: [9, 22] },
    { char: '♎ Libra', start: [9, 23], end: [10, 22] },
    { char: '♏ Scorpio', start: [10, 23], end: [11, 21] },
    { char: '♐ Sagittarius', start: [11, 22], end: [12, 21] }
  ];

  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    return '♑ Capricorn';
  }

  const result = zodiacs.find(z => {
    if (month === z.start[0] && day >= z.start[1]) return true;
    if (month === z.end[0] && day <= z.end[1]) return true;
    return false;
  });

  return result ? result.char : 'Unknown';
};

const calculateAge = (birthDate: Date): { years: number, months: number, days: number } => {
  const today = new Date();
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
};

export const calculateBirthDay = (dateString: string): BirthResult => {
  // Use noon UTC to avoid daylight saving issues affecting the day count
  const selectedDate = new Date(dateString + 'T12:00:00Z');
  
  // 1. Calculate Standard Weekday
  const dayIndex = selectedDate.getUTCDay();
  const hariName = HARI_INDONESIA[dayIndex];

  // 2. Calculate Pasaran
  // Calculate difference in days from Base Date (1 Jan 1900)
  const diffTime = selectedDate.getTime() - BASE_DATE.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
  
  // Modulo function that handles negative numbers correctly
  const mod = (n: number, m: number) => ((n % m) + m) % m;
  
  // 1 Jan 1900 was Pahing (Index 1).
  // Formula: (DiffDays + KnownOffset) % 5
  // We add 1 because index 1 is Pahing.
  const pasaranIndex = mod(diffDays + 1, 5);
  const pasaranName = PASARAN_CYCLE[pasaranIndex];

  // 3. Weton Key
  const wetonKey = `${hariName} ${pasaranName}`;
  const wetonData = wetonDatabase[wetonKey] || null;

  // 4. Zodiac & Age (Modern features)
  // Use local date for zodiac/age to match user expectation of calendar date
  const localDate = new Date(dateString);
  const zodiac = getZodiac(localDate.getDate(), localDate.getMonth() + 1);
  const age = calculateAge(localDate);

  // Format date
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(selectedDate);

  return {
    fullDate: formattedDate,
    dayName: hariName,
    pasaran: pasaranName,
    wetonLengkap: wetonKey,
    zodiac: zodiac,
    age: age,
    data: wetonData
  };
};