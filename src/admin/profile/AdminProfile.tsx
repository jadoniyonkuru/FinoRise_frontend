import { useAuth } from "@/context/AuthContext";
import { authService } from "@/api";
import AdminLayout from "@/admin/AdminLayout";
import ProfileEditor from "@/components/ProfileEditor";

const adminProfileApi = {
  updateProfile: authService.updateProfile.bind(authService),
  uploadAvatar: authService.uploadAvatar.bind(authService),
};

export default function AdminProfile() {
  const { user, refreshUser } = useAuth();

  const extraFields = user ? [{ label: "Level", value: String(user.level ?? "—") }] : [];

  return (
    <AdminLayout title="Admin profile" subtitle="Manage your account details">
      <div style={{ "--accent": "var(--admin)" } as React.CSSProperties}>
        <ProfileEditor
          user={user}
          roleLabel="Admin"
          sectionTitle="Account details"
          profileApi={adminProfileApi}
          onUpdated={() => refreshUser()}
          extraFields={extraFields}
          showPasswordSection
        />
      </div>
    </AdminLayout>
  );
}
