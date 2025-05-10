import { InitialMessages, MessageData } from "./types";

export const conversations: MessageData[] = [
    {
        id: 1,
        name: 'Johnson family',
        lastMessage: "How's everyone doing today?",
        timestamp: '5 minutes ago',
        avatar: '/icons/IconOnly.svg',
    },
    {
        id: 2,
        name: 'Browns family',
        lastMessage: 'Are we still meeting this weekend?',
        timestamp: '5 minutes ago',
        avatar: '/icons/IconOnly.svg',
    },
    {
        id: 3,
        name: 'Smith family',
        lastMessage: 'I just shared some photos from our trip!',
        timestamp: '10 minutes ago',
        avatar: '/icons/IconOnly.svg',
    },
];

export const initialMessages: InitialMessages[] = [
    {
        id: 1,
        text: 'Hi there, how can I help you??',
        sender: 'John',
        timestamp: 'Today 9:30',
        avatar: '/icons/IconOnly.svg',
        isCurrentUser: false,
    },
    {
        id: 2,
        text: 'I was wondering if we could schedule a family call this weekend?',
        sender: 'You',
        timestamp: 'Today 9:32',
        avatar: '/icons/IconOnly.svg',
        isCurrentUser: true,
    },
    {
        id: 3,
        text: 'That sounds great! How about Saturday afternoon?',
        sender: 'John',
        timestamp: 'Today 9:35',
        avatar: '/icons/IconOnly.svg',
        isCurrentUser: false,
    },
    {
        id: 4,
        text: "Perfect! I'll let everyone know.",
        sender: 'You',
        timestamp: 'Today 9:36',
        avatar: '/icons/IconOnly.svg',
        isCurrentUser: true,
    },
];
