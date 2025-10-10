export interface FuelEntry {
  rate: number;
  brand: string;
  fuel_cost: number;
  fuel_per_km: number;
  date_filled: string;
  user_id: string | null;
  total_fuel_liters: number;
  total_kms_covered: number;
}
