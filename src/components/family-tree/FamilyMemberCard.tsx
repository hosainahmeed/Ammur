import Image from 'next/image';

interface FamilyMemberProps {
  member: {
    id: string;
    name: string;
    birthDate?: string;
    deathDate?: string;
    image: string;
    color: string;
    status?: string;
  };
}

export default function FamilyMemberCard({ member }: FamilyMemberProps) {
  return (
    <div
      className="rounded-lg overflow-hidden shadow-md flex flex-col items-center p-2"
      style={{ backgroundColor: member.color }}
    >
      <div className="relative w-16 h-16 rounded-full overflow-hidden mb-2">
        <Image
          src={member.image || '/placeholder.svg'}
          alt={member.name}
          fill
          className="object-cover"
        />
      </div>

      <h3 className="font-semibold text-center text-sm">{member.name}</h3>

      {member.status && (
        <p className="text-xs text-gray-600 text-center">{member.status}</p>
      )}

      <div className="mt-1 bg-gray-800 text-white text-xs px-2 py-0.5 rounded-full">
        {member.id}
      </div>
    </div>
  );
}
