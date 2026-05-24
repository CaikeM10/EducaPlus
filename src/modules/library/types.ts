export type Resource = {
  id: string;
  title: string;
  description: string;
  type: "PDF" | "VIDEO" | "DOCUMENT" | "TEMPLATE";
  url: string;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
  tags?: Array<{
    tag: {
      id: string;
      name: string;
    };
  }>;
};
