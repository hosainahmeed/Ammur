'use client';

import { useEffect, useRef, useState } from 'react';
import FamilyMemberCard from './FamilyMemberCard';

// Define the family member data structure
interface FamilyMember {
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

export default function FamilyTree() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  // Sample family data based on the image
  const familyData: FamilyMember[] = [
    // First generation (grandparents)
    {
      id: '1',
      name: 'Maxwell',
      birthDate: '15 May 1945',
      image: '/placeholder.svg?height=80&width=80',
      generation: 1,
      position: 1,
      color: '#d7f5ff',
      status: '1945-2020',
    },
    {
      id: '2',
      name: 'Patricia',
      birthDate: '23 Nov 1948',
      image: '/placeholder.svg?height=80&width=80',
      generation: 1,
      position: 2,
      color: '#d7f5ff',
      status: '1948-2022',
    },

    // Second generation (children)
    {
      id: '3',
      name: 'Robert',
      birthDate: '12 Jun 1970',
      image: '/placeholder.svg?height=80&width=80',
      generation: 2,
      position: 1,
      parentIds: ['1', '2'],
      color: '#d7f5ff',
      status: '1970',
    },
    {
      id: '4',
      name: 'Emily',
      birthDate: '5 Apr 1972',
      image: '/placeholder.svg?height=80&width=80',
      generation: 2,
      position: 2,
      parentIds: ['1', '2'],
      color: '#d7f5ff',
      status: '1972',
    },
    {
      id: '5',
      name: 'Michael',
      birthDate: '18 Sep 1975',
      image: '/placeholder.svg?height=80&width=80',
      generation: 2,
      position: 3,
      parentIds: ['1', '2'],
      color: '#e6ffea',
      status: '1975',
    },
    {
      id: '6',
      name: 'Jessica',
      birthDate: '3 Mar 1978',
      image: '/placeholder.svg?height=80&width=80',
      generation: 2,
      position: 4,
      parentIds: ['1', '2'],
      color: '#e6ffea',
      status: '1978',
    },
    {
      id: '7',
      name: 'Jennifer',
      birthDate: '29 Jul 1980',
      image: '/placeholder.svg?height=80&width=80',
      generation: 2,
      position: 5,
      parentIds: ['1', '2'],
      color: '#e6ffea',
      status: '1980',
    },
    {
      id: '8',
      name: 'Thomas',
      birthDate: '14 Feb 1982',
      image: '/placeholder.svg?height=80&width=80',
      generation: 2,
      position: 6,
      parentIds: ['1', '2'],
      color: '#fff5e6',
      status: '1982',
    },
    {
      id: '9',
      name: 'David',
      birthDate: '7 Dec 1984',
      image: '/placeholder.svg?height=80&width=80',
      generation: 2,
      position: 7,
      parentIds: ['1', '2'],
      color: '#fff5e6',
      status: '1984',
    },
    {
      id: '10',
      name: 'Richard',
      birthDate: '22 Oct 1986',
      image: '/placeholder.svg?height=80&width=80',
      generation: 2,
      position: 8,
      parentIds: ['1', '2'],
      color: '#fff5e6',
      status: '1986',
    },

    // Third generation (grandchildren)
    {
      id: '11',
      name: 'Everett',
      birthDate: '21 Mar 2000',
      image: '/placeholder.svg?height=80&width=80',
      generation: 3,
      position: 1,
      parentIds: ['3'],
      color: '#e6ffea',
      status: '2000',
    },
    {
      id: '12',
      name: 'Evelyn',
      birthDate: '9 Sep 2001',
      image: '/placeholder.svg?height=80&width=80',
      generation: 3,
      position: 2,
      parentIds: ['4'],
      color: '#e6ffea',
      status: '2001',
    },
    {
      id: '13',
      name: 'Jack',
      birthDate: '4 May 2002',
      image: '/placeholder.svg?height=80&width=80',
      generation: 3,
      position: 3,
      parentIds: ['5'],
      color: '#e6ffea',
      status: '2002',
    },
    {
      id: '14',
      name: 'Conrad',
      birthDate: '27 Dec 2003',
      image: '/placeholder.svg?height=80&width=80',
      generation: 3,
      position: 4,
      parentIds: ['6'],
      color: '#e6ffea',
      status: '2003',
    },
    {
      id: '15',
      name: 'Katherine',
      birthDate: '6 Aug 2004',
      image: '/placeholder.svg?height=80&width=80',
      generation: 3,
      position: 5,
      parentIds: ['7'],
      color: '#e6ffea',
      status: '2004',
    },
    {
      id: '16',
      name: 'Martin',
      birthDate: '13 Jun 2005',
      image: '/placeholder.svg?height=80&width=80',
      generation: 3,
      position: 6,
      parentIds: ['9'],
      color: '#fff5e6',
      status: '2005',
    },
    {
      id: '17',
      name: 'Gabriel',
      birthDate: '13 Jun 2006',
      image: '/placeholder.svg?height=80&width=80',
      generation: 3,
      position: 7,
      parentIds: ['10'],
      color: '#fff5e6',
      status: '2006',
    },
    {
      id: '18',
      name: 'Emma',
      birthDate: '15 Apr 2008',
      image: '/placeholder.svg?height=80&width=80',
      generation: 3,
      position: 8,
      parentIds: ['10'],
      color: '#fff5e6',
      status: '2008',
    },
  ];

