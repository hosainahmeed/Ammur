export interface TimelineEntryType {
  id: string;
  date: string;
  year: string;
  title: string;
  description: string;
  imageUrl: string;
  comments: {
    authId: string;
    authImage: string;
    authName: string;
    commentDescription: string;
  }[];
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
export interface FamilyMember {
  name: string;
  role: string;
  location: string;
  email: string;
  phone: string;
  family: string;
  photoUrl: string;
}

export interface MessageData {
  id: number,
  name: string,
  lastMessage: string,
  timestamp: string,
  avatar: string,
}
export interface InitialMessages {
  id: number,
  text: string,
  sender: string,
  timestamp: string,
  avatar: string,
  isCurrentUser: boolean,
}

export interface Video {
  id: string
  title: string
  description: string
  duration: string
  thumbnail: string
  videoUrl: string
}

export interface Ingredient {
  name: string;
  image: string;
}

export interface Recipe {
  id: string;
  recipe_name: string;
  recipe_description: string;
  duration: string;
  servings: string;
  family_name: string;
  image: string;
  ingredients: Ingredient[];
}

export interface FamilyTree {
  id: string;
  name: string;
  birthDate?: string;
  deathDate?: string;
  image: string;
  generation: number;
  position: number;
  parentIds?: string[];
  spouseId?: string;
  color: string;
  status?: string;
}

//comment