import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function LoadingGrid() {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton className="w-full aspect-[21/9] rounded-lg" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-visible">
            <Skeleton className="aspect-[16/9] rounded-t-lg" />
            <div className="p-4 flex flex-col gap-3">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-3 w-24 mt-2" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function LoadingSidebar() {
  return (
    <aside className="w-full lg:w-80 flex-shrink-0">
      <div className="flex flex-col gap-6">
        <Skeleton className="w-full aspect-[300/250] rounded-lg" />
        
        <Card className="p-4">
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-8 w-8" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </aside>
  );
}

export function LoadingArticle() {
  return (
    <div className="max-w-4xl mx-auto">
      <Skeleton className="h-8 w-24 mb-4" />
      <Skeleton className="h-12 w-full mb-2" />
      <Skeleton className="h-12 w-3/4 mb-4" />
      <Skeleton className="h-4 w-32 mb-8" />
      <Skeleton className="w-full aspect-[16/9] rounded-lg mb-8" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
