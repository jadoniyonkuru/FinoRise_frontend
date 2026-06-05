import { useEffect, useState } from "react";
import { partnerService } from "@/api";
import type { User } from "@/api";
import DashboardLayout from "@/components/DashboardLayout";
import ProfileEditor from "@/components/ProfileEditor";
import { partnerNavItems } from "../partnerNav";

const partnerProfileApi = {
  updateProfile: partnerService.updateProfile.bind(partnerService),
  uploadAvatar: partnerService.uploadAvatar.bind(partnerService),
};

export default function PartnerProfile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    partnerService
      .getProfile()
      .then(setUser)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout
      role="partner"
      title="Organization profile"
      subtitle="Manage your partnership details"
      accent="var(--partner)"
      navItems={partnerNavItems}
    >
      <div style={{ "--accent": "var(--partner)" } as React.CSSProperties}>
        {loading ? (
          <p style={{ color: "#6b7280" }}>Loading profile…</p>
        ) : (
          <ProfileEditor
            user={user}
            roleLabel="Partner"
            sectionTitle="Partnership details"
            profileApi={partnerProfileApi}
            onUpdated={setUser}
            showPasswordSection
          />
        )}
      </div>
    </DashboardLayout>
  );
}
