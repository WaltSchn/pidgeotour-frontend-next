import api from "./client";
import { Tour } from "@/types/tours";

export async function getTours(): Promise<Tour[]> {
  const { data } = await api.get("/tours");
  return data;
}

export async function getTourById(id: string): Promise<Tour> {
  const { data } = await api.get(`/tours/${id}`);
  return data;
}