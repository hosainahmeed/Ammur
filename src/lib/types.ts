export interface TimelineEntryType {
  id: string
  date: string
  year: string
  title: string
  description: string
  imageUrl: string
  likes: number
}
export type Category = {
  title: string;
  icon: string;
};

export type Blog = {
  title: string;
  imageUrl: string;
  date: string;
  author: string;
  summary: string;
  slug: string;
};