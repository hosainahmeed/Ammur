export interface TimelineEntryType {
    _id: string;
    date: string;
    year: string;
    title: string;
    description: string;
    graveyard: string;
    img: string;
    comments: {
      fullName: string;
      userId: {
        _id: string;
        fullName: string;
        img: string;
      }
      description: string;
    }[];
  }
  export interface ArchiveEntryType {
    id: string;
    date: string;
    year: string;
    title: string;
    family: string,
    description: string;
    imageUrl: string;
    comments: {
      userId: string;
      img: string;
      name: string;
      description: string;
    }[];
  }
  export interface LagecyEntryType {
    id: string;
    date: string;
    year: string;
    title: string;
    family: string,
    description: string;
    imageUrl: string;
    comments: {
      userId: string;
      img: string;
      name: string;
      description: string;
    }[];
  }
  
  export interface FamilyMember {
    _id: string,
    fullName: string,
    email: string,
    contactNo: string,
    approvalStatus: string,
    otpVerified: boolean,
    preferedContactMethod: string,
    proffession: string,
    eldestRelative: string,
    familySide: string,
    familyName: string,
    subscription: string,
    paymentStatus: string,
    role: string,
    status: string,
    isDeleted: boolean,
    passwordChangedAt: string,
    createdAt: string,
    updatedAt: string,
    img: string
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
  