"use client";

import { useEffect, useState } from "react";
import AuthenticatedLayout from "../components/AuthenticatedLayout";
import { Button } from "@/components/ui/button";

interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  preferredName: string | null;
  image: string | null;
  title: string | null;
  company: string | null;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    preferredName: "",
    title: "",
    company: "",
  });

  useEffect(() => {
    fetch("/api/user/profile")
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setFormData({
          preferredName: data.preferredName || "",
          title: data.title || "",
          company: data.company || "",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const response = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updated = await response.json();
        setProfile(updated);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      alert("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AuthenticatedLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout>
      <div className="min-h-screen bg-background">
        <div className="mx-auto max-w-2xl px-6 py-8">
          <h1 className="text-3xl font-medium mb-2 text-foreground">
            Profile Settings
          </h1>
          <p className="text-base text-muted-foreground mb-8">
            Manage your profile information and preferences.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={profile?.email || ""}
                  disabled
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Your email cannot be changed.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Preferred Name
                </label>
                <input
                  type="text"
                  value={formData.preferredName}
                  onChange={(e) =>
                    setFormData({ ...formData, preferredName: e.target.value })
                  }
                  placeholder={profile?.name || "Enter your preferred name"}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This is the name Atlas will use during practice sessions.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="e.g., Sales Manager"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  placeholder="e.g., Acme Corp"
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
