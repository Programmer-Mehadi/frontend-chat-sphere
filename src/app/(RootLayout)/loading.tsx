import SpinerLoader from "@/components/Loader/SpinerLoader";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <SpinerLoader />
    </div>
  );
}
