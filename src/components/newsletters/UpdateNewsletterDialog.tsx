import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import {
  BASE_URL,
  VITE_COUDINARY_NAME,
  VITE_UPLOAD_PRESET,
} from "@/utils/variables";

interface UpdateNewsletterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newsletterId: string | null;
  onUpdated?: () => void; // optional callback after update
}

export function UpdateNewsletterDialog({
  open,
  onOpenChange,
  newsletterId,
  onUpdated,
}: UpdateNewsletterDialogProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    content: "",
    type: "general",
    featuredImage: "",
    status: "draft",
  });
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch newsletter details when modal opens
  useEffect(() => {
    if (!newsletterId || !open) return;

    const fetchNewsletter = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${BASE_URL}/newsletters/${newsletterId}`);
        const data = res?.data?.data;

        setFormData({
          title: data.title || "",
          subTitle: data.subTitle || "",
          content: data.content || "",
          type: data.type || "general",
          featuredImage: data.featuredImage || "",
          status: data.status || "draft",
        });
      } catch (error: any) {
        toast({
          title: "Failed to fetch newsletter",
          description: error.response?.data?.message || "Something went wrong",
          variant: "destructive",
        });
        onOpenChange(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsletter();
  }, [newsletterId, open]);

  const uploadToCloudinary = async (file: File) => {
    const cloudFormData = new FormData();
    cloudFormData.append("file", file);
    cloudFormData.append("upload_preset", VITE_UPLOAD_PRESET);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${VITE_COUDINARY_NAME}/upload`,
      { method: "POST", body: cloudFormData }
    );

    if (!res.ok) throw new Error("Cloudinary upload failed");

    const data = await res.json();
    return data.secure_url;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterId) return;

    try {
      setIsLoading(true);

      let imageUrl = formData.featuredImage;
      if (file) {
        toast({ title: "Uploading Image...", description: "Please wait." });
        imageUrl = await uploadToCloudinary(file);
      }

      const payload = {
        ...formData,
        featuredImage: imageUrl,
      };

      const res = await axios.put(
        `${BASE_URL}/newsletters/${newsletterId}`,
        payload
      );


      toast({
        title: "Newsletter Updated",
        description: res.data?.message || "Your newsletter has been updated.",
      });

      onOpenChange(false);
      onUpdated?.(); // callback to refresh table if needed
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description:
          error.response?.data?.message || "Something went wrong. Try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Update Newsletter</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Newsletter title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subTitle">Sub Title</Label>
              <Input
                id="subTitle"
                value={formData.subTitle}
                onChange={(e) => handleInputChange("subTitle", e.target.value)}
                placeholder="Sub title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="photos">Photos</SelectItem>
                  <SelectItem value="press">Press</SelectItem>
                  <SelectItem value="videos">Videos</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="news letter">News Letter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="sent">Sent</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="featuredImage">Featured Image</Label>
            <Input
              id="featuredImage"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {formData.featuredImage && (
              <img
                src={formData.featuredImage}
                alt="Current Featured"
                className="mt-2 max-h-40 rounded-md"
              />
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => handleInputChange("content", e.target.value)}
              placeholder="Write your newsletter content here..."
              className="min-h-40 resize-none"
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}       className="hover:bg-[#2E2E2E] hover:cursor-pointer transition-colors  bg-[#1F1F1F] ">
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Updating..." : "Update Newsletter"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
