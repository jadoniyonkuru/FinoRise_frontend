import { useAuth } from "@/context/AuthContext";
import { authService } from "@/api";
import ProfileEditor from "@/components/ProfileEditor";
import LearnerLayout from "../LearnerLayout";

const learnerProfileApi = {
  updateProfile: authService.updateProfile.bind(authService),
  uploadAvatar: authService.uploadAvatar.bind(authService),
};

export default function LearnerProfile() {
  const { user, refreshUser } = useAuth();

  const extraFields = user
    ? [
        { label: "Level", value: String(user.level ?? "—") },
        { label: "Total XP", value: `${user.xp_total?.toLocaleString() ?? "0"} XP` },
        { label: "Streak", value: `${user.streak_days ?? 0} days` },
      ]
    : [];

  return (
    <LearnerLayout title="My profile" subtitle="Manage your photo and personal information">
      <ProfileEditor
        user={user}
        roleLabel="Learner"
        sectionTitle="Profile details"
        profileApi={learnerProfileApi}
        onUpdated={() => refreshUser()}
        extraFields={extraFields}
        showPasswordSection
      />
    </LearnerLayout>
  );
}
