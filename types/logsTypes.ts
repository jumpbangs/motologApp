export interface FuelEntry {
  id?: string;
  rate: number;
  brand: string;
  location: string;
  fuel_cost: number;
  fuel_per_km: number;
  date_filled: string;
  user_id: string | null;
  discount_used: boolean;
  total_fuel_liters: number;
  total_kms_covered: number;
}
