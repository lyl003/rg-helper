import WelcomeBanner from "@/components/dashboard/WelcomeBanner";
import QuickStats from "@/components/dashboard/QuickStats";
import BadgeShelf from "@/components/badges/BadgeShelf";

export default function DashboardView() {
  return (
    <div className="space-y-6">
      <WelcomeBanner />
      <QuickStats />
      <BadgeShelf />
    </div>
  );
}
