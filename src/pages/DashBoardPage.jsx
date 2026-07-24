import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import PageContainer from "@/components/layout/PageContainer";
import PageHeader from "@/components/layout/PageHeader";

import DashboardStats from "@/components/dashboard/DashboardStats";
import RecentAlbums from "@/components/dashboard/RecentAlbums";
import DashboardSkeleton from "@/components/dashboard/DashboardSkeleton";

import ImageUploader from "@/components/images/ImageUploader";
import { fetchAllAlbum } from "@/store/slices/albumSlice";

export const DashBoardPage = () => {
  const dispatch = useDispatch();

  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const { userData: user } = useSelector(
    (state) => state.userSlice
  );

  const {
    albumsData: albums,
    fetchAlbumsStatus,
    albumError,
  } = useSelector((state) => state.albumSlice);

  useEffect(() => {
    if (user && fetchAlbumsStatus === "idle") {
      dispatch(fetchAllAlbum());
    }
  }, [dispatch, user, fetchAlbumsStatus]);

  const stats = useMemo(() => {
    const safeAlbums = albums ?? [];

    return {
      albums: safeAlbums.length,

      photos: safeAlbums.reduce(
        (total, album) => total + (album.photoCount || 0),
        0
      ),

      shared: safeAlbums.filter(
        (album) => album.sharedUserIds?.length > 0
      ).length,
    };
  }, [albums]);

  const firstName = user?.name?.split(" ")[0] || "there";

  if (fetchAlbumsStatus === "loading") {
    return <DashboardSkeleton />;
  }

  return (
    <>
      <PageContainer className="py-8 sm:py-10">
        <PageHeader
          eyebrow="Your library"
          title={`Welcome back, ${firstName}`}
          description="Keep your photos organized, revisit your albums, and find the moments that matter."
          actions={
            <Button onClick={() => setUploadModalOpen(true)}>
              <Upload className="size-4" />
              Upload photos
            </Button>
          }
        />

        <div className="mt-8 space-y-10">
          <DashboardStats stats={stats} />

          <RecentAlbums
            albums={albums}
            status={fetchAlbumsStatus}
            error={albumError}
            onRetry={() => dispatch(fetchAllAlbum())}
          />
        </div>
      </PageContainer>

      {uploadModalOpen && (
        <ImageUploader
          onClose={() => setUploadModalOpen(false)}
          onSuccess={() => setUploadModalOpen(false)}
        />
      )}
    </>
  );
};