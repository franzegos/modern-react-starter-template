import { useQuery } from "@tanstack/react-query";
import { fetchDemoPost } from "@/api/services/demo";

export const demoPostQueryKey = ["demo", "post"] as const;

export function useDemoPost() {
  return useQuery({
    queryKey: demoPostQueryKey,
    queryFn: fetchDemoPost,
  });
}