  // Calculate positions for rendering
  const calculatePositions = () => {
    const cardWidth = 120;
    const cardHeight = 150;
    const horizontalGap = 20;
    const verticalGap = 100;

    // Group members by generation
    const generations = familyData.reduce((acc, member) => {
      if (!acc[member.generation]) {
        acc[member.generation] = [];
      }
      acc[member.generation].push(member);
      return acc;
    }, {} as Record<number, FamilyMember[]>);

    // Sort each generation by position
    Object.keys(generations).forEach((gen) => {
      generations[Number(gen)].sort((a, b) => a.position - b.position);
    });

    // Calculate total width needed for each generation
    const genWidths: Record<number, number> = {};
    Object.keys(generations).forEach((gen) => {
      const numMembers = generations[Number(gen)].length;
      genWidths[Number(gen)] =
        numMembers * cardWidth + (numMembers - 1) * horizontalGap;
    });

    // Calculate positions for each member
    const positions: Record<string, { x: number; y: number }> = {};

    Object.keys(generations).forEach((genStr) => {
      const gen = Number(genStr);
      const members = generations[gen];
      const totalWidth = genWidths[gen];
      const startX = (dimensions.width - totalWidth) / 2;

      members.forEach((member, index) => {
        const x = startX + index * (cardWidth + horizontalGap);
        const y = (gen - 1) * (cardHeight + verticalGap) + 50;
        positions[member.id] = { x, y };
      });
    });

    return positions;
  };

  // Calculate connection lines between family members
  const calculateConnections = (
    positions: Record<string, { x: number; y: number }>
  ) => {
    const connections: {
      from: { x: number; y: number };
      to: { x: number; y: number };
      type: string;
    }[] = [];

    // Add parent-child connections
    familyData.forEach((member) => {
      if (member.parentIds && member.parentIds.length > 0) {
        // For simplicity, we'll just connect to the first parent
        const parentId = member.parentIds[0];
        const parent = positions[parentId];
        const child = positions[member.id];

        if (parent && child) {
          connections.push({
            from: { x: parent.x + 60, y: parent.y + 150 }, // Bottom of parent
            to: { x: child.x + 60, y: child.y }, // Top of child
            type: 'parent-child',
          });
        }
      }
    });

    // Add spouse connections (horizontal)
    for (let i = 0; i < familyData.length - 1; i++) {
      const current = familyData[i];
      const next = familyData[i + 1];

      // If they're in the same generation and adjacent positions
      if (
        current.generation === next.generation &&
        current.position + 1 === next.position &&
        current.spouseId === next.id
      ) {
        const spouse1 = positions[current.id];
        const spouse2 = positions[next.id];

        if (spouse1 && spouse2) {
          connections.push({
            from: { x: spouse1.x + 120, y: spouse1.y + 75 }, // Right of first spouse
            to: { x: spouse2.x, y: spouse2.y + 75 }, // Left of second spouse
            type: 'spouse',
          });
        }
      }
    }

    // Special connection for the first generation couple
    const firstGen = familyData.filter((m) => m.generation === 1);
    if (firstGen.length >= 2) {
      const spouse1 = positions[firstGen[0].id];
      const spouse2 = positions[firstGen[1].id];

      if (spouse1 && spouse2) {
        connections.push({
          from: { x: spouse1.x + 120, y: spouse1.y + 75 }, // Right of first spouse
          to: { x: spouse2.x, y: spouse2.y + 75 }, // Left of second spouse
          type: 'spouse',
        });
      }
    }

    return connections;
  };

  useEffect(() => {
    // Update dimensions based on window size
    const handleResize = () => {
      const container = document.querySelector('.family-tree-container');
      if (container) {
        setDimensions({
          width: Math.max(container.clientWidth, 1200),
          height: Math.max(container.clientHeight, 800),
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const positions = calculatePositions();
  const connections = calculateConnections(positions);

  return (
    <div className="family-tree-container relative w-full">
      <h2 className="text-xl font-semibold text-blue-600 text-center mb-4">
        Family tree of the &ldquo;Johnson family&ldquo;
      </h2>

      <div
        className="relative"
        style={{ width: dimensions.width, height: dimensions.height }}
      >
        {/* SVG for connections */}
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="absolute top-0 left-0 z-0"
        >
          {/* Draw vertical connections from parents to children */}
          {connections.map((conn, i) => {
            if (conn.type === 'parent-child') {
              // For parent-child connections, we need to draw a path
              // that goes down from parent, then horizontally, then down to child
              const midY = (conn.from.y + conn.to.y) / 2;

              return (
                <path
                  key={`conn-${i}`}
                  d={`M ${conn.from.x} ${conn.from.y} 
                     L ${conn.from.x} ${midY} 
                     L ${conn.to.x} ${midY} 
                     L ${conn.to.x} ${conn.to.y}`}
                  stroke="#999"
                  strokeWidth="2"
                  fill="none"
                />
              );
            } else if (conn.type === 'spouse') {
              // For spouse connections, just draw a horizontal line
              return (
                <line
                  key={`conn-${i}`}
                  x1={conn.from.x}
                  y1={conn.from.y}
                  x2={conn.to.x}
                  y2={conn.to.y}
                  stroke="#999"
                  strokeWidth="2"
                />
              );
            }
            return null;
          })}
        </svg>

        {/* Family member cards */}
        {familyData.map((member) => (
          <div
            key={member.id}
            className="absolute"
            style={{
              left: positions[member.id]?.x,
              top: positions[member.id]?.y,
              width: 120,
              height: 150,
              zIndex: 1,
            }}
          >
            <FamilyMemberCard member={member} />
          </div>
        ))}
      </div>
    </div>
  );
}
