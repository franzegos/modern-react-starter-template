import { api } from "@/api/client";
import type { DemoPost } from "@/api/types/demo.types";

export async function fetchDemoPost(): Promise<DemoPost> {
  const { data } = await api.get<DemoPost>("/posts/1");
  return data;
}
